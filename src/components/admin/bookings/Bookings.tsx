import React from 'react';
import './Bookings.css';
import IBookingToUpdate from './../interfaces/IBooking-to-update';
import { IBooking } from '../../booking/interfaces/IBookings';

interface IBookingsProps {
	bookingsOnTime: IBooking[];
	deleteBooking(id: number): any;
	update(booking: IBookingToUpdate): void;
}

class Bookings extends React.Component<IBookingsProps, {}> {

	constructor(props: any) {
		super(props);
		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.handleChangeTime = this.handleChangeTime.bind(this);
		this.handleChangeGuests = this.handleChangeGuests.bind(this);
	}

	state = {bookings: this.props.bookingsOnTime}


	static getDerivedStateFromProps(props: any) {
		return {
			bookings: props.bookingsOnTime
		};
	}


	delete(id: number): any {
		const newState = this.state.bookings;
		const result = newState.filter(item => item.booking_id !== id);
		this.setState({bookings: result});
		this.props.deleteBooking(id);
	}

	updateBooking(id: number): void {

		let booking = this.state.bookings.find(item => item.booking_id === id);

		if (booking) {
			let bookingToChange = {
				"id": id,
				"date": booking.booking_date,
				"time": booking.sitting_time,
				"number_of_guests": booking.number_of_guests_at_table,
			};
			this.props.update(bookingToChange);
		}

	}

	handleChangeDate(id: number, e:any) {
		let foundIndex = this.props.bookingsOnTime.findIndex(obj => obj.booking_id === id);
		let newState = Object.assign({}, this.state);
		newState.bookings[foundIndex].booking_date = e.target.value;
		this.setState(newState);
	}

	handleChangeTime(id: number, e: any) {
		let foundIndex = this.props.bookingsOnTime.findIndex(obj => obj.booking_id === id);
		let newState = Object.assign({}, this.state);
		newState.bookings[foundIndex].sitting_time = parseInt(e.target.value);
		this.setState(newState);
	}

	handleChangeGuests(id: number, e: any) {
		let foundIndex = this.props.bookingsOnTime.findIndex(obj => obj.booking_id === id);
		let newState = Object.assign({}, this.state);
		newState.bookings[foundIndex].number_of_guests_at_table = parseInt(e.target.value);
		this.setState(newState);
	}

	public render() {

		const list = this.state.bookings.map(item => {

			if(item.booking_id !== 0){

				return <li className="admin-bookings-list" key={item.booking_id.toString()}>

					<form className="admin-update-form">

						<p className="admin-costumer-name">Namn: {item.name_on_booking}</p>
						<p className="admin-costumer-mail">Email: {item.email_on_booking}</p>
						<label htmlFor="">Datum:</label>
						<input type="date" value={item.booking_date} 
						onChange={(e) => this.handleChangeDate(item.booking_id, e)} />

						<label htmlFor="">Sittning:</label>
						<input type="number" value={item.sitting_time} 
						onChange={(e) => this.handleChangeTime(item.booking_id, e)} />

						<label htmlFor="">Antal gäster:</label>
						<input type="number" value={item.number_of_guests_at_table} 
						onChange={(e) => this.handleChangeGuests(item.booking_id, e)} />

					</form>

					<span className="admin-delete-button" 
					onClick={this.delete.bind(this, item.booking_id)}>Ta bort</span>
					<span className="admin-update-button" 
					onClick={this.updateBooking.bind(this, item.booking_id)}>Uppdatera</span>

				</li>

			}

		})

		return (
			<div className="admin-bookings-container">
				<ul>
					{list}
				</ul>
			</div>
		);

	}
}

export default Bookings;
