import React from 'react';
import './Not-found.css';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
	public render() {
		return (
			<React.Fragment>
				<div className="not-found-container">
					<div className="not-found-icon-container"><i className="fas fa-exclamation not-found-icon"></i></div>
					<div className="not-found-text-container">
						<p className="not-found-text">Sidan du letar efter kunde inte hittas!</p>
						<Link className="not-found-home-link" to="/">Gå till startsidan</Link>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default NotFound;