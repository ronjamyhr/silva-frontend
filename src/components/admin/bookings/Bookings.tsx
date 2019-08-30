import React from 'react';
import './Bookings.css';
import { IBooking } from './../Admin';

interface IBookingsProps {
	bookingsOnTime: IBooking[];
}

class Bookings extends React.Component<IBookingsProps, {}> {

	constructor(props: any){
		super(props);
	}


	public render() {
		return (
			<div>
                
			</div>
		);
	}
}

export default Bookings;