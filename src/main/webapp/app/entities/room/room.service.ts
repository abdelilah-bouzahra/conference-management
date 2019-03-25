import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRoom } from 'app/shared/model/room.model';

type EntityResponseType = HttpResponse<IRoom>;
type EntityArrayResponseType = HttpResponse<IRoom[]>;

@Injectable({ providedIn: 'root' })
export class RoomService {
    public resourceUrl = SERVER_API_URL + 'api/rooms';

    constructor(protected http: HttpClient) {}

    create(room: IRoom): Observable<EntityResponseType> {
        return this.http.post<IRoom>(this.resourceUrl, room, { observe: 'response' });
    }

    update(room: IRoom): Observable<EntityResponseType> {
        return this.http.put<IRoom>(this.resourceUrl, room, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRoom>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRoom[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
