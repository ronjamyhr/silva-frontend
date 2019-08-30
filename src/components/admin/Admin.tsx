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

class Admin extends React.Component {
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

	constructor(props: any) {
		super(props);
		this.getBookings = this.getBookings.bind(this);
		this.mapBookings = this.mapBookings.bind(this);
		this.getBookings();
	}

	getBookings() {
		// Set correct path in config-url.js
		axios.get(`http://${urlPath}/silva-backend/api/booking/get-bookings.php
		`)
      .then(res => {
		this.setState({
			 bookings: res.data
		});
	  })
	}

	mapBookings(date: string, time: Number) {
		let mappedBookings: any = [];
		this.state.bookings.map( (item) => {
			console.log(typeof(item.booking_id));
			if(date === item.booking_date && time === item.sitting_time){
				mappedBookings.push(item);
			}
		});
		this.setState({
			bookings: mappedBookings
		});
		console.log(this.state.bookings);
	}

	public render() {
		return (
			<div>

				<Search mapBookings={this.mapBookings}/>

				<Bookings/>
                
			</div>
		);
	}
}

export default Admin;