import React from 'react';
import './Admin.css';
import axios from 'axios';
import Search from './search/Search';
import Bookings from './bookings/Bookings';
import urlPath from './../../config-url';
import { IBookingToUpdate } from '../../interfaces/admin/IBooking-to-update';
import { IStateAdminBookings } from '../../interfaces/booking/IBookings';

class Admin extends React.Component<{}, IStateAdminBookings> {

	constructor(props: IStateAdminBookings) {
		super(props);
		this.getBookings = this.getBookings.bind(this);
		this.mapBookings = this.mapBookings.bind(this);
		this.deleteBooking = this.deleteBooking.bind(this);

		this.state = {
			bookings: [],
			showBooking: false
		}
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

		res.map((item: any) => {

			if (date == item.booking_date && time == item.sitting_time) {
				mappedBookings.push(item);
			}
		})

		this.setState({
			bookings: mappedBookings,
			showBooking: true
		});

	}

	deleteBooking(id: number) {

		axios.delete(`http://${urlPath}/api/booking/delete-booking.php
		`, {
				"data": {
					"id": id
				}
			})
			.then(() => {
				const prevBookings = this.state.bookings;
				const filteredBookings = prevBookings.filter(item => item.booking_id !== id);
				this.setState({ bookings: filteredBookings });
				alert("Booking deleted");
			})

	}

	update(booking: IBookingToUpdate) {

		axios.post(`http://${urlPath}/api/booking/update.php
		`, JSON.stringify(booking)
		)
			.then(function (response) {
				console.log('saved successfully')
				alert("Booking updated");
			});

	}

	public render() {
		return (
			<main className="admin-main">
				<div className="admin-container">
					<div className="admin-headline">
						<h1>Admin</h1>
					</div>
					<Search getBookings={this.getBookings} />
					{this.state.bookings.length <= 0 && this.state.showBooking === true ? <p className="no-bookings-message">Det finns inga bokningar det valda datumet.</p> : 
					<Bookings bookingsOnTime={this.state.bookings} deleteBooking={this.deleteBooking} update={this.update} />}
				</div>
			</main>
		);

	}
}

export default Admin;