import { IHotel } from 'app/shared/model/hotel.model';

export const enum RoomType {
    ROOM_SINGLE = 'ROOM_SINGLE',
    ROOM_DOUBLE = 'ROOM_DOUBLE',
    ROOM_TRIPLE = 'ROOM_TRIPLE',
    ROOM_QUAD = 'ROOM_QUAD',
    ROOM_QUEEN = 'ROOM_QUEEN',
    ROOM_KING = 'ROOM_KING',
    ROOM_TWIN = 'ROOM_TWIN',
    ROOM_STUDIO = 'ROOM_STUDIO'
}

export const enum RoomState {
    ROOM_AVAILABLE = 'ROOM_AVAILABLE',
    ROOM_RESERVED = 'ROOM_RESERVED'
}

export interface IRoom {
    id?: number;
    numberRoom?: number;
    numberFloor?: number;
    roomType?: RoomType;
    roomState?: RoomState;
    hotel?: IHotel;
}

export class Room implements IRoom {
    constructor(
        public id?: number,
        public numberRoom?: number,
        public numberFloor?: number,
        public roomType?: RoomType,
        public roomState?: RoomState,
        public hotel?: IHotel
    ) {}
}
