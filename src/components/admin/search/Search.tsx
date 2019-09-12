import React from 'react';
import './Search.css';


interface IMapBookings {
    getBookings(date: string, time: number): any;
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
        this.props.getBookings(this.state.date, this.state.time)
    }

    updateDate(e: any) {
        this.setState({ date: e.target.value });
    }
    updateTime(e: any) {
        this.setState({ time: parseInt(e.target.value) });
    }

    public render() {
        return (
            <div className="container-admin-search">
                <form className="admin-search-form" onSubmit={this.handleSubmit}>
                    <label className="label-bookings" htmlFor="date">Sök efter bokningar:</label>
                    <input type="date" id="date" min="2019-08-29" onChange={this.updateDate} />
                    <p className="label-search-time">Välj tid:</p>
                    <div className="admin-checkbox-container">
                        <div className="admin-checkbox-left">
                            <input type="radio" value="18" id="time18" name="timeSearch" onChange={this.updateTime}
                                defaultChecked />
                            <label htmlFor="time18">18</label>
                        </div>
                        <div className="admin-checkbox-right">
                            <input type="radio" value="21" id="time21" name="timeSearch" onChange={this.updateTime} />
                            <label htmlFor="time21">21</label>
                        </div>
                    </div>
                    <button className="admin-button" type="submit">Sök bokning</button>
                </form>
            </div>
        );
    }
}

export default Search;