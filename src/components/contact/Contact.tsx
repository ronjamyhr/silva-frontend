import React from 'react';
import './Contact.css';


class Contact extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <header className="header-contact">
                    <h1>Kontakt</h1>
                </header>
                <main className="contact-container">
                    <h2>Adress</h2>
                    <p>Stockholmsgatan 984, Stockholm</p>
                    <h2>Kontakt</h2>
                    <p>+46 123 456, silva@mail.se</p>
                    <h2>Öppettider</h2>
                    <p>mån-ons 17.00-23.00</p>
                    <p>tor-lör 18.00-24.00</p>
                    <p>sön 17.00-22.00</p>
                    <p>Avvikelser kan förekomma</p>
                    <h2>Följ oss</h2>
                    <a href="https://facebook.com"><i className="facebook-icon fab fa-facebook-square"
                        aria-label="Facebook icon"></i></a>
                    <a href="https://instagram.com"><i className="instagram-icon fab fa-instagram"
                        aria-label="Instagram icon"></i></a>
                    <h2>KARTA</h2>
                    <p>HÄR SKA EN KARTA LÄGGAS</p>
                </main>
            </React.Fragment>
        );
    }
}

export default Contact;
