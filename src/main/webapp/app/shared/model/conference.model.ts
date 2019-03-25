import { Moment } from 'moment';
import { IArticle } from 'app/shared/model/article.model';

export interface IConference {
    id?: number;
    title?: string;
    description?: string;
    address?: string;
    startDate?: Moment;
    endDate?: Moment;
    accepted?: boolean;
    articles?: IArticle[];
}

export class Conference implements IConference {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public address?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public accepted?: boolean,
        public articles?: IArticle[]
    ) {
        this.accepted = this.accepted || false;
    }
}
