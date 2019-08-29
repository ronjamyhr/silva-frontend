import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
	public render() {
		return (
			<div>
			  	<nav>
					<Link to="/">Home</Link> |
					<Link to="/booking">Book</Link> |
					<Link to="/contact">Contact</Link> |
			 	</nav>
			</div>
		);
	}
}

export default Navbar;
