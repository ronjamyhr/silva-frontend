import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
	public render() {
		return (
			<React.Fragment>
				<nav className="navbar">
					<div className="medium-logo">
						<img className="medium-logo" src={require("./../../images/mediumLogo.png")} alt="Logotype of the restaurant"
							title="Silva logo" />
					</div>
					<ul className="navigation">
						<li><Link className="links" to="/">Hem</Link></li>
						<li><Link className="links" to="/booking">Boka bord</Link></li>
						<li><Link className="links" to="/contact">Kontakt</Link></li>
					</ul>
				</nav>
			</React.Fragment>
		);
	}
}

export default Navbar;
