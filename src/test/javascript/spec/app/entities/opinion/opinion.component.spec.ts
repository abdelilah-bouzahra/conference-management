/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConferenceManagementTestModule } from '../../../test.module';
import { OpinionComponent } from 'app/entities/opinion/opinion.component';
import { OpinionService } from 'app/entities/opinion/opinion.service';
import { Opinion } from 'app/shared/model/opinion.model';

describe('Component Tests', () => {
    describe('Opinion Management Component', () => {
        let comp: OpinionComponent;
        let fixture: ComponentFixture<OpinionComponent>;
        let service: OpinionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [OpinionComponent],
                providers: []
            })
                .overrideTemplate(OpinionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OpinionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OpinionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Opinion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.opinions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
