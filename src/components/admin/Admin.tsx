import React from 'react';
import './Admin.css';
import axios from 'axios';
import Search from './search/Search';
import Bookings from './bookings/Bookings';
import urlPath from './../../config-url';

export interface IBooking {
	booking_id: Number,
	booking_date: string,
	sitting_time: Number,
	number_of_guests_at_table: Number,
	name_on_booking: string,
	email_on_booking: string
}

export interface IBookings {
	bookings: IBooking[];
}

class Admin extends React.Component<{}, IBookings> {

	constructor(props: any) {
		super(props);
		this.getBookings = this.getBookings.bind(this);
		this.mapBookings = this.mapBookings.bind(this);
		this.deleteBooking = this.deleteBooking.bind(this);
	}

	state = {
		bookings: [
			{
				booking_id: 0,
				booking_date: '',
				sitting_time: 0,
				number_of_guests_at_table: 0,
				name_on_booking: '',
				email_on_booking: ''
			}
		]
	}

	getBookings(date: string, time: Number) {
		// Set correct path in config-url.js
		axios.get(`http://${urlPath}/silva-backend/api/booking/get-bookings.php
		`)
      .then(res => {
		console.log(res.data);
		this.mapBookings(date, time, res.data);
	  })
	}

	mapBookings(date: string, time: Number, res: any) {
		let mappedBookings: any = [];
		res.map( (item: any) => {
			if(date === item.booking_date && time === item.sitting_time){
				mappedBookings.push(item);
			}
		});
		this.setState({
			bookings: mappedBookings
		});
		console.log(this.state.bookings);
	}

	deleteBooking(id: Number) {
		axios.delete(`http://${urlPath}/silva-backend/api/booking/delete-booking.php
		`, {
            "data": {
                "id": id
            }
         })
		.then( () => {
			console.log(id);
			const prevBookings = this.state.bookings;
			const filteredBookings = prevBookings.filter(item => item.booking_id !== id);
			this.setState({bookings: filteredBookings});
		})
	}

	public render() {
		return (
			<div>

				<Search getBookings={this.getBookings}/>

				<Bookings bookingsOnTime={this.state.bookings} deleteBooking={this.deleteBooking}/>
                
			</div>
		);
	}
}

export default Admin;