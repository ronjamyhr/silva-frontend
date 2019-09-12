import React from 'react';
import './Search-date.css';
import moment from "moment";
import Calendar from 'react-calendar';
import { IBooking } from '../../../interfaces/IBookings';

interface IPropsSearch {
    bookings: IBooking[];
    timeSelected(date: string, thetime: number): void;
}

interface IStateSearch {
    date: Date;
    firstSitting: any;
    secondSitting: any;
    clicked: boolean;
    currentDate: Date;
}

class SearchDate extends React.Component<IPropsSearch, IStateSearch> {

    constructor(props: IPropsSearch) {
        super(props);

        this.state = {
            date: new Date(),
            firstSitting: [],
            secondSitting: [],
            clicked: false,
            currentDate: new Date(Date.now())
        }

        this.updateDate = this.updateDate.bind(this);
        this.isAvailable = this.isAvailable.bind(this);
        this.sendDateAndTime = this.sendDateAndTime.bind(this);
    }

    // set choosen date in calendar as state
    updateDate = (e: any) => {

        this.setState({ date: e }, this.isAvailable);
        this.setState({ clicked: true });
    }

    // check if there are any bookings in db, check sitting time and set sitting times in state
    isAvailable = () => {

        const dateList = [];
        const firstSittingTime = [];
        const secondSittingTime = [];

        for (let i = 0; i < this.props.bookings.length; i++) {
            const element = this.props.bookings[i];

            if (element.booking_date === moment(this.state.date).format("YYYY-MM-DD")) {
                dateList.push(element.sitting_time);
            }
        }

        for (let i = 0; i < dateList.length; i++) {

            if (dateList[i] === "18") {
                firstSittingTime.push(dateList[i]);
            }
            if (dateList[i] === "21") {
                secondSittingTime.push(dateList[i]);
            }
        }

        this.setState({
            firstSitting: firstSittingTime,
            secondSitting: secondSittingTime
        });
    }

    // send choosen date and time with props to parent component
    sendDateAndTime = (e: React.ChangeEvent<HTMLInputElement>) => {

        this.props.timeSelected(moment(this.state.date).format("YYYY-MM-DD"), parseInt(e.target.value));
    }

    public render() {

        if (!this.state.clicked) {
            return <div className="container-search">
                <h2 className="heading-date">Vilken dag vill ni boka?</h2>
                <div className="calendar">
                    <Calendar onChange={this.updateDate} value={this.state.date} minDate={this.state.currentDate} />
                </div>
            </div>
        }

        return (
            <React.Fragment>
                <div className="container-search">
                    <h2 className="heading-date">Vilken dag vill ni boka?</h2>
                    <div className="calendar">
                        <Calendar onChange={this.updateDate} value={this.state.date} minDate={this.state.currentDate} />
                    </div>

                    <h2 className="heading-time">Välj tid:</h2>
                    <div className="checkbox-container">
                        {this.state.firstSitting.length < 15 || this.state.firstSitting.length === null ? (
                            <div className="checkbox-left">
                                <label htmlFor="time18" className="checkbox-label">
                                    <input onChange={this.sendDateAndTime} type="checkbox" id="time18" value="18" />
                                    <span>18</span>
                                </label>
                            </div>
                        ) : (
                                null
                            )}

                        {this.state.secondSitting.length < 15 || this.state.secondSitting.length === null ? (
                            <div className="checkbox-right">
                                <label htmlFor="time21" className="checkbox-label">
                                    <input onChange={this.sendDateAndTime} type="checkbox" id="time21" value="21" />
                                    <span>21</span>
                                </label>
                            </div>
                        ) : (
                                null
                            )}

                        {this.state.firstSitting.length >= 15 && this.state.secondSitting.length >= 15 ? (
                            <p>Alla tider är tyvärr fullbokade, välj ett annat datum</p>
                        ) : (
                                null
                            )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SearchDate;


