import React from 'react';
import './Admin.css';
import axios from 'axios';
import Search from './search/Search';
import Bookings from './bookings/Bookings';
import urlPath from './../../config-url';

export interface IBooking {
	booking_id: string,
	booking_date: Date,
	sitting_time: Number,
	number_of_guests_at_table: Number,
	name_on_booking: string,
	email_on_booking: string
}

export interface IBookings {
	bookings: IBooking[];
}

class Admin extends React.Component {
	state = {
		bookings: []
	}

	constructor(props: any) {
		super(props);
		this.getBookings = this.getBookings.bind(this);
		this.getBookings();
	}

	getBookings() {
		// Set correct path in config-url.js
		axios.get(`http://${urlPath}/silva-backend/api/booking/get-bookings.php
		`)
      .then(res => {
		console.log(res.data);
		this.setState({ bookings: [res.data] });
	  })
	  
	}

	public render() {
		return (
			<div>

				<Search />

				<Bookings  />
                
			</div>
		);
	}
}

export default Admin;