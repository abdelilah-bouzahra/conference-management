import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDomain } from 'app/shared/model/domain.model';

@Component({
    selector: 'jhi-domain-detail',
    templateUrl: './domain-detail.component.html'
})
export class DomainDetailComponent implements OnInit {
    domain: IDomain;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ domain }) => {
            this.domain = domain;
        });
    }

    previousState() {
        window.history.back();
    }
}
