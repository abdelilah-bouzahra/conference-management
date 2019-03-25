import { IHotel } from 'app/shared/model/hotel.model';
import { ICountry } from 'app/shared/model/country.model';

export interface ICity {
    id?: number;
    name?: string;
    hotels?: IHotel[];
    country?: ICountry;
}

export class City implements ICity {
    constructor(public id?: number, public name?: string, public hotels?: IHotel[], public country?: ICountry) {}
}
