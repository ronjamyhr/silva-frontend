import React from 'react';
import './Search-date.css';

class SearchDate extends React.Component {
	public render() {
		return (
			<form className="search-date-form">
                <label htmlFor="date">Vilken dag vill ni boka?</label>
                <input type="date" id="date" min="2019-08-29"/> 
                <h3>Vilken tid vill ni äta?</h3>
                <div className="checkbox-container">
                    <div className="checkbox-left">
                        <label htmlFor="time18" className="checkbox-label">
                            <input type="checkbox" id="time18" value="18"/>
                            <span>18</span>
                        </label>
                       
                    </div>
                    <div className="checkbox-right">
                        <label htmlFor="time21" className="checkbox-label">
                            <input type="checkbox" id="time21" value="time21"/>
                            <span>21</span>
                        </label>
                       
                    </div>
                </div>
                
                <button className="button">Sök bord</button>
			</form>
		);
	}
}

export default SearchDate;