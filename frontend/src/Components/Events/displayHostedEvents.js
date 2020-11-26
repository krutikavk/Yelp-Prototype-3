import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from '../Navbar/navbar';
import pumpkin from './mediterranean.jpg';
import Event from './eventcard';



class DisplayRegistered extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: []
    }
  }

  componentDidMount() {
    console.log("Mounted registered events")
    axios.defaults.withCredentials = true;


    let url = 'http://localhost:3001/events/restaurants/' + this.props.rid
    console.log("url:", url);
    axios.get(url)
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
          console.log("customer IDs", response.data);
          let hosted = JSON.parse(JSON.stringify(response.data))
          this.setState({
            events: [...hosted]
          })

          console.log("response.data", response.data)
          console.log("events state", this.state.events)
  
        }
      }).catch(err =>{
        alert("Incorrect credentials")
    });
  }

  render() {

    return (
      <div>
        <Navbar/>
        { this.state.events.map (entry => (
               <Event event={entry} />
          ))}
      </div>


    )
  }


}


const mapStateToProps = (state) => {
    return {

      //Get global state to get cid, rid and login details to fetch dishes for customer/restaurant

      rid: state.restProfile.rid,
    }
}


export default connect(mapStateToProps)(DisplayRegistered);