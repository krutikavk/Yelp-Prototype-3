import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
//use react-router-dom ONLY
//see Marko Perendio comment about using react-router-dom
//Refer: https://stackoverflow.com/questions/55552147/invariant-failed-you-should-not-use-route-outside-a-router
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, restaurantLogin} from '../../_actions';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import { restaurantLoginMutation } from '../../_mutations/mutations';
import Navbar from '../Navbar/navbar';


class restLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginOption: '',
      authFlag: false,
    };

    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  loginOptionHandler = (event) => {
    this.setState({
      loginOption: event.target.value
    })
  }

  // Comment
  emailChangeHandler = (event) => {
    this.setState({
        email : event.target.value
    })
  }

  passwordChangeHandler = (event) => {
    this.setState({
      password : event.target.value
        
    })
  }

  submitLogin = (event) => {
    event.preventDefault();

    const { restaurantLoginMutation } = this.props;
    console.log('state: ', this.state);
    restaurantLoginMutation({
      variables: {
        remail : this.state.email,
        rpassword: this.state.password,
      },
      // refetchQueries: [{ query: getCustomerQuery() }]
    }).then(response => {
      console.log('mutation resp: ', response);
      const { status, entity } = response.data.loginRestaurant;
      if(status == 200){

        this.props.update('RID', entity.rid)
        this.props.update('REMAIL', entity.remail)
        this.props.update('RPASSWORD', entity.rpassword)
        this.props.update('RNAME', entity.rname)
        this.props.update('RPHONE', entity.rphone)
        this.props.update('RABOUT', entity.rabout)
        this.props.update('RPHOTO', entity.rphoto)
        this.props.update('RLATITUDE', entity.rlatitude)
        this.props.update('RLONGITUDE', entity.rlongitude)
        this.props.update('RADDRESS', entity.raddress)
        this.props.update('RCUISINE', entity.rcuisine)
        this.props.update('RDELIVERY', entity.rdelivery)
        //this.props.update('RRATING', entity.rdelivery)
        this.setState({
          authFlag : true
        })
      }
    });
  }

  render(){
    let redirectVar = null;
    console.log("whoislogged: ", this.props.whoIsLogged)
    if(this.state.authFlag === true) {
      redirectVar = <Redirect to= "/restaurant"/>
    }

    return(

      <div>
        <Navbar/>
        <div>
          {redirectVar} 
          <div className="card col-12 col-lg-4 login-card mt-2 hv-center" >
            <form>
              <div className="col d-flex justify-content-center rounded-0">
                <div className="card-header">
                  <h4>Restaurant</h4>
                </div>
              </div>

              
              <div className = "form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input onChange = {this.emailChangeHandler} 
                                    type="email"  
                                    name="email" 
                                    className="form-control form-control-sm"
                                    placeholder="Email ID"
                                    aria-describedby="emailHelp" 
                                    required/>
                                    
              </div>

              <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input onChange = {this.passwordChangeHandler} 
                                    type="password" 
                                    name="password" 
                                    className="form-control form-control-sm"
                                    placeholder="Password"
                                    required/>
                                    
              </div>

              <div className="col-md-12 text-center">
              <button id="btn btnLogin" className="btn btn-danger" onClick={this.submitLogin}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}


//importedname: state.reducer.statename
const mapStateToProps = (state) => {
    return {
      //Restaurant props
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
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
    restaurantLogin: () => dispatch(restaurantLogin()),
  }
  
}

// export default connect(mapStateToProps, mapDispatchToProps)(restLogin);
export default compose(graphql(restaurantLoginMutation, { name: 'restaurantLoginMutation' }), connect(mapStateToProps, mapDispatchToProps))(restLogin);
