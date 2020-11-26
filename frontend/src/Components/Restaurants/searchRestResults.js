import React, { Component } from 'react';
import '../../App.css';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout} from '../../_actions';
import Navbar from '../Navbar/navbar';

import { RestaurantListingsProvider, RestaurantListingsConsumer} from '../../_context/restaurantListingsProvider';
import Restaurant from './restaurantcard';
import MapSection from '../Map/map';
import RestFilter from '../Filter/restaurantfilter';



class SearchRestResults extends Component {

  render() {

    let redirectVar = null;
    /*
    let id = '';
    let type = '';

    if(this.props.isLogged === false) {
      //customer login
      redirectVar = <Redirect to="/login"/>
    } else {
      if(this.props.whoIsLogged === false) {
        //customer login
        id = this.props.cid
        type = 'customers'
      } else{
        id = this.props.rid
        type = 'restaurants'
      }
    }


    <div className="map">
      <div className="google-map">
        <MapSection location={restaurantPins} zoomLevel={17} />
      </div>
    </div>

    */

    //Accessing props from Navbar as this.props.location.state.xxx
    console.log("Passed props", this.props)

    return (

      <div>
        <section class="container">
          <RestaurantListingsProvider searchBy = {this.props.searchBy} 
                            searchTxt = {this.props.searchTxt}
                            searchAddress = {this.props.searchAddress}
                            searchLat = {this.props.searchLat}
                            searchLng = {this.props.searchLng}
                            cuisineType = {this.props.cuisineType}
                            deliveryType = {this.props.deliveryType}>
            <RestaurantListingsConsumer>
              
                {function(value) {
                  const { restaurantListings, updateFilter } = value
                  console.log("listings: ", restaurantListings);
                  
                  let locations = [];
                  restaurantListings.forEach(item => {
                    console.log("Restaurant context provider item: ", item.rlatitude, item.rlongitude)
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
                  
                  return (
                    <div>
                      <div class="left-half">
                      <RestFilter updateFilter={updateFilter}/>
                        <ul>
                          {restaurantListings.map(listing => (
                            <div>
                              <Restaurant restaurant = {listing} />
                            </div>
                          ))}
                        </ul>
                      </div>
                      <div class="right-half">
                        <div className="map">
                          <div className="google-map">
                            <MapSection location={pins} zoomLevel={17} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }}
            </RestaurantListingsConsumer>
          </RestaurantListingsProvider >
        </section>
      </div>

      



    )

  }
}

const mapStateToProps = (state) => {
    return {
      cid: state.custProfile.cid,
      rid: state.restProfile.rid,
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,
    }
}

//const mapDispatchToProps = (dispatch) => { since this does not call a function directly it cannot be a function

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
    login: () => dispatch(login()),
    logout: () => dispatch(logout())
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchRestResults);
