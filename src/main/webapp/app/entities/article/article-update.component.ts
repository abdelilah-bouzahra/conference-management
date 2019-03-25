import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from './article.service';
import { IUser, UserService } from 'app/core';
import { IDomain } from 'app/shared/model/domain.model';
import { DomainService } from 'app/entities/domain';
import { IConference } from 'app/shared/model/conference.model';
import { ConferenceService } from 'app/entities/conference';

@Component({
    selector: 'jhi-article-update',
    templateUrl: './article-update.component.html'
})
export class ArticleUpdateComponent implements OnInit {
    article: IArticle;
    isSaving: boolean;

    users: IUser[];

    domains: IDomain[];

    conferences: IConference[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected articleService: ArticleService,
        protected userService: UserService,
        protected domainService: DomainService,
        protected conferenceService: ConferenceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ article }) => {
            this.article = article;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.domainService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDomain[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDomain[]>) => response.body)
            )
            .subscribe((res: IDomain[]) => (this.domains = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.conferenceService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IConference[]>) => mayBeOk.ok),
                map((response: HttpResponse<IConference[]>) => response.body)
            )
            .subscribe((res: IConference[]) => (this.conferences = res), (res: HttpErrorResponse) => this.onError(res.message));
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

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.article.id !== undefined) {
            this.subscribeToSaveResponse(this.articleService.update(this.article));
        } else {
            this.subscribeToSaveResponse(this.articleService.create(this.article));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticle>>) {
        result.subscribe((res: HttpResponse<IArticle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDomainById(index: number, item: IDomain) {
        return item.id;
    }

    trackConferenceById(index: number, item: IConference) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
