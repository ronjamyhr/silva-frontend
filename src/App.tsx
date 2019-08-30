import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Contact from './components/contact/Contact'
import NotFound from './components/not-found/Not-found';
import Booking from './components/booking/Booking';
import Admin from './components/admin/Admin';

class App extends React.Component {

	public render() {
		return (
		    <div className="App">
				<Router>
					<Navbar />
					<Switch>
						<Route exact path="/" render={props => (
							<React.Fragment>
								<Home />
							</React.Fragment>
						)}></Route>
                        <Route path="/booking" component={Booking} />
						<Route path="/contact" component={Contact} />
						<Route path="/admin" component={Admin} />
						<Route component={ NotFound } />
					</Switch>
				</Router>
				<Footer />
		    </div>
		);
	  }
}

export default App;
