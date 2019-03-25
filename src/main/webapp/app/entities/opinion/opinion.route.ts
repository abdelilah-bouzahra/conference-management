import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Opinion } from 'app/shared/model/opinion.model';
import { OpinionService } from './opinion.service';
import { OpinionComponent } from './opinion.component';
import { OpinionDetailComponent } from './opinion-detail.component';
import { OpinionUpdateComponent } from './opinion-update.component';
import { OpinionDeletePopupComponent } from './opinion-delete-dialog.component';
import { IOpinion } from 'app/shared/model/opinion.model';

@Injectable({ providedIn: 'root' })
export class OpinionResolve implements Resolve<IOpinion> {
    constructor(private service: OpinionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOpinion> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Opinion>) => response.ok),
                map((opinion: HttpResponse<Opinion>) => opinion.body)
            );
        }
        return of(new Opinion());
    }
}

export const opinionRoute: Routes = [
    {
        path: '',
        component: OpinionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.opinion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: OpinionDetailComponent,
        resolve: {
            opinion: OpinionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.opinion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: OpinionUpdateComponent,
        resolve: {
            opinion: OpinionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.opinion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: OpinionUpdateComponent,
        resolve: {
            opinion: OpinionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.opinion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const opinionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: OpinionDeletePopupComponent,
        resolve: {
            opinion: OpinionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.opinion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
