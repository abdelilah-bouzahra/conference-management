import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBooking } from 'app/shared/model/booking.model';
import { AccountService } from 'app/core';
import { BookingService } from './booking.service';

@Component({
    selector: 'jhi-booking',
    templateUrl: './booking.component.html'
})
export class BookingComponent implements OnInit, OnDestroy {
    bookings: IBooking[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected bookingService: BookingService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.bookingService
            .query()
            .pipe(
                filter((res: HttpResponse<IBooking[]>) => res.ok),
                map((res: HttpResponse<IBooking[]>) => res.body)
            )
            .subscribe(
                (res: IBooking[]) => {
                    this.bookings = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBookings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBooking) {
        return item.id;
    }

    registerChangeInBookings() {
        this.eventSubscriber = this.eventManager.subscribe('bookingListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
