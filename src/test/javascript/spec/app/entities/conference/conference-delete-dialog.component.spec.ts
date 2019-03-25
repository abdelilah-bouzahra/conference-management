/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ConferenceManagementTestModule } from '../../../test.module';
import { ConferenceDeleteDialogComponent } from 'app/entities/conference/conference-delete-dialog.component';
import { ConferenceService } from 'app/entities/conference/conference.service';

describe('Component Tests', () => {
    describe('Conference Management Delete Component', () => {
        let comp: ConferenceDeleteDialogComponent;
        let fixture: ComponentFixture<ConferenceDeleteDialogComponent>;
        let service: ConferenceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [ConferenceDeleteDialogComponent]
            })
                .overrideTemplate(ConferenceDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConferenceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConferenceService);
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
