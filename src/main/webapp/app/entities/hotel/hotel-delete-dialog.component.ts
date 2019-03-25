import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from './hotel.service';

@Component({
    selector: 'jhi-hotel-delete-dialog',
    templateUrl: './hotel-delete-dialog.component.html'
})
export class HotelDeleteDialogComponent {
    hotel: IHotel;

    constructor(protected hotelService: HotelService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hotelService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hotelListModification',
                content: 'Deleted an hotel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hotel-delete-popup',
    template: ''
})
export class HotelDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hotel }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HotelDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.hotel = hotel;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/hotel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/hotel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
