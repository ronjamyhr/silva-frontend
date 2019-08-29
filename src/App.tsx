import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Contact from './components/contact/Contact'

class App extends React.Component {
	public render() {
		return (
		    <div className="App">
				<Router>
					<Navbar />
					<Route exact path="/" render={props => (
						<React.Fragment>
							<Home />
						</React.Fragment>
					)}></Route>
					<Route path="/contact" component={Contact}>

					</Route>
				</Router>
				<Footer />
		    </div>
		);
	  }
}

export default App;
