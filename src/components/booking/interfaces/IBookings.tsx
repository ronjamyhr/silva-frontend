export interface IBooking {
    booking_id: number,
    booking_date: any,
    sitting_time: any,
    number_of_guests_at_table: number,
    name_on_booking: string,
    email_on_booking: string
}

export interface IBookings {
    bookings: IBooking[];
    showBooking: boolean;
    dateAndTime: any;
}

// export default IBookings;