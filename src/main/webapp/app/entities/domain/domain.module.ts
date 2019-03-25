import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ConferenceManagementSharedModule } from 'app/shared';
import {
    DomainComponent,
    DomainDetailComponent,
    DomainUpdateComponent,
    DomainDeletePopupComponent,
    DomainDeleteDialogComponent,
    domainRoute,
    domainPopupRoute
} from './';

const ENTITY_STATES = [...domainRoute, ...domainPopupRoute];

@NgModule({
    imports: [ConferenceManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [DomainComponent, DomainDetailComponent, DomainUpdateComponent, DomainDeleteDialogComponent, DomainDeletePopupComponent],
    entryComponents: [DomainComponent, DomainUpdateComponent, DomainDeleteDialogComponent, DomainDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConferenceManagementDomainModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
