import React from 'react';
import './Booking.css';
import SearchDate from './search-date/Search-date';
import axios from 'axios';
import BookTable from './book-table/Book-table';
import urlPath from './../../config-url';

export interface IBooking {
    booking_id: number,
    booking_date: any,
    sitting_time: number,
    number_of_guests_at_table: number,
    name_on_booking: string,
    email_on_booking: string
}

export interface IBookings {
    bookings: IBooking[];
    showBooking: boolean;
    dateAndTime: any;
}

class Booking extends React.Component<{}, IBookings> {

    constructor(props: any) {
        super(props);

        this.state = {
            bookings: [],
            showBooking: false,
            dateAndTime: {
                time: 0,
                date: ""
            }
        }

        this.getBookings = this.getBookings.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.getBookings();
    }

    getBookings() {
        axios.get(`http://${urlPath}/api/booking/get-bookings.php`)
            .then((result: any) => {
                this.setState({
                    bookings: result.data
                });
            });
    }

    handleTime(date: string, time: number) {

        this.setState(prevState => {
            let dateAndTime = Object.assign({}, prevState.dateAndTime);
            dateAndTime.date = date;
            dateAndTime.time = time;
            return { dateAndTime };
        });

        this.setState({
            showBooking: true,
        });
    }

    public render() {
        return (
            <React.Fragment>
                <main className="booking-main">
                    <div className="booking-container">
                        <div className="headline">
                            <h1>Boka bord</h1>
                        </div>
                            {this.state.showBooking ? null : <SearchDate bookings={this.state.bookings} timeSelected={this.handleTime.bind(this)} />}
                            {this.state.showBooking ? <BookTable dateTime={this.state.dateAndTime} /> : null}
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default Booking;

