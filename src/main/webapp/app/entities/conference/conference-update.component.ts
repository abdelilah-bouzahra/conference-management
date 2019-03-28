import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IConference } from 'app/shared/model/conference.model';
import { ConferenceService } from './conference.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-conference-update',
    templateUrl: './conference-update.component.html'
})
export class ConferenceUpdateComponent implements OnInit {
    conference: IConference;
    isSaving: boolean;

    users: IUser[];
    startDate: string;
    endDate: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected conferenceService: ConferenceService,
        protected userService: UserService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ conference }) => {
            this.conference = conference;
            this.startDate = this.conference.startDate != null ? this.conference.startDate.format(DATE_TIME_FORMAT) : null;
            this.endDate = this.conference.endDate != null ? this.conference.endDate.format(DATE_TIME_FORMAT) : null;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.conference, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.conference.startDate = this.startDate != null ? moment(this.startDate, DATE_TIME_FORMAT) : null;
        this.conference.endDate = this.endDate != null ? moment(this.endDate, DATE_TIME_FORMAT) : null;
        if (this.conference.id !== undefined) {
            this.subscribeToSaveResponse(this.conferenceService.update(this.conference));
        } else {
            this.subscribeToSaveResponse(this.conferenceService.create(this.conference));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IConference>>) {
        result.subscribe((res: HttpResponse<IConference>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
