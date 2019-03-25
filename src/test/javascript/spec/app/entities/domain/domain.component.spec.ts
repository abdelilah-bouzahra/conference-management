/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConferenceManagementTestModule } from '../../../test.module';
import { DomainComponent } from 'app/entities/domain/domain.component';
import { DomainService } from 'app/entities/domain/domain.service';
import { Domain } from 'app/shared/model/domain.model';

describe('Component Tests', () => {
    describe('Domain Management Component', () => {
        let comp: DomainComponent;
        let fixture: ComponentFixture<DomainComponent>;
        let service: DomainService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [DomainComponent],
                providers: []
            })
                .overrideTemplate(DomainComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DomainComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DomainService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Domain(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.domains[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
