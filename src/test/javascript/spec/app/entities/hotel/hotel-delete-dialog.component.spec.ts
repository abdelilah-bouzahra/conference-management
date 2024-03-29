/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ConferenceManagementTestModule } from '../../../test.module';
import { HotelDeleteDialogComponent } from 'app/entities/hotel/hotel-delete-dialog.component';
import { HotelService } from 'app/entities/hotel/hotel.service';

describe('Component Tests', () => {
    describe('Hotel Management Delete Component', () => {
        let comp: HotelDeleteDialogComponent;
        let fixture: ComponentFixture<HotelDeleteDialogComponent>;
        let service: HotelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [HotelDeleteDialogComponent]
            })
                .overrideTemplate(HotelDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HotelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HotelService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
