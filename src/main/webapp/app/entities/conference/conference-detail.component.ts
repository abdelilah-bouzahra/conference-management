import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IConference } from 'app/shared/model/conference.model';

@Component({
    selector: 'jhi-conference-detail',
    templateUrl: './conference-detail.component.html'
})
export class ConferenceDetailComponent implements OnInit {
    conference: IConference;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ conference }) => {
            this.conference = conference;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
