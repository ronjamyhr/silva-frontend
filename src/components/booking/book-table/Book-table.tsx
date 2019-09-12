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
    // invalidInput: string,
    // validInput: string,
    // validated: string;
    isValid: boolean
    invalidForm: string;
    isEnabled: boolean;
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
            // invalidInput: 'invalid',
            // validInput: 'valid',
            // validated: '',
            isValid: false,
            isEnabled: false,
            invalidForm: '',
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

        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    handleInputChange(event: any) {
        event.preventDefault();
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name;
            
        this.setState({
            [name]: name === 'number_of_guests' ? parseInt(value) : value
        } as any);

        // this.validateForm();

    }

    handleOnBlur(event: any) {
        event.preventDefault();
        const { name, value } = event.target;

        this.setState({
            touched: { ...this.state.touched, [name]: true }
        })

        let emailRegEx = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
        let specialCharactersRegEx = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:/;
        let phoneNumberRegEx = /^[0-9]*$/;

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
                phoneNumberInput = 'Telefonnumret måste innehålla minst 8 siffor.';
            } else if (!phoneNumberRegEx.test(value)) {
                phoneNumberInput = 'Telefonnumret får bara innehålla siffror.';
            } 
            console.log('phone', phoneNumberInput);
        }

        if (!nameInput || !emailInput || !phoneNumberInput) {
            this.setState({
                isValid: true
            } as any)
        }
        console.log('onblur isvalud', this.state.isValid);
        this.setState({
            nameInputError: nameInput,
            emailInputError: emailInput,
            phoneNumberInputError: phoneNumberInput
        } as any)


    }

    validateForm() {
        const name = this.state.nameInputError;
        const email = this.state.emailInputError;
        const phone = this.state.phoneNumberInputError;
        console.log('consts og stringd', name, email, phone);

        if (!name || !email || !phone) {
            this.setState({
                isEnabled: false
            } as any)
            console.log('validateform false', this.state.isEnabled);
            return false;
        } else {
            this.setState({
                isEnabled: true
            } as any)
            console.log('validateform true', this.state.isEnabled);
            return true;
        }

    }

    submitFormInputs(event: any) {
        event.preventDefault();

        if (!this.state.isValid) {
            this.setState({
                invalidForm: 'Formuläret är inte korrekt ifyllt'
            })
        }

        // this.setState({
        //     nameInputError: '',
        //     emailInputError: '',
        //     phoneNumberInputError: ''
        // } as any)

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
        // const {isDisabled} = this.state;
        // const isEnabled = this.validateForm();
        let isEnabled = this.state.isValid;
        console.log('correct', isEnabled);
		return (
			<div className="form-container">
			  	<form onSubmit={this.submitFormInputs} className="book-table-form">
                    <div className="input-box"> 
                        <label htmlFor="name">Namn</label>
                        <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange} onBlur={this.handleOnBlur} className="customer-input"/>
                        <span className="error-message">{this.state.nameInputError}</span>
                    </div>

                    <div className="input-box"> 
                        <label htmlFor="email">Mailadress</label>
                        <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleInputChange} onBlur={this.handleOnBlur} className="customer-input"/>
                        <span className="error-message">{this.state.emailInputError}</span>
                    </div>

                    <div className="input-box">
                        <label htmlFor="phone">Telefonnummer</label>
                        <input type="text" name="phone_number" id="phone" value={this.state.phone_number} onChange={this.handleInputChange} onBlur={this.handleOnBlur} className="customer-input"/>
                        <span className="error-message">{this.state.phoneNumberInputError}</span>
                    </div>

                    <label htmlFor="guests">Hur många ska äta?</label>
                    <input type="number" name="number_of_guests" id="guests" min="1" max="6" value={this.state.number_of_guests} onChange={this.handleInputChange} onBlur={this.handleOnBlur} className="customer-input"/>

                    <p className="gdpr">Genom att skicka in formuläret så accepterar du <a href="#" className="gdpr-link">våra villkor kring GDPR.</a></p>
                    <button type="submit" className="customer-submit">Boka bord</button>
                    <span className="error-message">{this.state.invalidForm}</span>
                </form>
			</div>
		);
	}
}

export default BookTable;