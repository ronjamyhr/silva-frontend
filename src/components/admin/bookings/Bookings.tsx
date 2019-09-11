import React from 'react';
import './Bookings.css';
import { IBooking } from './../Admin';
import IBookingToUpdate from './../interfaces/IBooking-to-update';


interface IBookingsProps {
	bookingsOnTime: IBooking[];
	deleteBooking(id: number): any;
	update(booking: IBookingToUpdate): void;
}

class Bookings extends React.Component<IBookingsProps, {}> {

	constructor(props: any){
		super(props);
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
	
	updateBooking(item: any): void {

		let booking: IBookingToUpdate = {
			"id": item.booking_id,
			"date": item.booking_date,
			"time": item.sitting_time,
			"number_of_guests": item.number_of_guests_at_table
		}

		//this.props.update(booking);

		// Set a new state with the updated item
		let foundIndex = this.props.bookingsOnTime.findIndex(obj => obj.booking_id === item.booking_id);

		let newState = Object.assign({}, this.state);
		newState.bookings[foundIndex].booking_date = "";
		newState.bookings[foundIndex].sitting_time = 0;
		newState.bookings[foundIndex].number_of_guests_at_table = 0;
		this.setState(newState);

	}

	public render() {

		const bookingList = this.props.bookingsOnTime.map( item => {
			return <li key={item.booking_id.toString()}>{item.name_on_booking}
			<span onClick={this.delete.bind(this, item.booking_id)}>Delete</span>
			<span onClick={this.updateBooking.bind(this, item)}>Update</span></li>
		})

		const list = this.props.bookingsOnTime.map( item => {
			
			return <li key={item.booking_id.toString()}>

				<form>

					<p>{item.name_on_booking}, {item.email_on_booking}</p>
					<label htmlFor=""></label>
					<input type="text" value={item.booking_date} />

					<label htmlFor=""></label>
					<input type="text"value={item.sitting_time} />

					<label htmlFor=""></label>
					<input type="text"value={item.number_of_guests_at_table} />

				</form> 

				<span onClick={this.delete.bind(this, item.booking_id)}>Delete</span>
				<span onClick={this.updateBooking.bind(this, item)}>Update</span>

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