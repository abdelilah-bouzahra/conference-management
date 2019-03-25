export const enum RoleName {
    ADMIN_CONFERENCE = 'ADMIN_CONFERENCE',
    AUTHOR = 'AUTHOR',
    REVIEWER = 'REVIEWER',
    CHAIR = 'CHAIR',
    KEYNOTE = 'KEYNOTE'
}

export interface IRole {
    id?: number;
    roleName?: RoleName;
}

export class Role implements IRole {
    constructor(public id?: number, public roleName?: RoleName) {}
}
