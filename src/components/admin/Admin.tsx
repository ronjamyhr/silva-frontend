import React from 'react';
import './Admin.css';
import axios from 'axios';
import Search from './search/Search';
import Bookings from './bookings/Bookings';
import urlPath from './../../config-url';
import IBookingToUpdate from './interfaces/IBooking-to-update';

export interface IBooking {
	booking_id: number,
	booking_date: string,
	sitting_time: number,
	number_of_guests_at_table: number,
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
				sitting_time: 18,
				number_of_guests_at_table: 0,
				name_on_booking: '',
				email_on_booking: ''
			}
		]
		
	}

	getBookings(date: string, time: number) {
		// Set correct path in config-url.js
		axios.get(`http://${urlPath}/api/booking/get-bookings.php
		`)
      .then(res => {
		this.mapBookings(date, time, res.data);
	  })
	}

	mapBookings(date: string, time: number, res: any) {
		let mappedBookings: any = [];
		res.map( (item: any) => {
			if(date == item.booking_date && time == item.sitting_time){
				mappedBookings.push(item);
			}
			return item;
		})
		this.setState({
			bookings: mappedBookings
		});
	}

	deleteBooking(id: number) {
		axios.delete(`http://${urlPath}/api/booking/delete-booking.php
		`, {
            "data": {
                "id": id
            }
         })
		.then( () => {
			const prevBookings = this.state.bookings;
			const filteredBookings = prevBookings.filter(item => item.booking_id !== id);
			this.setState({bookings: filteredBookings});
		})
	}

	update(booking: IBookingToUpdate) {
		axios.post(`http://${urlPath}/api/booking/update.php
		`, JSON.stringify(booking)
         )
    	.then(function(response){
        	console.log('saved successfully')
		});
	}

	public render() {
		return (
			<div>

				<Search getBookings={this.getBookings}/>

				<Bookings bookingsOnTime={this.state.bookings} deleteBooking={this.deleteBooking} update={this.update}/>
                
			</div>
		);
	}
}

export default Admin;