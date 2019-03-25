import { ICity } from 'app/shared/model/city.model';

export interface ICountry {
    id?: number;
    name?: string;
    cities?: ICity[];
}

export class Country implements ICountry {
    constructor(public id?: number, public name?: string, public cities?: ICity[]) {}
}
