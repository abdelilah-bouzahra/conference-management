import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBooking } from 'app/shared/model/booking.model';

type EntityResponseType = HttpResponse<IBooking>;
type EntityArrayResponseType = HttpResponse<IBooking[]>;

@Injectable({ providedIn: 'root' })
export class BookingService {
    public resourceUrl = SERVER_API_URL + 'api/bookings';

    constructor(protected http: HttpClient) {}

    create(booking: IBooking): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(booking);
        return this.http
            .post<IBooking>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(booking: IBooking): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(booking);
        return this.http
            .put<IBooking>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBooking>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBooking[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(booking: IBooking): IBooking {
        const copy: IBooking = Object.assign({}, booking, {
            bookingDate: booking.bookingDate != null && booking.bookingDate.isValid() ? booking.bookingDate.toJSON() : null,
            arrivedDate: booking.arrivedDate != null && booking.arrivedDate.isValid() ? booking.arrivedDate.toJSON() : null,
            departureDate: booking.departureDate != null && booking.departureDate.isValid() ? booking.departureDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.bookingDate = res.body.bookingDate != null ? moment(res.body.bookingDate) : null;
            res.body.arrivedDate = res.body.arrivedDate != null ? moment(res.body.arrivedDate) : null;
            res.body.departureDate = res.body.departureDate != null ? moment(res.body.departureDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((booking: IBooking) => {
                booking.bookingDate = booking.bookingDate != null ? moment(booking.bookingDate) : null;
                booking.arrivedDate = booking.arrivedDate != null ? moment(booking.arrivedDate) : null;
                booking.departureDate = booking.departureDate != null ? moment(booking.departureDate) : null;
            });
        }
        return res;
    }
}
