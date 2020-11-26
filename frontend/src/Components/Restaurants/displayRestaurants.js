import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, restaurantLogin} from '../../_actions';
import Restaurant from './restaurantcard';
/*
import GoogleMapReact from 'google-map-react';
import '../Map/map.css';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';

*/

import MapSection from '../Map/map'
import Navbar from '../Navbar/navbar';

 
/*
const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" color="#ff6347" width="40" height="40" />
    <p className="pin-text" style={{color:"#ff6347"}}>{text}</p>
  </div>
)
*/

class Restaurants extends Component {

  constructor(props) {
    super(props);

    this.state = {
      restaurants: []
    }

    this.menuHandler = this.menuHandler.bind(this);
  }

  //Menu handler for view dishes has to be here and not on restaurant page (only the render component is returned there)
  menuHandler = (event) => {
    alert("menu handler")
    this.setState ({
      dishes: true
    });
  }

  componentDidMount() {
    //replace this URL with search URL 
    let url = 'http://localhost:3001/restaurants';
    axios.get(url)
        .then(response => {
          console.log("Status Code : ",response.data);
          if(response.status === 200){
            //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
            //use JSON.parse(JSON.stringify()) to convert back to JSON object
            let temp = JSON.parse(JSON.stringify(response.data));
            this.setState({
                restaurants: [...temp]
            })
          }
        }).catch(err =>{
            console.log("No response")
        });
  }

  render() {

    let locations = [];
    this.state.restaurants.forEach(item => {
      console.log(item)
      let location = {
        name: item.rname,
        lat: item.rlatitude,
        lng: item.rlongitude
      }
      locations.push(location)
    });

    let pins = {
      restaurants: locations
    }

    console.log("locations:", locations)
    console.log("displayrestaurants pins", pins)

    return(

      /*

      




      <div>
        <Navbar/>
        <section class="container">
          <div class="left-half">
            {this.state.restaurants.map (restaurant => (
              <div>
                <Restaurant restaurant = {restaurant} />
              </div>
            ))}
          </div>

          <div class="right-half">
            <div className="map">
              <div className="google-map">
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyCXEQ_Jm1T3Ha7dpvHBYbqMXnNaQmCbKn8' }}
                  center={locations[0]}
                  defaultZoom={17}
                >

                {this.state.restaurants.map (location => {  
                  return (       
                    <LocationPin
                      lat={location.rlatitude}
                      lng={location.rlongitude}
                      text={location.rname}
                    />
                  )}
                )}

                </GoogleMapReact>
              </div>
            </div>
          </div>
        </section>
      </div>

      */

      <div>
        <Navbar/>
        <section class="container">
          <div class="left-half">
            {this.state.restaurants.map (restaurant => (
              <div>
                <Restaurant restaurant = {restaurant} />
              </div>
            ))}
          </div>

          <div class="right-half">
            <div className="map">
              <div className="google-map">
                <MapSection location={pins} zoomLevel={17} />
              </div>
            </div>
          </div>
        </section>
      </div>


    )

  }

}


const mapStateToProps = (state) => {
    return {

      //Get global state to get cid, rid and login details to fetch dishes for customer/restaurant

      cid: state.custProfile.cid,
      rid: state.restProfile.rid,
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,

    }
}

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
  }
  
}


export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);