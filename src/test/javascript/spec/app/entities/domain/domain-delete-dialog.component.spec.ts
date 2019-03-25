/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ConferenceManagementTestModule } from '../../../test.module';
import { DomainDeleteDialogComponent } from 'app/entities/domain/domain-delete-dialog.component';
import { DomainService } from 'app/entities/domain/domain.service';

describe('Component Tests', () => {
    describe('Domain Management Delete Component', () => {
        let comp: DomainDeleteDialogComponent;
        let fixture: ComponentFixture<DomainDeleteDialogComponent>;
        let service: DomainService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [DomainDeleteDialogComponent]
            })
                .overrideTemplate(DomainDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DomainDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DomainService);
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
