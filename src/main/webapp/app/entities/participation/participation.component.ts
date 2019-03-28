import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParticipation } from 'app/shared/model/participation.model';
import { AccountService } from 'app/core';
import { ParticipationService } from './participation.service';

@Component({
    selector: 'jhi-participation',
    templateUrl: './participation.component.html'
})
export class ParticipationComponent implements OnInit, OnDestroy {
    participations: IParticipation[];
    currentAccount: any;
    eventSubscriber: Subscription;
    error: any;
    success: any;

    constructor(
        protected participationService: ParticipationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    setAccepted(participation, isAccepted) {
        participation.accepted = isAccepted;

        this.participationService.update(participation).subscribe(response => {
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
        this.participationService
            .query()
            .pipe(
                filter((res: HttpResponse<IParticipation[]>) => res.ok),
                map((res: HttpResponse<IParticipation[]>) => res.body)
            )
            .subscribe(
                (res: IParticipation[]) => {
                    this.participations = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInParticipations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IParticipation) {
        return item.id;
    }

    registerChangeInParticipations() {
        this.eventSubscriber = this.eventManager.subscribe('participationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
