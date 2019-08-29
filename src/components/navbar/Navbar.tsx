import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {
	public render() {
		return (
			<div>
			  	<nav>
					<span>Home</span> |
					<span>Book</span> |
					<span>Contact</span> |
			 	</nav>
			</div>
		);
	}
}

export default Navbar;
