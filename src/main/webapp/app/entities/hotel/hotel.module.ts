import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ConferenceManagementSharedModule } from 'app/shared';
import {
    HotelComponent,
    HotelDetailComponent,
    HotelUpdateComponent,
    HotelDeletePopupComponent,
    HotelDeleteDialogComponent,
    hotelRoute,
    hotelPopupRoute
} from './';

const ENTITY_STATES = [...hotelRoute, ...hotelPopupRoute];

@NgModule({
    imports: [ConferenceManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [HotelComponent, HotelDetailComponent, HotelUpdateComponent, HotelDeleteDialogComponent, HotelDeletePopupComponent],
    entryComponents: [HotelComponent, HotelUpdateComponent, HotelDeleteDialogComponent, HotelDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConferenceManagementHotelModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
