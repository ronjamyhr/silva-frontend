import React from 'react';
import './Search-date.css';

class SearchDate extends React.Component {
	public render() {
		return (
			<form className="search-date-form">
                <label htmlFor="date">Vilken dag vill ni boka?</label>
                <input type="date" id="date" min="2019-08-29"/> 
                <p>Vilken tid vill ni äta?</p>
                <div className="checkbox-container">
                    <div className="checkbox-left">
                        <input type="checkbox" value="18" id="time18"/>
                        <label htmlFor="time18">18</label>
                    </div>
                    <div className="checkbox-right">
                        <input type="checkbox" value="21" id="time21"/>
                        <label htmlFor="time21">21</label>
                    </div>
                </div>
                
                <button className="button">Sök bord</button>
			</form>
		);
	}
}

export default SearchDate;