import React from 'react';
import './Booking.css';
import SearchDate from './search-date/Search-date';

class Booking extends React.Component {
	public render() {
		return (
			<div className="container">
                <div className="headline">
                    <h2>Boka bord</h2>
                </div>
                <div className="form-container">
                    <SearchDate/>

                </div>
			  	
			</div>
		);
	}
}

export default Booking;