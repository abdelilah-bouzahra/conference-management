import { IUser } from 'app/core/user/user.model';
import { IDomain } from 'app/shared/model/domain.model';
import { IConference } from 'app/shared/model/conference.model';

export interface IArticle {
    id?: number;
    title?: string;
    summary?: string;
    fileContentType?: string;
    file?: any;
    accepted?: boolean;
    user?: IUser;
    authors?: IUser[];
    domains?: IDomain[];
    conference?: IConference;
}

export class Article implements IArticle {
    constructor(
        public id?: number,
        public title?: string,
        public summary?: string,
        public fileContentType?: string,
        public file?: any,
        public accepted?: boolean,
        public user?: IUser,
        public authors?: IUser[],
        public domains?: IDomain[],
        public conference?: IConference
    ) {
        this.accepted = this.accepted || false;
    }
}
