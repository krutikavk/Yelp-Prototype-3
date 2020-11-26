import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, customerLogin} from '../../_actions';
import Event from './eventcard';
import GoogleMapReact from 'google-map-react';
import '../Map/map.css';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';
import Navbar from '../Navbar/navbar';




const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" color="#ff6347" width="40" height="40" />
    <p className="pin-text" style={{color:"#ff6347"}}>{text}</p>
  </div>
)

class DisplayEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    //replace this URL with search URL 
    let url = 'http://localhost:3001/events';
    axios.get(url)
        .then(response => {
          console.log("Status Code : ",response.data);
          if(response.status === 200){
            //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
            //use JSON.parse(JSON.stringify()) to convert back to JSON object
            let temp = JSON.parse(JSON.stringify(response.data));
            this.setState({
                events: [...temp]
            })
          }
        }).catch(err =>{
            console.log("No response")
        });
  }



  render() {

    let locations = [];
    this.state.events.forEach(item => {
      console.log(item)
      let location = {
        address: item.raddress,
        lat: item.rlatitude,
        lng: item.rlongitude
      }
      locations.push(location)
    });

    console.log("locations:", locations)

    return (
      <div>
        <Navbar/>

        {this.state.events.map (event => (
              <div>
                <Event event={event} />
              </div>
        ))}
        
      </div>

    )

  }


}


const mapStateToProps = (state) => {
    return {
      rid: state.restProfile.rid,
      rname: state.restProfile.rname,
      rphone: state.restProfile.rphone,
      rabout: state.restProfile.rabout,
      rphoto: state.restProfile.rphoto,
      rlocation: state.restProfile.rlocation,
      rlatitude: state.restProfile.rlatitude,
      rlongitude: state.restProfile.rlongitude,
      raddress: state.restProfile.raddress,
      rcuisine:  state.restProfile.rcuisine,
      rdelivery: state.restProfile.rdelivery,
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,

    }
}

//const mapDispatchToProps = (dispatch) => { since this does not call a function directly it cannot be a function

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
    customerLogin: () => dispatch(customerLogin())
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEvents);