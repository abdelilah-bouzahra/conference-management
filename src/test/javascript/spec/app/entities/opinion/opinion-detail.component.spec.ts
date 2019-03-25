/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConferenceManagementTestModule } from '../../../test.module';
import { OpinionDetailComponent } from 'app/entities/opinion/opinion-detail.component';
import { Opinion } from 'app/shared/model/opinion.model';

describe('Component Tests', () => {
    describe('Opinion Management Detail Component', () => {
        let comp: OpinionDetailComponent;
        let fixture: ComponentFixture<OpinionDetailComponent>;
        const route = ({ data: of({ opinion: new Opinion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [OpinionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OpinionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OpinionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.opinion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
