import { IUser } from 'app/core/user/user.model';
import { IArticle } from 'app/shared/model/article.model';

export interface IDomain {
    id?: number;
    name?: string;
    users?: IUser[];
    articles?: IArticle[];
}

export class Domain implements IDomain {
    constructor(public id?: number, public name?: string, public users?: IUser[], public articles?: IArticle[]) {}
}
