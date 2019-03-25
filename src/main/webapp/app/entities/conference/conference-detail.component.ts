import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConference } from 'app/shared/model/conference.model';

@Component({
    selector: 'jhi-conference-detail',
    templateUrl: './conference-detail.component.html'
})
export class ConferenceDetailComponent implements OnInit {
    conference: IConference;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ conference }) => {
            this.conference = conference;
        });
    }

    previousState() {
        window.history.back();
    }
}
