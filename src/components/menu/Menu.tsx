import React from 'react';
import './Menu.css';

class Menu extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    public render() {
        return (
            <React.Fragment>
                <header className="header-menu">
                    <h1 className="heading-menu">Meny</h1>
                </header>
                <main className="menu-container">
                    <h2 className="small-header-menu">Avsmakningsmeny</h2>
                    <article className="menu-text">
                        <p>
                            Vår meny består av tre olika avsmakningsmenyer som varieras efter de fyra årstiderna.
                        </p>
                        <p>
                            Ny årstid, nya råvaror är vår filosofi som vi arbetar noga med utan att tumma på smak, upplevelse eller inverkan på miljön.
                            Vi tänker på vad naturen har att erbjuda för tillfället när vi sätter våra menyer och det gör hela upplevelsen mer unik.
                        </p>
                        <p>
                            Menyn består av sju rätter som är signerad vår köksmästare Pelle Jasminkji.
                            Det går att välja på tre olika menyer kött, fisk eller vegetarisk.
                            Till våra avsmakningsmenyer har vi också noga utvalt dryckespaket.
                        </p>
                        <p>
                            Meny från 1599kr | dryckespaket från 989kr
                        </p>
                    </article>
                    <article className="menu-chef">
                        <div className="frame-image">
                            <img className="image" src={require("./../../images/pelle.jpg")} alt="Chef"
                                title="Chef Pelle" />
                        </div>
                        <div className="chef-name">
                            <p>Pelle Jasminkji - kökschef</p>
                        </div>
                    </article>
                </main>
            </React.Fragment>
        );
    }
}

export default Menu;
