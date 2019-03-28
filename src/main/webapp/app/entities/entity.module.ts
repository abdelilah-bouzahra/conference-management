import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'country',
                loadChildren: './country/country.module#ConferenceManagementCountryModule'
            },
            {
                path: 'city',
                loadChildren: './city/city.module#ConferenceManagementCityModule'
            },
            {
                path: 'hotel',
                loadChildren: './hotel/hotel.module#ConferenceManagementHotelModule'
            },
            {
                path: 'room',
                loadChildren: './room/room.module#ConferenceManagementRoomModule'
            },
            {
                path: 'invoice',
                loadChildren: './invoice/invoice.module#ConferenceManagementInvoiceModule'
            },
            {
                path: 'booking',
                loadChildren: './booking/booking.module#ConferenceManagementBookingModule'
            },
            {
                path: 'domain',
                loadChildren: './domain/domain.module#ConferenceManagementDomainModule'
            },
            {
                path: 'conference',
                loadChildren: './conference/conference.module#ConferenceManagementConferenceModule'
            },
            {
                path: 'article',
                loadChildren: './article/article.module#ConferenceManagementArticleModule'
            },
            {
                path: 'role',
                loadChildren: './role/role.module#ConferenceManagementRoleModule'
            },
            {
                path: 'participation',
                loadChildren: './participation/participation.module#ConferenceManagementParticipationModule'
            },
            {
                path: 'opinion',
                loadChildren: './opinion/opinion.module#ConferenceManagementOpinionModule'
            },
            {
                path: 'note',
                loadChildren: './note/note.module#ConferenceManagementNoteModule'
            },
            {
                path: 'conference',
                loadChildren: './conference/conference.module#ConferenceManagementConferenceModule'
            },
            {
                path: 'article',
                loadChildren: './article/article.module#ConferenceManagementArticleModule'
            },
            {
                path: 'article',
                loadChildren: './article/article.module#ConferenceManagementArticleModule'
            },
            {
                path: 'article',
                loadChildren: './article/article.module#ConferenceManagementArticleModule'
            },
            {
                path: 'conference',
                loadChildren: './conference/conference.module#ConferenceManagementConferenceModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConferenceManagementEntityModule {}
