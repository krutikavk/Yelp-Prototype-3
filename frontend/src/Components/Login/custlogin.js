import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import { update, login, logout, customerLogin } from '../../_actions';
import { customerLoginMutation } from '../../_mutations/mutations';
import Navbar from '../Navbar/navbar';

const validEmail = RegExp('\\S+\@\\S+\.\\S+')
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class custLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginOption: '',
      authFlag: false,
      errors: {
        email: '',
        password: '',
      }
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
    let err = this.state.errors;
    err.email = validEmail.test(event.target.value) ? "" : "Invalid email ID"
    this.setState({
            errors: err
        }, ()=> {
            console.log(err.email)
    }) 
    this.setState({
        email : event.target.value
    })
  }

  passwordChangeHandler = (event) => {
    let err = this.state.errors;
    err.password = event.target.value.length >= 5 ? "" : "Password should have 8 or more characters"
    this.setState({
      errors: err
      }, ()=> {
      console.log(err.password)
    }) 
    this.setState({
      password : event.target.value
        
    })
  }

  submitLogin = (event) => {
    event.preventDefault();
    const { customerLoginMutation } = this.props;
    customerLoginMutation({
      variables: {
        cemail : this.state.email,
        cpassword: this.state.password,
      },
      // refetchQueries: [{ query: getCustomerQuery() }]
    }).then(response => {
      const { status, entity } = response.data.loginCustomer;
      if(status == 200){
          this.props.update('CID', entity.id)
          this.props.update('CEMAIL', entity.cemail)
          this.props.update('CPASSWORD', entity.cpassword)
          this.props.update('CNAME', entity.cname)
          this.props.update('CPHONE', entity.cphone)
          this.props.update('CABOUT', entity.cphone)
          this.props.update('CJOINED', entity.cjoined)
          this.props.update('CPHOTO', entity.cphoto)
          this.props.update('CFAVREST', entity.cfavrest)
          this.props.update('CFAVCUISINE', entity.cfavcuisine)
          this.props.login()
          this.props.customerLogin()
        } else {
          this.props.logout();
          alert('Incorrect credentials');
        }
    });
    /*
    const data = {
      cemail : this.state.email,
      cpassword : this.state.password,
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/customers/login', data)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
          console.log("Login authorized")
          console.log(response.data[0]);
          console.log("cjoined: ", response.data[0].cjoined)
          //call props action
          this.props.update('CID', response.data[0].cid)
          this.props.update('CEMAIL', response.data[0].cemail)
          this.props.update('CPASSWORD', response.data[0].cpassword)
          this.props.update('CNAME', response.data[0].cname)
          this.props.update('CPHONE', response.data[0].cphone)
          this.props.update('CABOUT', response.data[0].cabout)
          this.props.update('CJOINED', response.data[0].cjoined)
          this.props.update('CPHOTO', response.data[0].cphoto)
          this.props.update('CFAVREST', response.data[0].cfavrest)
          this.props.update('CFAVCUISINE', response.data[0].cfavcuisine)
          this.props.login()   //this will update isLogged = true
          this.props.customerLogin()
          this.setState({
              authFlag : true
          })
        }
      }).catch(err =>{
        alert("Incorrect credentials")
        this.setState({
            authFlag : false
        })
    });*/
  }

  render(){
    //redirect based on successful login

    let redirectVar = null;
    /*
    if(cookie.load('cookie')){
      console.log(cookie)
      redirectVar = <Redirect to= "/userdash"/>
    } 
    */
    console.log(this.props.isLogged)
    if(this.props.isLogged === true) {
      //This will be changed to Search page
      redirectVar = <Redirect to= "/customer/profile"/>
    }

    const errors = this.state.errors;

    return(

      <div>
        <Navbar/>
        <div>
          {redirectVar} 
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
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input onChange = {this.emailChangeHandler} 
                                    type="email"  
                                    name="email" 
                                    className="form-control form-control-sm"
                                    placeholder="Email ID"
                                    aria-describedby="emailHelp" 
                                    required/>
                                    {errors.email.length > 0 && 
                                    <span><small id="emailHelp" className="form-text text-muted">{errors.email}</small></span>}
              </div>
              <div className="form-group text-left">
                <br/>
                <label htmlFor="exampleInputPassword1">Password</label>
                <input onChange = {this.passwordChangeHandler} 
                                    type="password" 
                                    name="password" 
                                    className="form-control form-control-sm"
                                    placeholder="Password"
                                    required/>
                                    {errors.password.length > 0 && 
                                    <span><small id="emailHelp" className="form-text text-muted">{errors.password}</small></span>}
              </div>

              <div className="col-md-12 text-center">
              <button disabled={! validateForm(this.state.errors)} id="btnLogin" className="btn btn-danger" onClick={this.submitLogin}>Login</button>
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
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn
    }
}

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
    customerLogin: () => dispatch(customerLogin()),
  }
}

export default compose(graphql(customerLoginMutation, { name: 'customerLoginMutation' }), connect(mapStateToProps, mapDispatchToProps))(custLogin);
