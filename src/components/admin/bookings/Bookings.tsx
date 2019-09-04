import React from 'react';
import './Bookings.css';
import { IBooking } from './../Admin';

interface IBookingsProps {
	bookingsOnTime: IBooking[];
	deleteBooking(id: Number): any;
}

class Bookings extends React.Component<IBookingsProps, {}> {

	constructor(props: any){
		super(props);
		console.log(props.bookingsOnTime);
		console.log("test");
	}

	delete(id: Number): any {
        this.props.deleteBooking(id);
    }

	public render() {

		const bookingList = this.props.bookingsOnTime.map( item => {
			return <li key={item.booking_id.toString()}>{item.name_on_booking}
			<span onClick={this.delete.bind(this, item.booking_id)}>Delete</span></li>
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