/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ConferenceManagementTestModule } from '../../../test.module';
import { OpinionUpdateComponent } from 'app/entities/opinion/opinion-update.component';
import { OpinionService } from 'app/entities/opinion/opinion.service';
import { Opinion } from 'app/shared/model/opinion.model';

describe('Component Tests', () => {
    describe('Opinion Management Update Component', () => {
        let comp: OpinionUpdateComponent;
        let fixture: ComponentFixture<OpinionUpdateComponent>;
        let service: OpinionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [OpinionUpdateComponent]
            })
                .overrideTemplate(OpinionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OpinionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpinionService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Opinion(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.opinion = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Opinion();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.opinion = entity;
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
