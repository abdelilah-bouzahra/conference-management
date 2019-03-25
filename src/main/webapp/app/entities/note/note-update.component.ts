import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { INote } from 'app/shared/model/note.model';
import { NoteService } from './note.service';
import { IUser, UserService } from 'app/core';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article';

@Component({
    selector: 'jhi-note-update',
    templateUrl: './note-update.component.html'
})
export class NoteUpdateComponent implements OnInit {
    note: INote;
    isSaving: boolean;

    users: IUser[];

    articles: IArticle[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected noteService: NoteService,
        protected userService: UserService,
        protected articleService: ArticleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ note }) => {
            this.note = note;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.articleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IArticle[]>) => mayBeOk.ok),
                map((response: HttpResponse<IArticle[]>) => response.body)
            )
            .subscribe((res: IArticle[]) => (this.articles = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.note.id !== undefined) {
            this.subscribeToSaveResponse(this.noteService.update(this.note));
        } else {
            this.subscribeToSaveResponse(this.noteService.create(this.note));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INote>>) {
        result.subscribe((res: HttpResponse<INote>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackArticleById(index: number, item: IArticle) {
        return item.id;
    }
}
