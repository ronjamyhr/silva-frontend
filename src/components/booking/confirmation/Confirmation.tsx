import React from 'react';
import './Confirmation.css';

class Confirmation extends React.Component {
	public render() {
		return (
			<React.Fragment>
				<h1 className="confirm-heading">Bokningsbekräftelse</h1>
				<div className="confirm-container">
					<h2>Tack **** för din bokning!</h2>
					<p>Du har nu bokat bord hos oss den **** kl: ****</p>
					<p>Ert bokningsnummer är ****</p>
					<p>Vi på Silva önskar er varmt välkomna!</p>
					<p>Avbokning sker via mejl eller telefon</p>
					<p>(MEJL) och (TELE)</p>
				</div>
			</React.Fragment>
		);
	}
}

export default Confirmation;