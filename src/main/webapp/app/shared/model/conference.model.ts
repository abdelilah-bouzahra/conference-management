import { Moment } from 'moment';
import { IArticle } from 'app/shared/model/article.model';
import { IUser } from 'app/core/user/user.model';

export interface IConference {
    id?: number;
    title?: string;
    description?: string;
    photoContentType?: string;
    photo?: any;
    address?: string;
    startDate?: Moment;
    endDate?: Moment;
    accepted?: boolean;
    articles?: IArticle[];
    user?: IUser;
}

export class Conference implements IConference {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public photoContentType?: string,
        public photo?: any,
        public address?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public accepted?: boolean,
        public articles?: IArticle[],
        public user?: IUser
    ) {
        this.accepted = this.accepted || false;
    }
}
