import React from 'react';
import './Booking.css';
import SearchDate from './search-date/Search-date';

class Booking extends React.Component {
	public render() {
		return (
			<div className="container">
                <div className="headline">
                    <h1>Boka bord</h1>
                </div>
                <div className="form-container">
                    <SearchDate/>

                </div>
			  	
			</div>
		);
	}
}

export default Booking;