import React from 'react';
import './Book-table.css';

interface IDateTime {
	dateTime: IDateTimes[];
}

export interface IDateTimes {
	choosenDate: string;
	choosenTime: number;
}

class BookTable extends React.Component <IDateTime, {}> {
	public render() {
		return (
			<div>
			  	<form className="book-table-form">
                    <label htmlFor="name">Namn</label>
                    <input type="text" id="name"/>
                    <label htmlFor="email">Mailadress</label>
                    <input type="email" id="email"/>
                    <label htmlFor="phone">Telefonnummer</label>
                    <input type="text" id="phone"/>
                    <label htmlFor="guests">Hur många ska äta?</label>
                    <input type="number" id="guests" min="1" max="6"/>
                </form>
			</div>
		);
	}
}

export default BookTable;