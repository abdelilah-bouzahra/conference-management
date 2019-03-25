/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ConferenceManagementTestModule } from '../../../test.module';
import { DomainUpdateComponent } from 'app/entities/domain/domain-update.component';
import { DomainService } from 'app/entities/domain/domain.service';
import { Domain } from 'app/shared/model/domain.model';

describe('Component Tests', () => {
    describe('Domain Management Update Component', () => {
        let comp: DomainUpdateComponent;
        let fixture: ComponentFixture<DomainUpdateComponent>;
        let service: DomainService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [DomainUpdateComponent]
            })
                .overrideTemplate(DomainUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DomainUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DomainService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Domain(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.domain = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Domain();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.domain = entity;
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
