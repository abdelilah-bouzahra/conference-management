/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConferenceManagementTestModule } from '../../../test.module';
import { ConferenceDetailComponent } from 'app/entities/conference/conference-detail.component';
import { Conference } from 'app/shared/model/conference.model';

describe('Component Tests', () => {
    describe('Conference Management Detail Component', () => {
        let comp: ConferenceDetailComponent;
        let fixture: ComponentFixture<ConferenceDetailComponent>;
        const route = ({ data: of({ conference: new Conference(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [ConferenceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ConferenceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConferenceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.conference).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
