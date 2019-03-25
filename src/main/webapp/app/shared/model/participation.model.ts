import { IUser } from 'app/core/user/user.model';
import { IRole } from 'app/shared/model/role.model';
import { IConference } from 'app/shared/model/conference.model';

export interface IParticipation {
    id?: number;
    accepted?: boolean;
    user?: IUser;
    role?: IRole;
    conference?: IConference;
}

export class Participation implements IParticipation {
    constructor(public id?: number, public accepted?: boolean, public user?: IUser, public role?: IRole, public conference?: IConference) {
        this.accepted = this.accepted || false;
    }
}
