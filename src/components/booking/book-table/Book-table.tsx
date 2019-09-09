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
			  	Book table komponenten
			</div>
		);
	}
}

export default BookTable;