import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDomain } from 'app/shared/model/domain.model';
import { AccountService } from 'app/core';
import { DomainService } from './domain.service';

@Component({
    selector: 'jhi-domain',
    templateUrl: './domain.component.html'
})
export class DomainComponent implements OnInit, OnDestroy {
    domains: IDomain[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected domainService: DomainService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.domainService
            .query()
            .pipe(
                filter((res: HttpResponse<IDomain[]>) => res.ok),
                map((res: HttpResponse<IDomain[]>) => res.body)
            )
            .subscribe(
                (res: IDomain[]) => {
                    this.domains = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDomains();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDomain) {
        return item.id;
    }

    registerChangeInDomains() {
        this.eventSubscriber = this.eventManager.subscribe('domainListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
