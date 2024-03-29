/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConferenceManagementTestModule } from '../../../test.module';
import { ArticleComponent } from 'app/entities/article/article.component';
import { ArticleService } from 'app/entities/article/article.service';
import { Article } from 'app/shared/model/article.model';

describe('Component Tests', () => {
    describe('Article Management Component', () => {
        let comp: ArticleComponent;
        let fixture: ComponentFixture<ArticleComponent>;
        let service: ArticleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [ArticleComponent],
                providers: []
            })
                .overrideTemplate(ArticleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ArticleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Article(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.articles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
