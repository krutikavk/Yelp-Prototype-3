import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect ,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, restaurantLogin} from '../../_actions';
import {nachospic} from './nachospic.png';
import Dish from './dish';
import Navbar from '../Navbar/navbar';

 
class Dishes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: [],
      rid: '',
      rdelivery: '',
    }
  }

  componentDidMount(props) {

    //console.log("rest id: ", this.props.location.query.rid)
    //console.log("rest id: ", this.props.location.query.rname)
    //console.log("rest id: ", this.props.location.query.rphone)
    //console.log("rest id: ", this.props.location.query.rdelivery)

    //get all dishes for a restaurant
    let url = 'http://localhost:3001/dishes/' + this.props.location.query.rid;
    console.log("query id: ", this.props.location.query.rid)
    axios.get(url)
        .then(response => {
          if(response.status === 200){
            //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
            //use JSON.parse(JSON.stringify()) to convert back to JSON object
            let temp = JSON.parse(JSON.stringify(response.data));
            console.log("temp: ", temp);
            this.setState({
                dishes: [...temp],
                rid: this.props.location.query.rid,
                rdelivery: this.props.location.query.rdelivery
            })
          }
        }).catch(err =>{
            console.log("No response")
        });
  }

  render() {
    //{this.state.dishes.length > 0 && <displayDishes dishes={this.state.dishes} />}

    let addDishes = null;
    if(this.props.isLogged === true && this.props.whoIsLogged === true) {
      addDishes = <Link to= '/dishes/add'> <button id="btnLogin" className="btn btn-danger">Add Dishes</button> </Link>
    }


    let warning = null;
    if(this.state.dishes.length === 0) {
      warning = <p class="card-text font-italic">No dishes added by restaurant</p>
    }


    return(

      <div>
        <Navbar/>
        <div class="container-fluid style={{height: 100}}">
            <div class="row">
              <div class="col-12 mt-3">
                <div class="card">
                  <div class="card-horizontal">
                    <img src={this.props.location.query.rphoto} style={{width: 250}} alt="" width></img>
                    <div class="card-body">
                      <p class="card-text font-weight-bold">{this.props.location.query.rname}</p>
                      <p class="card-text font-italic">Phone: {this.props.location.query.rphone}</p>
                      <p class="card-text font-italic">Address: {this.props.location.query.raddress}</p>
                      <p class="card-text font-italic">Service: {this.props.location.query.rdelivery}</p>
                      {addDishes}
                    </div>
                  </div>
                  <div class="card-footer">
                    {warning}
                      <p class="card-text">
                        {this.state.dishes.map (dish => (
                          <Dish dish = {dish} rid = {this.state.rid} rdelivery = {this.state.rdelivery} />
                        ))} 
                      </p>
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

export default connect(mapStateToProps)(Dishes);



