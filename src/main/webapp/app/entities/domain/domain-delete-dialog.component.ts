import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDomain } from 'app/shared/model/domain.model';
import { DomainService } from './domain.service';

@Component({
    selector: 'jhi-domain-delete-dialog',
    templateUrl: './domain-delete-dialog.component.html'
})
export class DomainDeleteDialogComponent {
    domain: IDomain;

    constructor(protected domainService: DomainService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.domainService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'domainListModification',
                content: 'Deleted an domain'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-domain-delete-popup',
    template: ''
})
export class DomainDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ domain }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DomainDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.domain = domain;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/domain', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/domain', { outlets: { popup: null } }]);
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
