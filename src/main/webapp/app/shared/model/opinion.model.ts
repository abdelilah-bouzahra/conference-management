import { IUser } from 'app/core/user/user.model';
import { IArticle } from 'app/shared/model/article.model';

export interface IOpinion {
    id?: number;
    body?: string;
    type?: boolean;
    user?: IUser;
    article?: IArticle;
}

export class Opinion implements IOpinion {
    constructor(public id?: number, public body?: string, public type?: boolean, public user?: IUser, public article?: IArticle) {
        this.type = this.type || false;
    }
}
