import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConference } from 'app/shared/model/conference.model';

type EntityResponseType = HttpResponse<IConference>;
type EntityArrayResponseType = HttpResponse<IConference[]>;

@Injectable({ providedIn: 'root' })
export class ConferenceService {
    public resourceUrl = SERVER_API_URL + 'api/conferences';

    constructor(protected http: HttpClient) {}

    create(conference: IConference): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(conference);
        return this.http
            .post<IConference>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(conference: IConference): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(conference);
        return this.http
            .put<IConference>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IConference>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IConference[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    queryAccepted(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IConference[]>(this.resourceUrl.concat('/accepted'), { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(conference: IConference): IConference {
        const copy: IConference = Object.assign({}, conference, {
            startDate: conference.startDate != null && conference.startDate.isValid() ? conference.startDate.toJSON() : null,
            endDate: conference.endDate != null && conference.endDate.isValid() ? conference.endDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
            res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((conference: IConference) => {
                conference.startDate = conference.startDate != null ? moment(conference.startDate) : null;
                conference.endDate = conference.endDate != null ? moment(conference.endDate) : null;
            });
        }
        return res;
    }
}
