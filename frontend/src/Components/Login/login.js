import React, { Component } from 'react';
import '../../App.css';
//use react-router-dom ONLY
//see Marko Perendio comment about using react-router-dom
//Refer: https://stackoverflow.com/questions/55552147/invariant-failed-you-should-not-use-route-outside-a-router
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout} from '../../_actions'
import Navbar from '../Navbar/navbar';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      custLogin: false,
      restLogin: false
    };

    this.customerLoginHandler = this.customerLoginHandler.bind(this);
    this.restaurantLoginhandler = this.restaurantLoginHandler.bind(this);
  }

  customerLoginHandler = (event) => {
    this.setState({
      custLogin: true
    });
  }

  restaurantLoginHandler = (event) => {
    this.setState({
      restLogin: true
    });
  }

  render(){
    //redirect based on successful login

    let redirectVar = null;
    
    if(this.props.isLogged === true && this.props.whoIsLogged === false) {
      //Customer login
      redirectVar = <Redirect to= '/customer/profile'/>
    } else if (this.props.isLogged === true && this.props.whoIsLogged === true) {
      //restaurant login
      redirectVar = <Redirect to= '/restaurant/dashboard'/>
    } else if(this.props.isLogged === false && this.state.custLogin === true) {
      redirectVar = <Redirect to= '/customer/login'/>
    } else if(this.props.isLogged === false && this.state.restLogin === true) {
      redirectVar = <Redirect to= '/restaurant/login'/>
    }
  

    return(

      <div>
        <Navbar/>
        <div>
          {redirectVar}
          <br/>
          <div className="login-form card col-12 col-lg-4 login-card mt-2 hv-center" >
            <br />
            <div className="card-header">
              <h4>Login/Signup</h4>
            </div>
            <br />
            <br />
            <button id="btnLogin" className="btn btn-danger" onClick={this.customerLoginHandler}>Customer Login</button> 
            <br />
            <br />
            <button id="btnLogin" className="btn btn-danger" onClick={this.restaurantLoginHandler}>Restaurant Login</button>
            <br/>
            New Customer? Sign up here <br/>
            <Link to="/customer/signup" className="btn btn-danger">Sign up</Link>
            New Restaurant? Sign up Here <br/>
            <Link to="/restaurant/signup" className="btn btn-danger">Sign up</Link>
            <br/>
            <br/>
          </div>
        </div>
      </div>

    )
  }
}



//importedname: state.reducer.statename

const mapStateToProps = (state) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
//export Login Component
//export default Login;
