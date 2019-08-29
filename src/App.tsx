import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';

class App extends React.Component {
	public render() {
		return (
		  <div className="App">
			  <Navbar />
			  <Home />
			  <Footer />
		  </div>
		);
	  }
}

export default App;
