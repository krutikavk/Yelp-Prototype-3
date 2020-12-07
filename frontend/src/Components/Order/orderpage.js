import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';
import {connect} from 'react-redux';
import '../../App.css';
import Navbar from '../Navbar/navbar';


class Orderpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ostatus: '',
      otype: '',

      ostatusToChange: false,
      otypeToChange: false,

      ostatusStates: ['Order received', 'Preparing', 'Pickup ready','Picked up', 'On the way', 'Delivered'],
      otypeStates: ['New', 'Picked up', 'Delivered', 'Cancelled'],

      updated: false,

      dishes: []

    }
    this.submitChange = this.submitChange.bind(this);

    this.ostatusHandler = this.ostatusHandler.bind(this);
    this.otypeHandler = this.otypeHandler.bind(this);

    this.editStatusOrder = this.editStatusOrder.bind(this);
    this.editTypeOrder = this.editTypeOrder.bind(this);

  }

  //These handlers will render select fields for order/type
  editStatusOrder = (event) => {
    this.setState({
      ostatusToChange: true
    })
  }

  editTypeOrder = (event) => {
    this.setState({
      otypeToChange: true
    })
  }


  //Pick new value from select menu 
  ostatusHandler = (event) => {
    console.log("selected", event.target.value)

    this.setState({
      ostatus: event.target.value
    })

    //The setTimeout is to ensure that React has finished updating the local state 
    //before we update our provider (to ensure we do not get an old state)

  }


  //pick new value from select menu
  otypeHandler = (event) => {
    console.log("selected", event.target.value)

    this.setState({
      otype: event.target.value
    })
  }



  submitChange = (event) => {
    event.preventDefault();
    console.log("submit change hit")
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
    // let url = 'http://localhost:3001/orders/' + this.props.location.query.oid;
    let url = `${process.env.REACT_APP_BACKEND}/orders/${this.props.location.query.oid}`;
    let data = {
      ostatus: this.state.ostatus,
      otype: this.state.otype,
    }
    console.log('data: ', data);

    axios.put(url, data)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
          this.setState({
            updated: true,
            ostatusToChange: false,
            otypeToChange: false,
          })
        }
      }).catch(err =>{
        console.log("Update failed")
    });
  }

  render() {
    let redirectVar = null;
    let id = '';
    let type = '';
    let editStatusComponent = null;
    let editTypeComponent = null;
    let editStatus = null;

    let status = this.props.location.query.ostatus;

    if(this.state.updated === true) {
      status = this.state.ostatus;
    }

    if(this.props.isLogged === false) {
      //customer login
      redirectVar = <Redirect to="/login"/>
    } else if(this.props.isLogged === true && this.props.whoIsLogged === true) {
      editStatusComponent = <button id="btnLogin" className="btn btn-danger btn-sm" onClick={this.editStatusOrder}>Edit Status</button>
      editTypeComponent = <button id="btnLogin" className="btn btn-danger btn-sm" onClick={this.editTypeOrder}>Edit Type</button>
    }

    if (this.state.ostatusToChange === true) {
      editStatusComponent = (

        <div class="form-group">
          <label for="ooption">Filter by Order Status: </label>
          <select class="form-control" id="ooption" onChange = {this.ostatusHandler}>>
            <option value = {this.state.ostatus}> Choose...</option>
            {this.state.ostatusStates.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button class="btn btn-danger btn-sm" onClick = {this.submitChange}>Submit</button>
        </div>


      )
    }

    if (this.state.otypeToChange === true) {
      editTypeComponent = (

        <div class="form-group">
          <label for="ooption">Filter by Order Type: </label>
          <select class="form-control" id="ooption" onChange = {this.otypeHandler}>>
            <option value = {this.state.otype}> Choose...</option>
            {this.state.otypeStates.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button class="btn btn-danger btn-sm" onClick = {this.submitChange}>Submit</button>
        </div>

      )
    }

    console.log("whoIsLogged", this.props.whoIsLogged)

    if(this.state.updated === true)
      alert("Updated Order");

    return (

      <div>
        <Navbar/>
        <div class="container-fluid style={{height: 100}}">
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card">
                <div class="card-horizontal">
                  <div class="card-body">
                      <p class="card-text">Order ID: {this.props.location.query.oid}</p>
                      <p class="card-text">Restaurant ID: {this.props.location.query.rid}</p>
                      <p class="card-text">Service: {this.props.location.query.ooption}</p>
                      <p class="card-text">Status: {status} {editStatusComponent}</p>
                      <p class="card-text">Order Type: {this.props.location.query.otype} {editTypeComponent}</p>
                      <p class="card-text">Time placed: {this.props.location.query.otime}</p>
                  </div>
                </div>
                <div class="card-footer">
                  <button disabled="true" id="btnLogin" className="btn btn-danger" onClick={this.editOrder}>Edit Order</button>
                  <br/>Dishes:
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
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,
    }
}

//const mapDispatchToProps = (dispatch) => { since this does not call a function directly it cannot be a function

export default connect(mapStateToProps)(Orderpage);