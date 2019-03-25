/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ConferenceManagementTestModule } from '../../../test.module';
import { OpinionDeleteDialogComponent } from 'app/entities/opinion/opinion-delete-dialog.component';
import { OpinionService } from 'app/entities/opinion/opinion.service';

describe('Component Tests', () => {
    describe('Opinion Management Delete Component', () => {
        let comp: OpinionDeleteDialogComponent;
        let fixture: ComponentFixture<OpinionDeleteDialogComponent>;
        let service: OpinionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [OpinionDeleteDialogComponent]
            })
                .overrideTemplate(OpinionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OpinionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpinionService);
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
