import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBooking } from 'app/shared/model/booking.model';

@Component({
    selector: 'jhi-booking-detail',
    templateUrl: './booking-detail.component.html'
})
export class BookingDetailComponent implements OnInit {
    booking: IBooking;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ booking }) => {
            this.booking = booking;
        });
    }

    previousState() {
        window.history.back();
    }
}
