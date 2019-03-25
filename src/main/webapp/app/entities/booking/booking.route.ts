import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Booking } from 'app/shared/model/booking.model';
import { BookingService } from './booking.service';
import { BookingComponent } from './booking.component';
import { BookingDetailComponent } from './booking-detail.component';
import { BookingUpdateComponent } from './booking-update.component';
import { BookingDeletePopupComponent } from './booking-delete-dialog.component';
import { IBooking } from 'app/shared/model/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingResolve implements Resolve<IBooking> {
    constructor(private service: BookingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBooking> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Booking>) => response.ok),
                map((booking: HttpResponse<Booking>) => booking.body)
            );
        }
        return of(new Booking());
    }
}

export const bookingRoute: Routes = [
    {
        path: '',
        component: BookingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: BookingDetailComponent,
        resolve: {
            booking: BookingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: BookingUpdateComponent,
        resolve: {
            booking: BookingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: BookingUpdateComponent,
        resolve: {
            booking: BookingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bookingPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: BookingDeletePopupComponent,
        resolve: {
            booking: BookingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.booking.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
