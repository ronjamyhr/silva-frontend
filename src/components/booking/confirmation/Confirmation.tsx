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
				<h1 className="confirm-heading">Bokningsbekräftelse</h1>
				<div className="confirm-container">
					<h2>Tack {this.state.name} för din bokning!</h2>
					<p>Du har nu bokat bord hos oss den {this.state.date} kl: {this.state.time}</p>
					<p>Vi på Silva önskar er varmt välkomna!</p>
					<p>Avbokning sker via mejl eller telefon</p>
					<p>(MEJL) och (TELE)</p>
				</div>
			</React.Fragment>
		);
	}
}

export default Confirmation;