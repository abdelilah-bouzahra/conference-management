import { Moment } from 'moment';
import { IRoom } from 'app/shared/model/room.model';
import { IUser } from 'app/core/user/user.model';
import { IInvoice } from 'app/shared/model/invoice.model';

export interface IBooking {
    id?: number;
    bookingDate?: Moment;
    arrivedDate?: Moment;
    departureDate?: Moment;
    numberPerson?: number;
    room?: IRoom;
    user?: IUser;
    invoice?: IInvoice;
}

export class Booking implements IBooking {
    constructor(
        public id?: number,
        public bookingDate?: Moment,
        public arrivedDate?: Moment,
        public departureDate?: Moment,
        public numberPerson?: number,
        public room?: IRoom,
        public user?: IUser,
        public invoice?: IInvoice
    ) {}
}
