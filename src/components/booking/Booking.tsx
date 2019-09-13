import React from 'react';
import './Booking.css';
import SearchDate from './search-date/Search-date';
import axios from 'axios';
import BookTable from './book-table/Book-table';
import urlPath from '../../config-url';
import { IStateBookings } from '../../interfaces/booking/IBookings';
import Confirmation from './confirmation/Confirmation';

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
            showConfirm: false,
            dateAndTime: {
                time: 0,
                date: ""
            },
            customerDetails: {
                name: '',
                date: '',
                time: 0
            }
        }
        this.getBookings = this.getBookings.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleDateAndTime = this.handleDateAndTime.bind(this);
        this.handleCustomerInfo = this.handleCustomerInfo.bind(this);
    }

    componentDidMount() {
        this.getBookings();
        window.scrollTo(0, 0);

    }

    // get all bookings from db
    getBookings() {
        axios.get(`http://${urlPath}/api/booking/get-bookings.php`)
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

    // set form values from booking as state 
    handleCustomerInfo(name: string, date: string, time: number) {

        this.setState(prevState => {
            let customerDetails = Object.assign({}, prevState.customerDetails);
            customerDetails.name = name;
            customerDetails.date = date;
            customerDetails.time = time;
            return { customerDetails };
        });
        this.setState({
            showConfirm: true,
            showBooking: false
        });

    }


    public render() {

        let bookTable: JSX.Element = (<div></div>);
        if (!this.state.showBooking || !this.state.showConfirm) {
            bookTable = (<SearchDate bookings={this.state.bookings} timeSelected={this.handleDateAndTime} />);
        }
        if (this.state.showBooking) {
            bookTable = (<BookTable customerInfo={this.handleCustomerInfo} dateTime={this.state.dateAndTime} />);

        }
        if (this.state.showConfirm && !this.state.showBooking) {
            bookTable = (<BookTable customerInfo={this.handleCustomerInfo} dateTime={this.state.dateAndTime} />);
        }
        if (this.state.showConfirm && !this.state.showBooking) {
            bookTable = (<Confirmation customerInfo={this.state.customerDetails} />);
        }


        return (
            <React.Fragment>
                <main className="booking-main">
                    <div className="booking-container">
                        <div className="headline">
                            <h1>Boka bord</h1>
                        </div>
                        {bookTable}
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default Booking;

