import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOpinion } from 'app/shared/model/opinion.model';

@Component({
    selector: 'jhi-opinion-detail',
    templateUrl: './opinion-detail.component.html'
})
export class OpinionDetailComponent implements OnInit {
    opinion: IOpinion;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ opinion }) => {
            this.opinion = opinion;
        });
    }

    previousState() {
        window.history.back();
    }
}
