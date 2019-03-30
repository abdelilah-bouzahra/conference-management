import { Component, OnDestroy, OnInit } from '@angular/core';
import { IConference } from 'app/shared/model/conference.model';
import { Subscription } from 'rxjs';
import { ConferenceService } from 'app/entities/conference';
import { ArticleService } from 'app/entities/article';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IArticle } from 'app/shared/model/article.model';
import { IParticipation } from 'app/shared/model/participation.model';
import { ParticipationService } from 'app/entities/participation';

@Component({
    selector: 'jhi-notification',
    templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit, OnDestroy {
    conferences: IConference[];
    articles: IArticle[];
    participations: IParticipation[];
    currentAccount: any;
    eventSubscriber: Subscription;
    error: any;
    success: any;

    constructor(
        protected conferenceService: ConferenceService,
        protected articleService: ArticleService,
        protected participationService: ParticipationService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    setAcceptedConference(conference, isAccepted) {
        conference.accepted = isAccepted;

        this.conferenceService.update(conference).subscribe(response => {
            if (response.status === 200) {
                this.error = null;
                this.success = 'OK';
                this.loadAll();
            } else {
                this.success = null;
                this.error = 'ERROR';
            }
        });
    }

    setAcceptedArticle(article, isAccepted) {
        article.accepted = isAccepted;

        this.articleService.update(article).subscribe(response => {
            if (response.status === 200) {
                this.error = null;
                this.success = 'OK';
                this.loadAll();
            } else {
                this.success = null;
                this.error = 'ERROR';
            }
        });
    }

    setAcceptedParticipation(participation, isAccepted) {
        participation.accepted = isAccepted;

        this.participationService.update(participation).subscribe(response => {
            if (response.status === 200) {
                this.error = null;
                this.success = 'OK';
                this.loadAll();
            } else {
                this.success = null;
                this.error = 'ERROR';
            }
        });
    }

    loadAll() {
        this.conferenceService
            .queryAccepted()
            .pipe(
                filter((res: HttpResponse<IConference[]>) => res.ok),
                map((res: HttpResponse<IConference[]>) => res.body)
            )
            .subscribe(
                (res: IConference[]) => {
                    this.conferences = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.articleService
            .queryAccepted()
            .pipe(
                filter((res: HttpResponse<IArticle[]>) => res.ok),
                map((res: HttpResponse<IArticle[]>) => res.body)
            )
            .subscribe(
                (res: IArticle[]) => {
                    this.articles = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.participationService
            .queryAccepted()
            .pipe(
                filter((res: HttpResponse<IParticipation[]>) => res.ok),
                map((res: HttpResponse<IParticipation[]>) => res.body)
            )
            .subscribe(
                (res: IParticipation[]) => {
                    this.participations = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInConferences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IConference) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInConferences() {
        this.eventSubscriber = this.eventManager.subscribe('conferenceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
