/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConferenceManagementTestModule } from '../../../test.module';
import { DomainDetailComponent } from 'app/entities/domain/domain-detail.component';
import { Domain } from 'app/shared/model/domain.model';

describe('Component Tests', () => {
    describe('Domain Management Detail Component', () => {
        let comp: DomainDetailComponent;
        let fixture: ComponentFixture<DomainDetailComponent>;
        const route = ({ data: of({ domain: new Domain(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [DomainDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DomainDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DomainDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.domain).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
