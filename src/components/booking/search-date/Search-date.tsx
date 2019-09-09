import React from 'react';
import './Search-date.css';
import { IBooking } from '../Booking';
import moment from "moment";

const dateOfToday  = moment().format('YYYY-MM-DD');

interface IMapBookings {
    bookings: IBooking[];
    timeSelected(date:string, thetime: number): void;
}

interface IState {
    date: string;
    firstSitting: any;
    secondSitting: any;
    dateList: any;
    clicked: boolean;
}

class SearchDate extends React.Component<IMapBookings, IState> {

    constructor(props: IMapBookings) {
        super(props);

        this.state = {
            date: '',
            firstSitting: [],
            secondSitting: [],
            dateList: [],
            clicked: false
        }

        this.updateDate = this.updateDate.bind(this);
        this.isAvailable = this.isAvailable.bind(this);
        this.updateTime = this.updateTime.bind(this);
    }

    updateDate = (e: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ date: e.target.value }, this.isAvailable);
        this.setState({ clicked: true });
    }

    isAvailable = () => {

        const dateList: number[] = [];
        const firstSittingTime = [];
        const secondSittingTime = [];

        for (let i = 0; i < this.props.bookings.length; i++) {

            const element = this.props.bookings[i];

            if (element.booking_date === this.state.date) {

                dateList.push(element.sitting_time);
                this.setState({ dateList: element.sitting_time });
            }
        }

        for (let i = 0; i < dateList.length; i++) {
            if (dateList[i] == 18) {
                firstSittingTime.push(dateList[i]);
            }

            if (dateList[i] == 21) {
                secondSittingTime.push(dateList[i]);
            }
        }

        this.setState({ 
            firstSitting: firstSittingTime,
            secondSitting: secondSittingTime 
        });
    }

    updateTime = (e: React.ChangeEvent<HTMLInputElement>) => {

        this.props.timeSelected(this.state.date, parseInt(e.target.value));
    }

    public render() {

        if (!this.state.clicked) {
            return <div className="container-search">
                <label htmlFor="date">Vilken dag vill ni boka?</label>
                <input onChange={this.updateDate} type="date" id="date" min={dateOfToday} />
            </div>
        }

        return (
            <div className="container-search">

                <label htmlFor="date">Vilken dag vill ni boka?</label>
                <input onChange={this.updateDate} type="date" id="date" min={dateOfToday} />

                {this.state.firstSitting.length < 15 || this.state.firstSitting.length === null ? (
                    <div className="checkbox-left">
                        <label htmlFor="time18" className="checkbox-label">
                            <input onChange={this.updateTime} type="checkbox" id="time18" value="18" />
                            <span>18</span>
                        </label>
                    </div>
                ) : (
                        null
                    )}

                {this.state.secondSitting.length < 15 || this.state.secondSitting.length === null ? (
                    <div className="checkbox-right">
                        <label htmlFor="time21" className="checkbox-label">
                            <input onChange={this.updateTime} type="checkbox" id="time21" value="21" />
                            <span>21</span>
                        </label>
                    </div>
                ) : (
                        null
                    )}

                    {this.state.firstSitting.length >= 15 && this.state.secondSitting.length >= 15 ? (
                        <p>Alla tider är tyvärr fullbokade, välj ett annat datum!</p>
                    ) : ( 
                        null
                    )}

            </div>
        );
    }
}

export default SearchDate;


