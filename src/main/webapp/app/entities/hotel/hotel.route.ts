import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Hotel } from 'app/shared/model/hotel.model';
import { HotelService } from './hotel.service';
import { HotelComponent } from './hotel.component';
import { HotelDetailComponent } from './hotel-detail.component';
import { HotelUpdateComponent } from './hotel-update.component';
import { HotelDeletePopupComponent } from './hotel-delete-dialog.component';
import { IHotel } from 'app/shared/model/hotel.model';

@Injectable({ providedIn: 'root' })
export class HotelResolve implements Resolve<IHotel> {
    constructor(private service: HotelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHotel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Hotel>) => response.ok),
                map((hotel: HttpResponse<Hotel>) => hotel.body)
            );
        }
        return of(new Hotel());
    }
}

export const hotelRoute: Routes = [
    {
        path: '',
        component: HotelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.hotel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: HotelDetailComponent,
        resolve: {
            hotel: HotelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.hotel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: HotelUpdateComponent,
        resolve: {
            hotel: HotelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.hotel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: HotelUpdateComponent,
        resolve: {
            hotel: HotelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.hotel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hotelPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: HotelDeletePopupComponent,
        resolve: {
            hotel: HotelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.hotel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
