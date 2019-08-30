import React from 'react';
import './Search.css';

class Search extends React.Component {
	public render() {
		return (
			<div>
                <form className="search-date-form">
                <label htmlFor="date">Vilken dag vill ni boka?</label>
                <input type="date" id="date" min="2019-08-29"/> 
                <p>Vilken tid vill ni äta?</p>
                <div className="checkbox-container">
                    <div className="checkbox-left">
                        <input type="radio" value="18" id="time18" name="timeSearch" defaultChecked/>
                        <label htmlFor="time18">18</label>
                    </div>
                    <div className="checkbox-right">
                        <input type="radio" value="21" id="time21" name="timeSearch"/>
                        <label htmlFor="time21">21</label>
                    </div>
                </div>
                
                <button className="button">Sök bord</button>
			</form>
			</div>
		);
	}
}

export default Search;