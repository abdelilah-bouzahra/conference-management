import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IParticipation } from 'app/shared/model/participation.model';
import { ParticipationService } from './participation.service';
import { IUser, UserService } from 'app/core';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role';
import { IConference } from 'app/shared/model/conference.model';
import { ConferenceService } from 'app/entities/conference';

@Component({
    selector: 'jhi-participation-update',
    templateUrl: './participation-update.component.html'
})
export class ParticipationUpdateComponent implements OnInit {
    participation: IParticipation;
    isSaving: boolean;

    users: IUser[];

    roles: IRole[];

    conferences: IConference[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected participationService: ParticipationService,
        protected userService: UserService,
        protected roleService: RoleService,
        protected conferenceService: ConferenceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ participation }) => {
            this.participation = participation;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.roleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IRole[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRole[]>) => response.body)
            )
            .subscribe((res: IRole[]) => (this.roles = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.conferenceService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IConference[]>) => mayBeOk.ok),
                map((response: HttpResponse<IConference[]>) => response.body)
            )
            .subscribe((res: IConference[]) => (this.conferences = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.participation.id !== undefined) {
            this.subscribeToSaveResponse(this.participationService.update(this.participation));
        } else {
            this.subscribeToSaveResponse(this.participationService.create(this.participation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IParticipation>>) {
        result.subscribe((res: HttpResponse<IParticipation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackRoleById(index: number, item: IRole) {
        return item.id;
    }

    trackConferenceById(index: number, item: IConference) {
        return item.id;
    }
}
