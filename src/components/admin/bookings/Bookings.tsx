import React from 'react';
import './Bookings.css';
import { IBooking } from './../Admin';
import IBookingToUpdate from './../interfaces/IBooking-to-update';
import { isTemplateElement } from '@babel/types';


interface IBookingsProps {
	bookingsOnTime: IBooking[];
	deleteBooking(id: number): any;
	update(booking: IBookingToUpdate): void;
}

class Bookings extends React.Component<IBookingsProps, {}> {

	constructor(props: any){
		super(props);
		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.handleChangeTime = this.handleChangeTime.bind(this);
		this.handleChangeGuests = this.handleChangeGuests.bind(this);
	}

	state = {
		bookings: this.props.bookingsOnTime,
	}

	componentDidUpdate(nextProps: IBookingsProps) {
		if (this.props !== nextProps) {
			this.setState({ bookings: nextProps.bookingsOnTime }); 
		}
	}

	delete(id: number): any {
        this.props.deleteBooking(id);
	}
	
	updateBooking(id: number): void {
/*
		let booking: IBookingToUpdate = {
			"id": item.booking_id,
			"date": item.booking_date,
			"time": item.sitting_time,
			"number_of_guests": item.number_of_guests_at_table
		}*/
		   
		let booking = this.state.bookings.find(item => item.booking_id === id);
		console.log(booking);

		if(booking){
			let bookingToChange = {
				"id": id,
				"date": booking.booking_date,
				"time": booking.sitting_time,
				"number_of_guests": booking.number_of_guests_at_table,
			};
			console.log(bookingToChange)
			this.props.update(bookingToChange);

		}
		   
	
		/*
		// Set a new state with the updated item
		let foundIndex = this.props.bookingsOnTime.findIndex(obj => obj.booking_id === item.booking_id);

		let newState = Object.assign({}, this.state);
		newState.bookings[foundIndex].booking_date = "";
		newState.bookings[foundIndex].sitting_time = 0;
		newState.bookings[foundIndex].number_of_guests_at_table = 0;
		this.setState(newState);*/

	}

	handleChangeDate(id: number, e:any){
		console.log(e.target.value);
		let foundIndex = this.props.bookingsOnTime.findIndex(obj => obj.booking_id === id);
		let newState = Object.assign({}, this.state);
		newState.bookings[foundIndex].booking_date = e.target.value;
		console.log(newState.bookings[foundIndex].booking_date);
		this.setState(newState);
	}

	handleChangeTime(id: number, e: any){
		console.log(e.target.value);
		let foundIndex = this.props.bookingsOnTime.findIndex(obj => obj.booking_id === id);
		let newState = Object.assign({}, this.state);
		newState.bookings[foundIndex].sitting_time = parseInt(e.target.value);
		console.log(newState.bookings[foundIndex].sitting_time);
		this.setState(newState);
	}

	handleChangeGuests(id: number, e: any){
		console.log(e.target.value);
		let foundIndex = this.props.bookingsOnTime.findIndex(obj => obj.booking_id === id);
		let newState = Object.assign({}, this.state);
		newState.bookings[foundIndex].number_of_guests_at_table = parseInt(e.target.value);
		console.log(newState.bookings[foundIndex].number_of_guests_at_table);
		this.setState(newState);
	}

	public render() {

/*
		const bookingList = this.state.bookings.map( item => {
			return <li key={item.booking_id.toString()}>{item.name_on_booking}
			<span onClick={this.delete.bind(this, item.booking_id)}>Delete</span>
			<span onClick={this.updateBooking.bind(this, item)}>Update</span></li>
		})*/

		const list = this.state.bookings.map( (item, index) => {
			
			return <li key={item.booking_id.toString()}>

				<form>

					<p>{item.name_on_booking}, {item.email_on_booking}</p>
					<label htmlFor=""></label>
					<input type="date" value={item.booking_date} onChange={(e) => this.handleChangeDate(item.booking_id, e)} />

					<label htmlFor=""></label>
					<input type="number" value={item.sitting_time} onChange={(e) => this.handleChangeTime(item.booking_id, e)} />

					<label htmlFor=""></label>
					<input type="number"value={item.number_of_guests_at_table} onChange={(e) => this.handleChangeGuests(item.booking_id, e)} />

				</form> 

				<span onClick={this.delete.bind(this, item.booking_id)}>Delete</span>
				<span onClick={this.updateBooking.bind(this, item.booking_id)}>Update</span>

			</li>
		})

		return (
			<div>

				<ul>
					{list}
				</ul>

			</div>
		);
	}
}

export default Bookings;