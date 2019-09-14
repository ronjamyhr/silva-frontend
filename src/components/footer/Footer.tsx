import React from 'react';
import './Footer.css';

class Footer extends React.Component {
	public render() {
		return (
			<footer className="footer">

				<div className="top-footer">
					<div>
						<a href="https://facebook.com"><i className="facebook-icon-footer fab fa-facebook-square"
							aria-label="Facebook icon"></i></a>
						<a href="https://instagram.com"><i className="instagram-icon-footer fab fa-instagram"
							aria-label="Instagram icon"></i></a>
					</div>
				</div>

				<div className="bottom-footer">
					<p>Stockholmsgatan 984, Stockholm</p>
					<p>+46 123 456, silva@mail.se</p>
				</div>

			</footer>
		);
	}
}

export default Footer;
