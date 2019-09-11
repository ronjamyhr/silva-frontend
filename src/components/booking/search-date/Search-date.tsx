import React from 'react';
import './Search-date.css';
import { IBooking } from '../Booking';
import moment from "moment";
import Calendar from 'react-calendar';

export interface IMapBookings {
    bookings: IBooking[];
    timeSelected(date: string, thetime: number): void;
}

interface IState {
    date: Date;
    firstSitting: any;
    secondSitting: any;
    // dateList: any;
    clicked: boolean;
    currentDate: Date;
}

class SearchDate extends React.Component<IMapBookings, IState> {

    constructor(props: IMapBookings) {
        super(props);

        this.state = {
            date: new Date(),
            firstSitting: [],
            secondSitting: [],
            // dateList: [],
            clicked: false,
            currentDate: new Date(Date.now())
        }

        this.updateDate = this.updateDate.bind(this);
        this.isAvailable = this.isAvailable.bind(this);
        this.sendDateAndTime = this.sendDateAndTime.bind(this);
    }

    updateDate = (e: any) => {

        this.setState({ date: e }, this.isAvailable);
        this.setState({ clicked: true });

        // console.log('hej ', e);
    }

    isAvailable = () => {

        // const dateList: number[] = [];
        const dateList = [];
        const firstSittingTime = [];
        const secondSittingTime = [];

        for (let i = 0; i < this.props.bookings.length; i++) {

            const element = this.props.bookings[i];

            if (element.booking_date === moment(this.state.date).format("YYYY-MM-DD")) {

                dateList.push(element.sitting_time);
                // this.setState({ dateList: element.sitting_time });
                // console.log("hejsan" ,typeof element.sitting_time)
            }
        }

        for (let i = 0; i < dateList.length; i++) {

            // var hej = dateList[i];
            // console.log('date list is number?: ', isNaN(dateList[i]));
            // console.log('date list: ', parseInt(dateList[i]));

            // console.log(dateList);
            // console.log('vilken typ är dateList[i]? ',typeof dateList[i]);
            // console.log(typeof '18');

            if (dateList[i] === "18") {
                firstSittingTime.push(dateList[i]);
                // console.log('KORVAR');
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

    sendDateAndTime = (e: React.ChangeEvent<HTMLInputElement>) => {

        this.props.timeSelected(moment(this.state.date).format("YYYY-MM-DD"), parseInt(e.target.value));
    }

    public render() {

        // console.log('hej 2 ', this.state.date);

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


