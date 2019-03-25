import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IBooking } from 'app/shared/model/booking.model';
import { BookingService } from './booking.service';
import { IRoom } from 'app/shared/model/room.model';
import { RoomService } from 'app/entities/room';
import { IUser, UserService } from 'app/core';
import { IInvoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from 'app/entities/invoice';

@Component({
    selector: 'jhi-booking-update',
    templateUrl: './booking-update.component.html'
})
export class BookingUpdateComponent implements OnInit {
    booking: IBooking;
    isSaving: boolean;

    rooms: IRoom[];

    users: IUser[];

    invoices: IInvoice[];
    bookingDate: string;
    arrivedDate: string;
    departureDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected bookingService: BookingService,
        protected roomService: RoomService,
        protected userService: UserService,
        protected invoiceService: InvoiceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ booking }) => {
            this.booking = booking;
            this.bookingDate = this.booking.bookingDate != null ? this.booking.bookingDate.format(DATE_TIME_FORMAT) : null;
            this.arrivedDate = this.booking.arrivedDate != null ? this.booking.arrivedDate.format(DATE_TIME_FORMAT) : null;
            this.departureDate = this.booking.departureDate != null ? this.booking.departureDate.format(DATE_TIME_FORMAT) : null;
        });
        this.roomService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IRoom[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRoom[]>) => response.body)
            )
            .subscribe((res: IRoom[]) => (this.rooms = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.invoiceService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IInvoice[]>) => mayBeOk.ok),
                map((response: HttpResponse<IInvoice[]>) => response.body)
            )
            .subscribe((res: IInvoice[]) => (this.invoices = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.booking.bookingDate = this.bookingDate != null ? moment(this.bookingDate, DATE_TIME_FORMAT) : null;
        this.booking.arrivedDate = this.arrivedDate != null ? moment(this.arrivedDate, DATE_TIME_FORMAT) : null;
        this.booking.departureDate = this.departureDate != null ? moment(this.departureDate, DATE_TIME_FORMAT) : null;
        if (this.booking.id !== undefined) {
            this.subscribeToSaveResponse(this.bookingService.update(this.booking));
        } else {
            this.subscribeToSaveResponse(this.bookingService.create(this.booking));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBooking>>) {
        result.subscribe((res: HttpResponse<IBooking>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackRoomById(index: number, item: IRoom) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackInvoiceById(index: number, item: IInvoice) {
        return item.id;
    }
}
