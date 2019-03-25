/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ConferenceManagementTestModule } from '../../../test.module';
import { BookingUpdateComponent } from 'app/entities/booking/booking-update.component';
import { BookingService } from 'app/entities/booking/booking.service';
import { Booking } from 'app/shared/model/booking.model';

describe('Component Tests', () => {
    describe('Booking Management Update Component', () => {
        let comp: BookingUpdateComponent;
        let fixture: ComponentFixture<BookingUpdateComponent>;
        let service: BookingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [BookingUpdateComponent]
            })
                .overrideTemplate(BookingUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BookingUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookingService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Booking(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.booking = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Booking();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.booking = entity;
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
