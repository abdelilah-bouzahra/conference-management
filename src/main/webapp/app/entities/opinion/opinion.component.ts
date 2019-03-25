import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOpinion } from 'app/shared/model/opinion.model';
import { AccountService } from 'app/core';
import { OpinionService } from './opinion.service';

@Component({
    selector: 'jhi-opinion',
    templateUrl: './opinion.component.html'
})
export class OpinionComponent implements OnInit, OnDestroy {
    opinions: IOpinion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected opinionService: OpinionService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.opinionService
            .query()
            .pipe(
                filter((res: HttpResponse<IOpinion[]>) => res.ok),
                map((res: HttpResponse<IOpinion[]>) => res.body)
            )
            .subscribe(
                (res: IOpinion[]) => {
                    this.opinions = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOpinions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOpinion) {
        return item.id;
    }

    registerChangeInOpinions() {
        this.eventSubscriber = this.eventManager.subscribe('opinionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
