import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDomain } from 'app/shared/model/domain.model';

type EntityResponseType = HttpResponse<IDomain>;
type EntityArrayResponseType = HttpResponse<IDomain[]>;

@Injectable({ providedIn: 'root' })
export class DomainService {
    public resourceUrl = SERVER_API_URL + 'api/domains';

    constructor(protected http: HttpClient) {}

    create(domain: IDomain): Observable<EntityResponseType> {
        return this.http.post<IDomain>(this.resourceUrl, domain, { observe: 'response' });
    }

    update(domain: IDomain): Observable<EntityResponseType> {
        return this.http.put<IDomain>(this.resourceUrl, domain, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDomain>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDomain[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
