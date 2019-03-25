/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ConferenceManagementTestModule } from '../../../test.module';
import { HotelUpdateComponent } from 'app/entities/hotel/hotel-update.component';
import { HotelService } from 'app/entities/hotel/hotel.service';
import { Hotel } from 'app/shared/model/hotel.model';

describe('Component Tests', () => {
    describe('Hotel Management Update Component', () => {
        let comp: HotelUpdateComponent;
        let fixture: ComponentFixture<HotelUpdateComponent>;
        let service: HotelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [HotelUpdateComponent]
            })
                .overrideTemplate(HotelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HotelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HotelService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Hotel(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.hotel = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Hotel();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.hotel = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
