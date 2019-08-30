import React from 'react';
import './Search.css';


interface IMapBookings {
    mapBookings(date: string, time: Number): any;
}

class Search extends React.Component<IMapBookings> {

    constructor(props: IMapBookings) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.updateTime = this.updateTime.bind(this);
    }

    state = {
        date: '',
        time: 18
      };

    handleSubmit(e: any) {
        e.preventDefault();
        this.props.mapBookings(this.state.date, this.state.time)
    }

    updateDate(e: any) {
        this.setState({date: e.target.value});
    }
    updateTime(e: any) {
        this.setState({time: e.target.value});
    }

	public render() {
		return (
			<div>
                <form className="search-date-form" onSubmit={this.handleSubmit}>
                <label htmlFor="date">Vilken dag vill ni boka?</label>
                <input type="date" id="date" min="2019-08-29" onChange={this.updateDate}/> 
                <p>Vilken tid vill ni äta?</p>
                <div className="checkbox-container">
                    <div className="checkbox-left">
                        <input type="radio" value="18" id="time18" name="timeSearch" onChange={this.updateTime}
                            defaultChecked/>
                        <label htmlFor="time18">18</label>
                    </div>
                    <div className="checkbox-right">
                        <input type="radio" value="21" id="time21" name="timeSearch" onChange={this.updateTime}/>
                        <label htmlFor="time21">21</label>
                    </div>
                </div>
                
                <button className="button" type="submit">Sök bord</button>
			</form>
			</div>
		);
	}
}

export default Search;