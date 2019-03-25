import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOpinion } from 'app/shared/model/opinion.model';

type EntityResponseType = HttpResponse<IOpinion>;
type EntityArrayResponseType = HttpResponse<IOpinion[]>;

@Injectable({ providedIn: 'root' })
export class OpinionService {
    public resourceUrl = SERVER_API_URL + 'api/opinions';

    constructor(protected http: HttpClient) {}

    create(opinion: IOpinion): Observable<EntityResponseType> {
        return this.http.post<IOpinion>(this.resourceUrl, opinion, { observe: 'response' });
    }

    update(opinion: IOpinion): Observable<EntityResponseType> {
        return this.http.put<IOpinion>(this.resourceUrl, opinion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOpinion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOpinion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
