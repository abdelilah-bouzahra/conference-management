/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConferenceManagementTestModule } from '../../../test.module';
import { HotelComponent } from 'app/entities/hotel/hotel.component';
import { HotelService } from 'app/entities/hotel/hotel.service';
import { Hotel } from 'app/shared/model/hotel.model';

describe('Component Tests', () => {
    describe('Hotel Management Component', () => {
        let comp: HotelComponent;
        let fixture: ComponentFixture<HotelComponent>;
        let service: HotelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [HotelComponent],
                providers: []
            })
                .overrideTemplate(HotelComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HotelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HotelService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Hotel(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.hotels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
