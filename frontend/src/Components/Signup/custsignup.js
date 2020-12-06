import React, { Component } from 'react';
import '../../App.css';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, customerLogin} from '../../_actions';
import Navbar from '../Navbar/navbar';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import { addCustomerMutation } from '../../_mutations/mutations';

const validText = RegExp('[A-Za-z0-9]+')
const validEmail = RegExp('\\S+\@\\S+\.\\S+')
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Custsignup extends Component {
  constructor(props) {
	super(props);

	this.state = {
	  cname: '',
	  cemail: '',
	  cpassword: '',
	  errors: {
  		cname: '',
  		cemail: '',
  		cpassword: '',
	  }
	}

	this.cnameChangeHandler = this.cnameChangeHandler.bind(this);
	this.cemailChangeHandler = this.cemailChangeHandler.bind(this);
	this.cpasswordChangeHandler = this.cpasswordChangeHandler.bind(this);
	this.registerCustomer = this.registerCustomer.bind(this);

  }

  cnameChangeHandler = (event) => {
    let err = this.state.errors;
    err.cname = validText.test(event.target.value) ? '' : 'Username-Only alphanumeric word';
    this.setState({
      errors: err
        }, ()=> {
          console.log(err.cname)
    }) 
    //this.props.update('CNAME', event.target.value)
    this.setState({
      cname: event.target.value
    })
  }

  cemailChangeHandler = (event) => {
    let err = this.state.errors;
    err.cemail = validEmail.test(event.target.value) ? '' : 'Invalid email ID';
    this.setState({
      errors: err
        }, ()=> {
            console.log(err.cemail)
    }) 
    //this.props.update('CEMAIL', event.target.value)
    this.setState({
      cemail: event.target.value
    })
  }

  cpasswordChangeHandler = (event) => {
    let err = this.state.errors;
    err.cpassword = event.target.value.length >= 5 ? "" : "Password should have 5 or more characters"
    this.setState({
      errors: err
      }, ()=> {
	    console.log(err.cpassword)
  	}) 
    //this.props.update('CPASSWORD', event.target.value)
  	this.setState({
  	  cpassword : event.target.value
  	})
  }

  registerCustomer = (event) => {
  	event.preventDefault();
    console.log('this.state', this.state)

    this.props.addCustomerMutation({
      variables: {
        cname : this.state.cname,
        cemail : this.state.cemail,
        cpassword: this.state.cpassword,
      },
      // refetchQueries: [{ query: getCustomerQuery() }]
    }).then(response => {
      const { status, entity } = response.data.addCustomer;
      if(status == 200){
          this.props.update('CID', entity.id)
          this.props.update('CEMAIL', entity.cemail)
          this.props.update('CPASSWORD', entity.cpassword)
          this.props.update('CNAME', entity.cname)
          this.props.update('CJOINED', entity.cjoined)
          this.props.login()
          this.props.customerLogin()
        } else {
          this.props.logout();
          alert('Email ID is already registered')
        }
    });
  }

  render() {
  	let redirectVar = null;
    console.log("islogged props: ", this.props.isLogged)
    if(this.props.isLogged === true && this.props.whoIsLogged === false) {
      redirectVar = <Redirect to= "/customer/profile"/>
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
                <h4>Customer</h4>
              </div>
            </div>

            <div className = "form-group text-left">
              <br/>
              <label htmlFor="exampleInputEmail1">Name</label>
              <input onChange = {this.cnameChangeHandler} 
                                  type="text"  
                                  name="rname" 
                                  className="form-control form-control-sm"
                                  placeholder="Name"
                                  aria-describedby="emailHelp" 
                                  required/>
                                  {errors.cname.length > 0 && 
                                  <span><small id="emailHelp" className="form-text text-muted">{errors.cname}</small></span>}
            </div>

            <div className = "form-group text-left">
              <br/>
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input onChange = {this.cemailChangeHandler} 
                                  type="email"  
                                  name="cemail" 
                                  className="form-control form-control-sm"
                                  placeholder="Email ID"
                                  aria-describedby="emailHelp" 
                                  required/>
                                  {errors.cemail.length > 0 && 
                                  <span><small id="emailHelp" className="form-text text-muted">{errors.cemail}</small></span>}
            </div>
            <div className="form-group text-left">
              <br/>
              <label htmlFor="exampleInputPassword1">Password</label>
              <input onChange = {this.cpasswordChangeHandler} 
                                  type="password" 
                                  name="cpassword" 
                                  className="form-control form-control-sm"
                                  placeholder="Password"
                                  required/>
                                  {errors.cpassword.length > 0 && 
                                  <span><small id="emailHelp" className="form-text text-muted">{errors.cpassword}</small></span>}
            </div>

            <div className="col-md-12 text-center">
            <button disabled={! validateForm(this.state.errors)} id="btnLogin" className="btn btn-danger" onClick={this.registerCustomer}>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    )	
  }

}

const mapStateToProps = (state) => {
    return {
      cid: state.custProfile.cid,
      cemail: state.custProfile.cemail,
      cpassword: state.custProfile.cpassword,
      cname: state.custProfile.cname,
      cphone: state.custProfile.cphone,
      cabout: state.custProfile.cabout,
      cjoined: state.custProfile.cjoined,
      cphoto: state.custProfile.cphoto,
      cfavrest: state.custProfile.cfavrest,
      cfavcuisine: state.custProfile.cfavcuisine,
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,

    }
}

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
    customerLogin: () => dispatch(customerLogin())
  }
  
}

export default compose(graphql(addCustomerMutation, { name: 'addCustomerMutation' }), connect(mapStateToProps, mapDispatchToProps))(Custsignup);
