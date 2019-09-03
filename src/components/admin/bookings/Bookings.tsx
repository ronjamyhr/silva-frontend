import React from 'react';
import './Bookings.css';
import { IBooking } from './../Admin';

interface IBookingsProps {
	bookingsOnTime: IBooking[];
}

class Bookings extends React.Component<IBookingsProps, {}> {

	constructor(props: any){
		super(props);
		console.log(props.bookingsOnTime);
	}

	bookingList = this.props.bookingsOnTime.map( (item, index) => {
		return <li key={index}>{item.name_on_booking}</li>
	})

	public render() {
		return (
			<div>

				<ul>
					{this.bookingList}
				</ul>
                
			</div>
		);
	}
}

export default Bookings;