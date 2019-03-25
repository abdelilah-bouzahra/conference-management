import { IRoom } from 'app/shared/model/room.model';
import { ICity } from 'app/shared/model/city.model';

export interface IHotel {
    id?: number;
    name?: string;
    address?: string;
    numberFloors?: number;
    numberRooms?: number;
    rooms?: IRoom[];
    city?: ICity;
}

export class Hotel implements IHotel {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public numberFloors?: number,
        public numberRooms?: number,
        public rooms?: IRoom[],
        public city?: ICity
    ) {}
}
