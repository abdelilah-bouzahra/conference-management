import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRoom } from 'app/shared/model/room.model';
import { RoomService } from './room.service';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel';

@Component({
    selector: 'jhi-room-update',
    templateUrl: './room-update.component.html'
})
export class RoomUpdateComponent implements OnInit {
    room: IRoom;
    isSaving: boolean;

    hotels: IHotel[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected roomService: RoomService,
        protected hotelService: HotelService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ room }) => {
            this.room = room;
        });
        this.hotelService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IHotel[]>) => mayBeOk.ok),
                map((response: HttpResponse<IHotel[]>) => response.body)
            )
            .subscribe((res: IHotel[]) => (this.hotels = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.room.id !== undefined) {
            this.subscribeToSaveResponse(this.roomService.update(this.room));
        } else {
            this.subscribeToSaveResponse(this.roomService.create(this.room));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoom>>) {
        result.subscribe((res: HttpResponse<IRoom>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackHotelById(index: number, item: IHotel) {
        return item.id;
    }
}
