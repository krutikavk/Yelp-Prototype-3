import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, restaurantLogin} from '../../_actions';
import Navbar from '../Navbar/navbar';

const validText = RegExp('[A-Za-z0-9]+')
// eslint-disable-next-line no-useless-escape
const validEmail = RegExp('\\S+\@\\S+\.\\S+')
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Restsignup extends Component {
  constructor(props) {
	  super(props);

    this.state = {
      rname: '',
      remail: '',
      rpassword: '',
      isAdded: false,
      errors: {
        rname: '',
        remail: '',
        rpassword: '',
      }
    }

    this.rnameChangeHandler = this.rnameChangeHandler.bind(this);
    this.remailChangeHandler = this.remailChangeHandler.bind(this);
    this.rpasswordChangeHandler = this.rpasswordChangeHandler.bind(this);
    this.registerRestaurant = this.registerRestaurant.bind(this);
  }

  rnameChangeHandler = (event) => {
    let err = this.state.errors;
    err.rname = validText.test(event.target.value) ? '' : 'Username-Only alphanumeric word';
    this.setState({
      errors: err
        }, ()=> {
        console.log(err.rname)
    }) 
    this.setState({
      rname: event.target.value
    })
  }


  remailChangeHandler = (event) => {
    let err = this.state.errors;
    err.remail = validEmail.test(event.target.value) ? '' : 'Invalid email ID';
    this.setState({
      errors: err
        }, ()=> {
        console.log(err.remail)
    }) 

    this.setState({
      remail: event.target.value
    })
  }

  rpasswordChangeHandler = (event) => {
    let err = this.state.errors;
    err.rpassword = event.target.value.length >= 5 ? "" : "Password should have 5 or more characters"
    this.setState({
      errors: err
      }, ()=> {
      console.log(err.rpassword)
    }) 
    
    this.setState({
      rpassword : event.target.value
    })
  }

  registerRestaurant = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info("Valid form")
    } else {
      console.error("Invalid form")
    }

    const data = {
      rname : this.state.rname,
      remail : this.state.remail,
      rpassword: this.state.rpassword,
    }



    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/restaurants', data)
      .then(response => {

        console.log("Status Code : ",response.status);
        if(response.status === 200){
          console.log('Restaurant added')

          
          //This is no longer needed, state error only needed

          let url = 'http://localhost:3001/restaurants/' + response.data[0].rid + '/hours';
          this.props.update('RID', response.data[0].rid)
          this.props.update('REMAIL', response.data[0].remail)
          this.props.update('RPASSWORD', response.data[0].rpassword)
          this.props.update('RNAME', response.data[0].rname)
          this.props.update('RPHONE', response.data[0].rphone)
          this.props.update('RABOUT', response.data[0].rabout)
          this.props.update('RPHOTO', response.data[0].rphoto)
          this.props.update('RLOCATION', response.data[0].rlocation)
          this.props.update('RLATITUDE', response.data[0].rlatitude)
          this.props.update('RLONGITUDE', response.data[0].rlongitude)
          this.props.update('RADDRESS', response.data[0].raddress)
          this.props.update('RCUISINE', response.data[0].rcuisine)
          this.props.update('RDELIVERY', response.data[0].rdelivery)

          this.props.login()
          this.props.restaurantLogin()

          this.setState({
            isAdded : true
          })

          axios.post(url, {rid: response.data[0].rid})
            .then (response => {

              console.log("updated hours code : ",response.status);
              if(response.status === 200){

                console.log("Updated hours for restaurant")
                

              }

            }).catch(err => {

            });

          //add hours to restaurant
          
        }
      }).catch(err =>{
          this.setState({
              isAdded : false
          })
          this.props.logout();
      });
  }

  
  

	render (){

    let redirectVar = null;
    /*
    if(cookie.load('cookie')){
      console.log(cookie)
      redirectVar = <Redirect to= "/userdash"/>
    } */
    console.log("islogged props: ", this.props.isLogged)
    console.log("whoIsLogged props: ", this.props.whoIsLogged)
    if(this.props.isLogged === true && this.props.whoIsLogged === true) {
      redirectVar = <Redirect to= "/restaurant/updateinfo"/>
    }
    const errors = this.state.errors;

    return (

      <div>
        {redirectVar} 
        <Navbar/>
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center" >

        <br/>
          <form>
            <div className="col d-flex justify-content-center rounded-0">
              <div className="card-header">
                <h4>Restaurant</h4>
              </div>
            </div>

            <div className = "form-group text-left">
              <br/>
              <label htmlFor="exampleInputEmail1">Restaurant Name</label>
              <input onChange = {this.rnameChangeHandler} 
                                  type="text"  
                                  name="rname" 
                                  className="form-control form-control-sm"
                                  placeholder="Restaurant Name"
                                  aria-describedby="emailHelp" 
                                  required/>
                                  {errors.rname.length > 0 && 
                                  <span><small id="emailHelp" className="form-text text-muted">{errors.rname}</small></span>}
            </div>

            <div className = "form-group text-left">
              <br/>
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input onChange = {this.remailChangeHandler} 
                                  type="email"  
                                  name="email" 
                                  className="form-control form-control-sm"
                                  placeholder="Email ID"
                                  aria-describedby="emailHelp" 
                                  required/>
                                  {errors.remail.length > 0 && 
                                  <span><small id="emailHelp" className="form-text text-muted">{errors.remail}</small></span>}
            </div>
            <div className="form-group text-left">
              <br/>
              <label htmlFor="exampleInputPassword1">Password</label>
              <input onChange = {this.rpasswordChangeHandler} 
                                  type="password" 
                                  name="password" 
                                  className="form-control form-control-sm"
                                  placeholder="Password"
                                  required/>
                                  {errors.rpassword.length > 0 && 
                                  <span><small id="emailHelp" className="form-text text-muted">{errors.rpassword}</small></span>}
            </div>

            <div className="col-md-12 text-center">
            <button disabled={! validateForm(this.state.errors)} id="btnLogin" className="btn btn-danger" onClick={this.registerRestaurant}>Sign up</button>
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
      remail: state.restProfile.remail,
      rpassword: state.restProfile.rpassword,
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
    restaurantLogin: () => dispatch(restaurantLogin()),
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Restsignup);


