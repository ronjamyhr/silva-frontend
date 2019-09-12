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
    nameInputError: string,
    emailInputError: string,
    phoneNumberInputError: string,
    invalidInput: string,
    validInput: string,
    validated: string;
    isValid: boolean;
    touched: {
        name: boolean,
        email: boolean,
        phone_number: boolean,
        guests: boolean
    }
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
            invalidInput: 'invalid',
            validInput: 'valid',
            validated: '',
            isValid: false,
            touched: {
                name: false,
                email: false,
                phone_number: false,
                guests: false
            },
            hasErrors: {
                name: false,
                email: false,
                phone_number: false,
            }
        }

        this.submitFormInputs = this.submitFormInputs.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setClassName = this.setClassName.bind(this);
    }

    handleInputChange(event: any) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name;
            
        this.setState({
            [name]: name === 'number_of_guests' ? parseInt(value) : value
        } as any);

    }

    validateForm(event: any) {
        event.preventDefault();

        const { name, value } = event.target;
        let emailRegEx = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
        let specialCharactersRegEx = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:/;
        let phoneNumberRegEx = /^(\(?\+?[0-9]*\)?)?[0-9_\- ]/;

        this.setState({
            touched: { ...this.state.touched, [name]: true }
        })

        let nameInput = '';
        let emailInput = '';
        let phoneNumberInput = '';

        if (name === 'name') {
            if (value == '') {
                nameInput = 'Du måste ange ditt namn.';
            } else if (specialCharactersRegEx.test(value)) {
                nameInput = 'Namn får bara innehålla bokstäver och mellanslag.';
            } 
            console.log('name', nameInput);
        }
        
        if (name === 'email') {
            if (value == '') {
                emailInput = 'Du måste ange din e-post.';
            } else if (!emailRegEx.test(value)) {
                emailInput = 'E-posten är felaktig.';
            } 
            console.log('email', emailInput);
        }
        
        if (name === 'phone_number') {
            if (value.length < 8) {
                phoneNumberInput = 'Telefonnumret måste innehålla minst 8 siffor';
            } else if (phoneNumberRegEx.test(value)) {
                phoneNumberInput = 'Telefonnumret får bara innehålla siffror och mellanslag';
            } 
            console.log('phone', phoneNumberInput);
        }

        this.setState({
            nameInputError: nameInput,
            emailInputError: emailInput,
            phoneNumberInputError: phoneNumberInput
        } as any)

        if (nameInput || emailInput || phoneNumberInput) {
            this.setClassName();
            return false;
        } else {
            this.setState({
                isValid: true
            })
            this.setClassName();
            return true;
        }


    }
    // validInput() {
        
    // }

    setClassName() {
        if (this.state.isValid === false) {
            // this.setState({
            //     validated: 'invalid'
            // })
            return this.state.invalidInput;

        } else if (this.state.isValid === true) {
            // this.setState({
            //     validated: 'valid'
            // })
            return this.state.validInput;
        }
        // return this.state.validated;
    } 

    submitFormInputs(event: any) {
        event.preventDefault();

        // if(!this.validateForm()) {
        //     return;
        // }

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

        axios.post(`http://${urlPath}/booking/register-customer-book-table.php`, JSON.stringify(customer))
        .then(result => {
            console.log(result);
            console.log(result.data);
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
                    <div className="input-box"> 
                        <label htmlFor="name">Namn</label>
                        <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange} onBlur={this.validateForm} className="customer-input"/>
                        <span className="error-message">{this.state.nameInputError}</span>
                    </div>

                    <div className="input-box"> 
                        <label htmlFor="email">Mailadress</label>
                        <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInputChange} onBlur={this.validateForm} className="customer-input"/>
                        <span className="error-message">{this.state.emailInputError}</span>
                    </div>

                    <div className="input-box">
                        <label htmlFor="phone">Telefonnummer</label>
                        <input type="text" name="phone_number" id="phone" value={this.state.phone_number} onChange={this.handleInputChange} onBlur={this.validateForm} className="customer-input"/>
                        <span className="error-message">{this.state.phoneNumberInputError}</span>
                    </div>

                    <label htmlFor="guests">Hur många ska äta?</label>
                    <input type="number" name="number_of_guests" id="guests" min="1" max="6" value={this.state.number_of_guests} onChange={this.handleInputChange} onBlur={this.validateForm} className="customer-input"/>

                    <p className="gdpr">Genom att skicka in formuläret så accepterar du <a href="#" className="gdpr-link">våra villkor kring GDPR.</a></p>
                    <button type="submit" className="customer-submit">Boka bord</button>
                </form>
			</div>
		);
	}
}

export default BookTable;