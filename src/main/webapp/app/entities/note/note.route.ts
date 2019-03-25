import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Note } from 'app/shared/model/note.model';
import { NoteService } from './note.service';
import { NoteComponent } from './note.component';
import { NoteDetailComponent } from './note-detail.component';
import { NoteUpdateComponent } from './note-update.component';
import { NoteDeletePopupComponent } from './note-delete-dialog.component';
import { INote } from 'app/shared/model/note.model';

@Injectable({ providedIn: 'root' })
export class NoteResolve implements Resolve<INote> {
    constructor(private service: NoteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INote> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Note>) => response.ok),
                map((note: HttpResponse<Note>) => note.body)
            );
        }
        return of(new Note());
    }
}

export const noteRoute: Routes = [
    {
        path: '',
        component: NoteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.note.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: NoteDetailComponent,
        resolve: {
            note: NoteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.note.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: NoteUpdateComponent,
        resolve: {
            note: NoteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.note.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: NoteUpdateComponent,
        resolve: {
            note: NoteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.note.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: NoteDeletePopupComponent,
        resolve: {
            note: NoteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'conferenceManagementApp.note.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
