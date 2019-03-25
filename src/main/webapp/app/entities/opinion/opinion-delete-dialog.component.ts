import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOpinion } from 'app/shared/model/opinion.model';
import { OpinionService } from './opinion.service';

@Component({
    selector: 'jhi-opinion-delete-dialog',
    templateUrl: './opinion-delete-dialog.component.html'
})
export class OpinionDeleteDialogComponent {
    opinion: IOpinion;

    constructor(protected opinionService: OpinionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.opinionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'opinionListModification',
                content: 'Deleted an opinion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-opinion-delete-popup',
    template: ''
})
export class OpinionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ opinion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OpinionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.opinion = opinion;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/opinion', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/opinion', { outlets: { popup: null } }]);
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
