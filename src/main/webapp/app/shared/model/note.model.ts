import { IUser } from 'app/core/user/user.model';
import { IArticle } from 'app/shared/model/article.model';

export interface INote {
    id?: number;
    note?: number;
    user?: IUser;
    article?: IArticle;
}

export class Note implements INote {
    constructor(public id?: number, public note?: number, public user?: IUser, public article?: IArticle) {}
}
