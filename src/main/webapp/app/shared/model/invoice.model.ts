import { Moment } from 'moment';

export interface IInvoice {
    id?: number;
    dateInvoice?: Moment;
    sum?: number;
}

export class Invoice implements IInvoice {
    constructor(public id?: number, public dateInvoice?: Moment, public sum?: number) {}
}
