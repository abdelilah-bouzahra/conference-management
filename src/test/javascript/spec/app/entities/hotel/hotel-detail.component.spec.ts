/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConferenceManagementTestModule } from '../../../test.module';
import { HotelDetailComponent } from 'app/entities/hotel/hotel-detail.component';
import { Hotel } from 'app/shared/model/hotel.model';

describe('Component Tests', () => {
    describe('Hotel Management Detail Component', () => {
        let comp: HotelDetailComponent;
        let fixture: ComponentFixture<HotelDetailComponent>;
        const route = ({ data: of({ hotel: new Hotel(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [HotelDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HotelDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HotelDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hotel).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
