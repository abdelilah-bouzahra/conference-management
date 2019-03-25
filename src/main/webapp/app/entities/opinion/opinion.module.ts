import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ConferenceManagementSharedModule } from 'app/shared';
import {
    OpinionComponent,
    OpinionDetailComponent,
    OpinionUpdateComponent,
    OpinionDeletePopupComponent,
    OpinionDeleteDialogComponent,
    opinionRoute,
    opinionPopupRoute
} from './';

const ENTITY_STATES = [...opinionRoute, ...opinionPopupRoute];

@NgModule({
    imports: [ConferenceManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OpinionComponent,
        OpinionDetailComponent,
        OpinionUpdateComponent,
        OpinionDeleteDialogComponent,
        OpinionDeletePopupComponent
    ],
    entryComponents: [OpinionComponent, OpinionUpdateComponent, OpinionDeleteDialogComponent, OpinionDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConferenceManagementOpinionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
