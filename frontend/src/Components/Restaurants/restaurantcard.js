import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import restropic from './restro.jpg';


class Restaurant extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: false
    }
  }

  render() {

    return (
      //Pass restaurant information to display menu and then show when dishes are added to cart
      <Link to ={{
                  pathname: '/restaurant',
                  query: {
                    rid: `${this.props.restaurant.id}`, 
                    remail: `${this.props.restaurant.remail}`,
                    rname: `${this.props.restaurant.rname}`,
                    rphone: `${this.props.restaurant.rphone}`,
                    rabout: `${this.props.restaurant.rabout}`,
                    rphoto: `${this.props.restaurant.rphoto}`,
                    rlocation: `${this.props.restaurant.rlocation}`,
                    rlatitude: `${this.props.restaurant.rlatitude}`,
                    rlongitude: `${this.props.restaurant.rlongitude}`,
                    raddress: `${this.props.restaurant.raddress}`,
                    rcuisine: `${this.props.restaurant.rcuisine}`,
                    rdelivery: `${this.props.restaurant.rdelivery}`,
                  }

                }}>
        <div class="container-fluid style={{height: 100}}">
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card">
                <div class="card-horizontal">
                  <div class="img-square-wrapper">
                      <img class="img-responsive img-thumbnail" src={this.props.restaurant.rphoto} alt="restro" width="300"/>
                  </div>
                  <div class="card-body">
                      <p class="card-text">Name: {this.props.restaurant.rname}</p>
                      <p class="card-text">Phone: {this.props.restaurant.rphone}</p>
                      <p class="card-text">About us: {this.props.restaurant.rabout}</p>
                      <p class="card-text">Address: {this.props.restaurant.raddress}</p>
                      <p class="card-text">Cuisine: {this.props.restaurant.rcuisine}</p>
                      <p class="card-text">Service: {this.props.restaurant.rdelivery}</p>

                  </div>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Featured!</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>





    )
  }

}



export default Restaurant;