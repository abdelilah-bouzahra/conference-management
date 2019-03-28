import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IConference } from 'app/shared/model/conference.model';
import { AccountService, User } from 'app/core';
import { ConferenceService } from './conference.service';

@Component({
    selector: 'jhi-conference',
    templateUrl: './conference.component.html'
})
export class ConferenceComponent implements OnInit, OnDestroy {
    conferences: IConference[];
    currentAccount: any;
    eventSubscriber: Subscription;
    error: any;
    success: any;

    constructor(
        protected conferenceService: ConferenceService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    setAccepted(conference, isAccepted) {
        conference.accepted = isAccepted;

        this.conferenceService.update(conference).subscribe(response => {
            if (response.status === 200) {
                this.error = null;
                this.success = 'OK';
                this.loadAll();
            } else {
                this.success = null;
                this.error = 'ERROR';
            }
        });
    }

    loadAll() {
        this.conferenceService
            .query()
            .pipe(
                filter((res: HttpResponse<IConference[]>) => res.ok),
                map((res: HttpResponse<IConference[]>) => res.body)
            )
            .subscribe(
                (res: IConference[]) => {
                    this.conferences = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInConferences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IConference) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInConferences() {
        this.eventSubscriber = this.eventManager.subscribe('conferenceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
