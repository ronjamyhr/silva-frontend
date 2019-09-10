import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends React.Component {
	public render() {
		return (
			<React.Fragment>
				<header className="header-home">
					<img className="big-logo" src={require("./../../images/bigLogo.png")} alt="Logotype of the restaurant"
						title="Silva logo" />
				</header>
				<main className="home-container">
					<article className="about-us">
						<h1 className="about-us-header">Om oss</h1>
						<p className="about-us-text">Vi är den lilla restaurangen med inspiration från naturen. Vi tänker miljö och försöker förmedla det genom vår meny.
				Våran filosofi är att ta vara på och att använda oss av det som finns nära.</p>
					</article>
					<section className="image-quote-section">
						<div className="image-small-section">
							<img className="small-image" src={require("./../../images/pork.jpg")} alt="Pork dish"
								title="Pork" />
						</div>
						<div className="quote-section">
							<p className="quote-image">"Vi tar vara på de råvaror som finns nära"</p>
						</div>
					</section>
					<article className="about-menu">
						<h2 className="about-menu-header">Vår meny</h2>
						<p className="about-menu-text">Vår meny varieras efter årstid. De bästa råvarona efter säsong och såklart finns det något för alla. Vår avsmakningsmeny beståd av tio mindre rätter som köksmästaren satt ihop på ett helt fantastiskt sätt.</p>
						<Link className="menu-link" to="/booking">Se vår meny här</Link>
					</article>
					<section className="gallery-quote-section">
						<div className="gallery-section">
							<div className="gallery-item">
								<img className="gallery-image" src={require("./../../images/meat.jpg")} alt="Meat dish"
									title="Meat" />
							</div>
							<div className="gallery-item">
								<img className="gallery-image" src={require("./../../images/pasta.jpg")} alt="Pasta dish"
									title="Pasta" />
							</div>
							<div className="gallery-item">
								<img className="gallery-image" src={require("./../../images/plate.jpg")} alt="Plate"
									title="Plate" />
							</div>
							<div className="gallery-item">
								<img className="gallery-image" src={require("./../../images/fish.jpg")} alt="Fish dish"
									title="Fish" />
							</div>
						</div>
					</section>
					<article className="about-booking">
						<h2 className="about-booking-header">Boka bord</h2>
						<p className="about-booking-text">Bokning görs lättast från länken men det går också bra att ringa oss för bokning.</p>
						<Link className="booking-link" to="/booking">Boka ditt bord här</Link>
					</article>
					<section className="image-large-section">
						<img className="image-large" src={require("./../../images/restaurant.jpg")} alt="The restaurant"
							title="Restaurant" />
					</section>
				</main>
			</React.Fragment>
		);
	}
}

export default Home;
