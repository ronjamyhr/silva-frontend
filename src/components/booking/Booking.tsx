import React from 'react';
import './Booking.css';
import SearchDate from './search-date/Search-date';
import axios from 'axios';
import BookTable from './book-table/Book-table';
import urlPath from '../../config-url';
import { IStateBookings } from '../../interfaces/IBookings';

class Booking extends React.Component<{}, IStateBookings> {

    constructor(props: any) {
        super(props);

        this.state = {
            bookings: [
                {
                    booking_id: 0,
                    booking_date: '',
                    sitting_time: 0,
                    number_of_guests_at_table: 0,
                    name_on_booking: '',
                    email_on_booking: ''
                }
            ],
            showBooking: false,
            dateAndTime: {
                time: 0,
                date: ""
            }
        }
        this.getBookings = this.getBookings.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleDateAndTime = this.handleDateAndTime.bind(this);
    }

    componentDidMount() {
        this.getBookings();
        window.scrollTo(0, 0);
        
    }

    // get all bookings from db
    getBookings() {
        axios.get(`http://${urlPath}/booking/get-bookings.php`)
            .then((result: any) => {
                this.setState({
                    bookings: result.data
                });
            }).catch((error: any) => {
                console.log(error);
            });
    }

    // set choosen date and time as state 
    handleDateAndTime(date: string, time: number) {

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
                            {this.state.showBooking ? null : <SearchDate bookings={this.state.bookings} timeSelected={this.handleDateAndTime} />}
                            {this.state.showBooking ? <BookTable dateTime={this.state.dateAndTime}/> : null}
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default Booking;

