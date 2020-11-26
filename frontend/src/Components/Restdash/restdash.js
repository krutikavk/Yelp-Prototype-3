import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from '../Navbar/navbar';


class Restdash extends Component {
	
	render() {
		return (

      <div>
        <Navbar/>
  			<h2> Restaurant Dashboard</h2>
      </div>

		)
	}
}

export default Restdash;