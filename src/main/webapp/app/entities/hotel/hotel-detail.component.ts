import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHotel } from 'app/shared/model/hotel.model';

@Component({
    selector: 'jhi-hotel-detail',
    templateUrl: './hotel-detail.component.html'
})
export class HotelDetailComponent implements OnInit {
    hotel: IHotel;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hotel }) => {
            this.hotel = hotel;
        });
    }

    previousState() {
        window.history.back();
    }
}
