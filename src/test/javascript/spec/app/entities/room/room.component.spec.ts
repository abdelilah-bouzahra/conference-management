/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConferenceManagementTestModule } from '../../../test.module';
import { RoomComponent } from 'app/entities/room/room.component';
import { RoomService } from 'app/entities/room/room.service';
import { Room } from 'app/shared/model/room.model';

describe('Component Tests', () => {
    describe('Room Management Component', () => {
        let comp: RoomComponent;
        let fixture: ComponentFixture<RoomComponent>;
        let service: RoomService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConferenceManagementTestModule],
                declarations: [RoomComponent],
                providers: []
            })
                .overrideTemplate(RoomComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RoomComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Room(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.rooms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
