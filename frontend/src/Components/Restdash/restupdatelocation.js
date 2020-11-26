import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, restaurantLogin} from '../../_actions';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import Navbar from '../Navbar/navbar';


class Restupdatelocation extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: '',
      updated: 'false'
    };

    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSelectAddress = this.handleSelectAddress.bind(this);
  }

  handleAddressChange = (address) => {
    this.setState({
      address: address
    })
  }

  handleSelectAddress = address => {
    this.setState({address : address});
    console.log(address);

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Location found: ', latLng)

        //Update restaurant location


        let endpoint = 'http://localhost:3001/restaurants/' + this.props.rid;
        console.log('update restaurant endpoint: ', endpoint)

        const data = {
          remail: this.props.remail,
          rname: this.props.rname,
          rphone : this.props.rphone,
          rabout : this.props.rabout,
          rlocation: this.props.rlocation,
          rlatitude: latLng.lat,
          rlongitude : latLng.lng,
          raddress : this.state.address,
          rcuisine: this.props.rcuisine,
          rdelivery: this.props.rdelivery,
          rid: this.props.rid
        }

        /*
        remail: this.props.remail,
      rname: this.props.rname,
      rphone : this.state.rphone,
      rabout : this.state.rabout,
      rlocation: this.props.rlocation,
      rlatitude: this.props.rlatitude,
      rlongitude: this.props.rlongitude,
      raddress: this.props.raddress,
      rcuisine: this.state.rcuisine,
      rdelivery: this.state.rdelivery,
      rid: this.props.rid
      */

        axios.put(endpoint, data)
          .then(response => {
            console.log('Status Code : ', response.status);
            if(response.status === 200){
              console.log('Update completed')
              //call props action
              this.props.update('RLATITUDE',latLng.lat)
              this.props.update('RLONGITUDE',latLng.lng)
              this.props.update('RADDRESS', this.state.address)
              this.setState({
                updated: true,
              })
            }
          }).catch(err =>{
            alert("Update failed")
            this.setState({
                updated : false
            })
        });
      })
      .catch(error => console.error('Error', error));
  };





  render() {

    let redirectVar = null;
    //Nobody is logged in
    if(this.props.isLogged === false ) {
      redirectVar = <Redirect to= '/login'/>
    }
    //customer is logged in--redirect to customer dashboard
    else if(this.props.isLogged === true && this.props.whoIsLogged === false) {
      redirectVar = <Redirect to= '/customer/profile'/>
    }

    //Update successful--redirect to update2 page
    else if(this.props.isLogged === true && this.props.whoIsLogged === true && this.state.updated === true) {
      redirectVar = <Redirect to= '/restaurant'/>
    }

    return (


      <div>

        {redirectVar}
        <Navbar/>
        <div class="container-fluid style={{height: 100}}">
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card">
                <div class="card-horizontal shadow-sm p-3 mb-5 bg-white rounded">
                  <div class="form-group">
                    Enter location: 
                    <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleAddressChange}
                    onSelect={this.handleSelectAddress}
                    >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div>
                        <input
                          {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
    )
  }

}



const mapStateToProps = (state) => {
    return {
      //Restaurant props
      rid: state.restProfile.rid,
      remail: state.restProfile.remail,
      rpassword: state.restProfile.rpassword,
      rname: state.restProfile.rname,
      rphone: state.restProfile.rphone,
      rabout: state.restProfile.rabout,
      rlocation: state.restProfile.rlocation,
      rlatitude: state.restProfile.rlatitude,
      rlongitude: state.restProfile.rlongitude,
      raddress: state.restProfile.raddress,
      rcuisine: state.restProfile.rcuisine,
      rdelivery: state.restProfile.rdelivery,
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,
    }
}

//const mapDispatchToProps = (dispatch) => { since this does not call a function directly it cannot be a function

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
    restaurantLogin: () => dispatch(restaurantLogin())
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Restupdatelocation);