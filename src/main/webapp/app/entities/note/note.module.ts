import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ConferenceManagementSharedModule } from 'app/shared';
import {
    NoteComponent,
    NoteDetailComponent,
    NoteUpdateComponent,
    NoteDeletePopupComponent,
    NoteDeleteDialogComponent,
    noteRoute,
    notePopupRoute
} from './';

const ENTITY_STATES = [...noteRoute, ...notePopupRoute];

@NgModule({
    imports: [ConferenceManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [NoteComponent, NoteDetailComponent, NoteUpdateComponent, NoteDeleteDialogComponent, NoteDeletePopupComponent],
    entryComponents: [NoteComponent, NoteUpdateComponent, NoteDeleteDialogComponent, NoteDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConferenceManagementNoteModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
