import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INote } from 'app/shared/model/note.model';
import { NoteService } from './note.service';

@Component({
    selector: 'jhi-note-delete-dialog',
    templateUrl: './note-delete-dialog.component.html'
})
export class NoteDeleteDialogComponent {
    note: INote;

    constructor(protected noteService: NoteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.noteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'noteListModification',
                content: 'Deleted an note'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-note-delete-popup',
    template: ''
})
export class NoteDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ note }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NoteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.note = note;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/note', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/note', { outlets: { popup: null } }]);
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
