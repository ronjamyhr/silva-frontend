import React from 'react';
import './Confirmation.css';

interface IBookingDetail {
    customerInfo: IBookingDetails;
}

export interface IBookingDetails {
    name: string;
	date: string;
	time: number;
}

interface IBookingState {
    name: string;
    date: string;
    time: number;
}

class Confirmation extends React.Component <IBookingDetail, IBookingState > {

    constructor(props: IBookingDetail) {
        super(props);

        this.state = {
            name: this.props.customerInfo.name,
            date: this.props.customerInfo.date,
            time: this.props.customerInfo.time
        }
    }
	public render() {
		return (
			<React.Fragment>
				<div className="confirm-container">
				<h2 className="confirm-heading">Bokningsbekräftelse</h2>
					<p>Tack {this.state.name} för din bokning!</p>
					<p className="confirm-date-time-text">Du har nu bokat bord hos oss den {this.state.date} kl: {this.state.time}.00</p>
					<p className="confirm-welcome-text">Vi på Silva önskar er varmt välkomna!</p>
					<p>Avbokning sker via mejl eller telefon</p>
					<p>silva@mail.se och +46 123 456</p>
				</div>
			</React.Fragment>
		);
	}
}

export default Confirmation;