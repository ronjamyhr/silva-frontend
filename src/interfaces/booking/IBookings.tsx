export interface IBooking {
    booking_id: number,
    booking_date: any,
    sitting_time: any,
    number_of_guests_at_table: number,
    name_on_booking: string,
    email_on_booking: string
}

export interface IStateBookings {
    bookings: IBooking[];
    showBooking: boolean;
    showConfirm: boolean;
    dateAndTime: any;
    customerDetails: any;
}

export interface IStateAdminBookings {
	bookings: IBooking[];
    showBooking: boolean;
}