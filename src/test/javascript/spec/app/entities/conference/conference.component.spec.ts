/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConferenceManagementTestModule } from '../../../test.module';
import { ConferenceComponent } from 'app/entities/conference/conference.component';
import { ConferenceService } from 'app/entities/conference/conference.service';
import { Conference } from 'app/shared/model/conference.model';

describe('Component Tests', () => {
    describe('Conference Management Component', () => {
        let comp: ConferenceComponent;
        let fixture: ComponentFixture<ConferenceComponent>;
        let service: ConferenceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [ConferenceComponent],
                providers: []
            })
                .overrideTemplate(ConferenceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConferenceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConferenceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Conference(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.conferences[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
