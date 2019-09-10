import React from 'react';
import './Book-table.css';
import axios from 'axios';
import urlPath from '../../../config-url';

interface IDateTime {
	dateTime: IDateTimes;
}

export interface IDateTimes {
	date: string;
	time: number;
}

interface IFormData {
    name: string;
    email: string;
    phone_number: string;
    number_of_guests: number;
    date: string;
    time: number;
}

class BookTable extends React.Component <IDateTime, IFormData> {

    constructor(props: IDateTime) {
        super(props)

        this.state = {
            name: '',
            email: '',
            phone_number: '',
            number_of_guests: 1,
            date: this.props.dateTime.date,
            time: this.props.dateTime.time
        }

        this.submitFormInputs = this.submitFormInputs.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: any) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const key = event.target.name;
            
        this.setState({
            [key]: key === 'number_of_guests' ? parseInt(value) : value,
            date: this.props.dateTime.date,
            time: this.props.dateTime.time
        } as any);

      }

    submitFormInputs(event: any) {
        event.preventDefault();


        const customer = {
            name: this.state.name,
            email: this.state.email,
            phone_number: this.state.phone_number,
            number_of_guests: this.state.number_of_guests,
            time: this.props.dateTime.time,
            date: this.props.dateTime.date
        };
        console.log(customer);
        console.log(customer.number_of_guests);
        console.log(customer.name);

        axios.post(`http://${urlPath}/booking/register-customer-book-table.php`, customer)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);

        })

    }

	public render() {
        console.log('props', this.props.dateTime.date);
        console.log('state', this.state.date);
        console.log('interface', this.props.dateTime.time);
		return (
			<div className="form-container">
			  	<form onSubmit={this.submitFormInputs} className="book-table-form">
                    <label htmlFor="name">Namn</label>
                    <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange}/>
                    <label htmlFor="email">Mailadress</label>
                    <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInputChange}/>
                    <label htmlFor="phone">Telefonnummer</label>
                    <input type="text" name="phone_number" id="phone" value={this.state.phone_number} onChange={this.handleInputChange}/>
                    <label htmlFor="guests">Hur många ska äta?</label>
                    <input type="number" name="number_of_guests" id="guests" min="1" max="6" value={this.state.number_of_guests} onChange={this.handleInputChange}/>
                    <button type="submit">Boka bord</button>
                </form>
			</div>
		);
	}
}

export default BookTable;