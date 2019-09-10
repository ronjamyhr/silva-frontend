import React from 'react';
import './Bookings.css';
import { IBooking } from './../Admin';

interface IBookingsProps {
	bookingsOnTime: IBooking[];
	deleteBooking(id: number): any;
	update(id: number): void;
}

class Bookings extends React.Component<IBookingsProps, {}> {

	constructor(props: any){
		super(props);
	}

	delete(id: number): any {
        this.props.deleteBooking(id);
	}
	
	updateBooking(id: number): void {
		this.props.update(id);
	}

	public render() {

		const bookingList = this.props.bookingsOnTime.map( item => {
			return <li key={item.booking_id.toString()}>{item.name_on_booking}
			<span onClick={this.delete.bind(this, item.booking_id)}>Delete</span>
			<span onClick={this.updateBooking.bind(this, item.booking_id)}>Update</span></li>
		})

		return (
			<div>

				<ul>
					{bookingList}
				</ul>

			</div>
		);
	}
}

export default Bookings;