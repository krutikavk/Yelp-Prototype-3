import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Navbar from '../Navbar/navbar';



class AddReview extends Component {

  constructor(props) {
    super(props)

    this.state = {
      retext: '',
      rerating: '',
      added: false

    }

    this.retextChangeHandler = this.retextChangeHandler.bind(this);
    this.reratingChangeHandler = this.reratingChangeHandler.bind(this);

    this.addReview = this.addReview.bind(this);
  }

  retextChangeHandler = (event) => {
    this.setState ({
      retext: event.target.value
    })
  }

  reratingChangeHandler = (event) => {
    this.setState ({
      rerating: event.target.value
    })
  }

  
  addReview = (event) => {
    //rid and rname come from restaurantpage Link to
    event.preventDefault();
    axios.defaults.withCredentials = true;
    let url = 'http://localhost:3001/restaurants/' + this.props.location.query.rid + '/reviews';
    console.log("url: ", url)
    const data = {
      retext: this.state.retext,
      rerating: this.state.rerating,
      cid: this.props.cid,
      rname: this.props.location.query.rname
    }


    axios.post(url, data)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
          alert("Review added ")
          
          this.setState({
              added : true
          })
        }
      }).catch(err =>{
        alert("Error adding review")
    });

  }
  

  render(){

    let redirectVar = null;

    if(this.state.added === true) {

      redirectVar = <Redirect to={{
                  pathname: '/restaurant',
                  query: {
                    rid: `${this.props.location.query.rid}`, 
                    remail: `${this.props.location.query.remail}`,
                    rname: `${this.props.location.query.rname}`,
                    rphone: `${this.props.location.query.rphone}`,
                    rabout: `${this.props.location.query.rabout}`,
                    rlocation: `${this.props.location.query.rlocation}`,
                    rlatitude: `${this.props.location.query.rlatitude}`,
                    rlongitude: `${this.props.location.query.rlongitude}`,
                    raddress: `${this.props.location.query.raddress}`,
                    rcuisine: `${this.props.location.query.rcuisine}`,
                    rdelivery: `${this.props.location.query.rdelivery}`,
                  }

                }}/>
    }


    return (

      

      <div>
        {redirectVar}
        <Navbar/>
        <div>
          <div className="card col-12 col-lg-4 login-card mt-2 hv-center" >

            <br/>
            <form>
              <div className="col d-flex justify-content-center rounded-0">
                <div className="card-header">
                  <h4>Add your review for {this.props.location.query.rname} </h4>
                </div>
              </div>

              <div className = "form-group text-left">
                <br/>
                <label htmlFor="exampleInputEmail1">Your review</label>
                <input onChange = {this.retextChangeHandler} 
                                    type="text"  
                                    name="retext" 
                                    className="form-control form-control-sm"
                                    placeholder="Review"
                                    aria-describedby="emailHelp"
                                    rows="5" 
                                    />
              </div>

              <div className = "form-group text-left">
                <br/>
                <label htmlFor="exampleInputEmail1">Rating 1-5</label>
                <input onChange = {this.reratingChangeHandler} 
                                    type="number" 
                                    min="1" max="5"
                                    name="rerating" 
                                    className="form-control form-control-sm"
                                    placeholder="Rating"
                                    aria-describedby="emailHelp" 
                                    />
              </div>

              <div className="col-md-12 text-center">
              <button id="btnLogin" className="btn btn-danger" onClick={this.addReview}>Add Review</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      

    )


  }

}


const mapStateToProps = (state) => {
    return {

      //Get global state to get cid, rid and login details to fetch dishes for customer/restaurant
      cid: state.custProfile.rid,
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,

    }
}


export default connect(mapStateToProps)(AddReview);