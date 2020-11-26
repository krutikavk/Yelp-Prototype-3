import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, customerLogin} from '../../_actions';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import Navbar from '../Navbar/navbar';



class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ename: '',
      edescription: '',
      eaddress: '',
      elatitude: '',
      elongitude: '',
      edate: '',
      address: '',
      updated: 'false',
      added: false
    }

    this.enameChangeHandler = this.enameChangeHandler.bind(this);
    this.edescriptionChangeHandler = this.edescriptionChangeHandler.bind(this);
    this.edateChangeHandler = this.edateChangeHandler.bind(this);
    this.addEvent = this.addEvent.bind(this);

    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSelectAddress = this.handleSelectAddress.bind(this);
  }

  enameChangeHandler = (event) => {
    this.setState({
      ename: event.target.value
    })
  }

  edescriptionChangeHandler = (event) => {
    this.setState({
      edescription: event.target.value
    })
  }

  edateChangeHandler = (event) => {
    this.setState({
      edate: event.target.value
    })
  }

  handleAddressChange = (address) => {
    this.setState({
      eaddress: address
    })
  }

  handleSelectAddress = address => {
    this.setState({address : address});
    console.log(address);

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Location found: ', latLng)
        this.setState({
          elatitude: latLng.lat,
          elongitude: latLng.lng
        })

      })
      .catch(error => console.error('Error', error));
  }

  addEvent = (event) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;

    const data = {
      ename: this.state.ename,
      edescription: this.state.edescription,
      eaddress: this.state.eaddress,
      elatitude: this.state.elatitude,
      elongitude: this.state.elongitude,
      edate: this.state.edate,
      rid: this.props.rid,
      rname: this.props.rname
    }
    console.log("data sent to add event", data)
    let url = 'http://localhost:3001/events'

    axios.post(url, data)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
          this.setState({
            added: true
          })
          
        }
      }).catch(err =>{
          alert('Add event failed');
      });
  }



  render() {
    let redirectVar = null;

    if(!(this.props.isLogged === true && this.props.whoIsLogged === true)) {
      redirectVar = <Redirect to='/login'/>
    } else if(this.props.isLogged === true && this.props.whoIsLogged === true && this.state.added === true) {
      redirectVar = <Redirect to='/events'/>
    }
    return (

      <div>
        {redirectVar}
        <Navbar/>
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center" >

        <br/>
          <form>
            <div className="col d-flex justify-content-center rounded-0">
              <div className="card-header">
                <h4>Host an event</h4>
              </div>
            </div>

            <div className = "form-group text-left">
              <br/>
              <label htmlFor="exampleInputEmail1">Event Name</label>
              <input onChange = {this.enameChangeHandler} 
                                  type="text"  
                                  name="ename" 
                                  className="form-control form-control-sm"
                                  placeholder="Event Name"
                                  aria-describedby="emailHelp" 
                                  required/>
            </div>
            <div className = "form-group text-left">
              <br/>
              <label htmlFor="exampleInputEmail1">Description</label>
              <input onChange = {this.edescriptionChangeHandler} 
                                  type="text"  
                                  name="edescription" 
                                  className="form-control form-control-sm"
                                  placeholder="About the event"
                                  aria-describedby="emailHelp"
                                  rows="5"
                                  required/>
            </div>

            <div className = "form-group text-left">
              <br/>
              <label htmlFor="exampleInputEmail1">Address</label>
              <PlacesAutocomplete
                value={this.state.eaddress}
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

            <div className="form-group text-left">
              <br/>
              <label htmlFor="exampleInputPassword1">Schedule</label>
              <input onChange = {this.edateChangeHandler} 
                                  type="text" 
                                  name="edate" 
                                  className="form-control form-control-sm"
                                  placeholder="Schedule"
                                  required/>
                                  
            </div>

            <div className="col-md-12 text-center">
            <button id="btnLogin" className="btn btn-danger" onClick={this.addEvent}>Add</button>
            </div>
          </form>
        </div>
          
      </div>
    )
  }

}


//importedname: state.reducer.statenames
const mapStateToProps = (state) => {
    return {
      rid: state.restProfile.rid,
      rname: state.restProfile.rname,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);