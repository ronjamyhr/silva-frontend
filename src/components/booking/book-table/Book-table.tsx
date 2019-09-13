import React from 'react';
import './Book-table.css';
import axios from 'axios';
import urlPath from '../../../config-url';

interface IDateTime {
    dateTime: IDateTimes;
    customerInfo(name: string, date: string, time: number): void;
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
    nameInputError: string,
    emailInputError: string,
    phoneNumberInputError: string,
    isValid: boolean
    // invalidForm: string;
    // isEnabled: boolean;
    // touched: {
    //     name: boolean,
    //     email: boolean,
    //     phone_number: boolean,
    //     guests: boolean
    // }
    hasErrors: {
        name: boolean,
        email: boolean,
        phone_number: boolean
    }
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
            time: this.props.dateTime.time,
            nameInputError: '',
            emailInputError: '',
            phoneNumberInputError: '',
            // invalidInput: 'invalid',
            // validInput: 'valid',
            // validated: '',
            isValid: false,
            // isEnabled: false,
            // invalidForm: '',
            // touched: {
            //     name: false,
            //     email: false,
            //     phone_number: false,
            //     guests: false
            // },
            hasErrors: {
                name: false,
                email: false,
                phone_number: false,
            }
        }

        this.submitFormInputs = this.submitFormInputs.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    handleInputChange = (event: any) => {
        event.preventDefault();
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name;
            
        this.setState({
            [name]: name === 'number_of_guests' ? parseInt(value) : value
        } as any);

        console.log('guests', this.state.number_of_guests);

    }

    handleOnBlur = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;

        // this.setState({
        //     touched: { ...this.state.touched, [name]: true }
        // })
        // console.log('name after setsatet touched true', this.state.touched.name);

        let emailRegEx = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
        let specialCharactersRegEx = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:/;
        let phoneNumberRegEx = /^[0-9]*$/;

        let nameInput = this.state.nameInputError;
        let emailInput = this.state.emailInputError;
        let phoneNumberInput = this.state.phoneNumberInputError;

        let errors: any = this.state.hasErrors;

        console.log("Current state: ", this.state.hasErrors);  

        if (name === 'name') {
            errors.name = false;
            nameInput= '';
            if (value == '') {
                nameInput = 'Du måste ange ditt namn.';
                errors.name = true;
            } 
            if (specialCharactersRegEx.test(value)) {
                nameInput = 'Namn får bara innehålla bokstäver och mellanslag.';
                errors.name = true;
            }  
            console.log('name', nameInput);
        }
        
        if (name === 'email') {
            errors.email = false;
            emailInput = '';

            if (value == '') {
                emailInput = 'Du måste ange din e-post.';
                errors.email = true;
            }
            if (!emailRegEx.test(value)) {
                emailInput = 'E-posten är felaktig.';
                errors.email = true;
            } 
            console.log('email', emailInput);
        }
        
        if (name === 'phone_number') {
            errors.phone_number = false;
            phoneNumberInput = '';

            if (value.length < 8) {
                phoneNumberInput = 'Telefonnumret måste innehålla minst 8 siffor.';
                errors.phone_number = true;
            } 
            if (!phoneNumberRegEx.test(value)) {
                phoneNumberInput = 'Telefonnumret får bara innehålla siffror.';
                errors.phone_number = true;
            } 
            console.log('phone', phoneNumberInput);
        }

        let validForm = false;
        //check for input errors
        if (!this.state.hasErrors.email && !this.state.hasErrors.name && !this.state.hasErrors.phone_number) {
            validForm = true;
        }
        //check if any input field has an empty value
        if (this.state.name === '' || this.state.email === '' || this.state.phone_number === '') {
            validForm = false;
        }
        
        
        this.setState({
            nameInputError: nameInput,
            emailInputError: emailInput,
            phoneNumberInputError: phoneNumberInput,
            hasErrors: errors,
            isValid: validForm
        })

    }


    submitFormInputs = (event: any) => {
        event.preventDefault();

        console.log('guests', this.state.number_of_guests);


        const customer = {
            name: this.state.name,
            email: this.state.email,
            phone_number: this.state.phone_number,
            number_of_guests: this.state.number_of_guests,
            time: this.props.dateTime.time,
            date: this.props.dateTime.date
        };

        axios.post(`http://${urlPath}/api/booking/register-customer-book-table.php`, JSON.stringify(customer))
        .then(result => {
            console.log(result);
            console.log(result.data);
        })
        .catch(error => {
            console.log(error);
            
        })
        
        //send data to confirmation component
        this.props.customerInfo(this.state.name, this.state.date, this.state.time);

    }

    

	public render() {

        
        console.log('correct: ', this.state.isValid);
		return (
			<div className="form-container">
			  	<form onSubmit={this.submitFormInputs} className="book-table-form">
                    <div className="input-box"> 
                        <label htmlFor="name">Namn</label>
                        <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange} onBlur={this.handleOnBlur} className="customer-input"/>
                        <span className="error-message">{this.state.nameInputError}</span>
                    </div>

                    <div className="input-box"> 
                        <label htmlFor="email">E-post</label>
                        <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInputChange} onBlur={this.handleOnBlur} className="customer-input"/>
                        <span className="error-message">{this.state.emailInputError}</span>
                    </div>

                    <div className="input-box">
                        <label htmlFor="phone">Telefonnummer</label>
                        <input type="text" name="phone_number" id="phone" value={this.state.phone_number} onChange={this.handleInputChange} onBlur={this.handleOnBlur} className="customer-input"/>
                        <span className="error-message">{this.state.phoneNumberInputError}</span>
                    </div>

                    <label htmlFor="guests">Hur många ska äta?</label>
                    {/* <input type="number" name="number_of_guests" id="guests" min="1" max="6" value={this.state.number_of_guests} onChange={this.handleInputChange} onBlur={this.handleOnBlur} className="customer-input"/> */}
                    <select name="number_of_guests" id="guests" onChange={this.handleInputChange} value={this.state.number_of_guests} className="customer-input">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>

                    <p className="gdpr">Genom att skicka in formuläret så accepterar du <a href="#" className="gdpr-link">våra villkor kring GDPR.</a></p>
                    <button type="submit" className="customer-submit" disabled={!this.state.isValid}>Boka bord</button>
                </form>
			</div>
		);
	}
}

export default BookTable;