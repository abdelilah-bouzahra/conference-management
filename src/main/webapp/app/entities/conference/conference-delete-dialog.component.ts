import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConference } from 'app/shared/model/conference.model';
import { ConferenceService } from './conference.service';

@Component({
    selector: 'jhi-conference-delete-dialog',
    templateUrl: './conference-delete-dialog.component.html'
})
export class ConferenceDeleteDialogComponent {
    conference: IConference;

    constructor(
        protected conferenceService: ConferenceService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.conferenceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'conferenceListModification',
                content: 'Deleted an conference'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-conference-delete-popup',
    template: ''
})
export class ConferenceDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ conference }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ConferenceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.conference = conference;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/conference', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/conference', { outlets: { popup: null } }]);
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
