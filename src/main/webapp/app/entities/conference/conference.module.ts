import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ConferenceManagementSharedModule } from 'app/shared';
import {
    ConferenceComponent,
    ConferenceDetailComponent,
    ConferenceUpdateComponent,
    ConferenceDeletePopupComponent,
    ConferenceDeleteDialogComponent,
    conferenceRoute,
    conferencePopupRoute
} from './';

const ENTITY_STATES = [...conferenceRoute, ...conferencePopupRoute];

@NgModule({
    imports: [ConferenceManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConferenceComponent,
        ConferenceDetailComponent,
        ConferenceUpdateComponent,
        ConferenceDeleteDialogComponent,
        ConferenceDeletePopupComponent
    ],
    entryComponents: [ConferenceComponent, ConferenceUpdateComponent, ConferenceDeleteDialogComponent, ConferenceDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConferenceManagementConferenceModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
