////////******DONT USE THIS PAGE

/*
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
    console.log("=>inside restaurant" , this.props)

    return (
      //Pass restaurant information to display menu and then show when dishes are added to cart
      <Link to ={{
                  pathname: '/dishes',
                  query: {
                    rid: `${this.props.restaurant.rid}`, 
                    rname: `${this.props.restaurant.rname}`, 
                    rphone: `${this.props.restaurant.rphone}`,
                    rdelivery: `${this.props.restaurant.rdelivery}`,
                  }
                }}>
        <div class="container-fluid style={{height: 100}}">
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card">
                <div class="card-horizontal">
                  <div class="img-square-wrapper">
                      <img class="img-responsive card-img-top" src={restropic} alt="restro"></img>
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

*/