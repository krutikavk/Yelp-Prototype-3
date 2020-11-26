import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {update} from '../../_actions'
import {login} from '../../_actions';
import {Redirect} from 'react-router-dom';
import profilepicture from './profile-picture.png';
import Navbar from '../Navbar/navbar';


const validText = RegExp('[A-Za-z0-9]+')
var dataToChange = {
  cemail: '',
  cname: '',
  cphone: '',
  cabout: '',
  cphoto: '',
  cfavrest: '',
  cfavcuisine: '',
}

class Userdash extends Component {

  constructor(props) {
  	super(props);

  	this.state = {

  	  username: '',
      email: '',
  	  password: '',
      about: '',
      phone: '',
      favrest: '',
      favcuisine: '',

  	  usernameToChange: false,
      emailToChange: false,
  	  passwordToChange: false,
      aboutToChange: false,
      phoneToChange: false,
      favrestToChange: false,
      favcuisineToChange: false,

      url: '',
      success: false,
  	  errors: {
  	  	username: '',
  	  	password: '',
        phone: '',
  	  }
    };

      this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
      this.emailChangeHandler = this.emailChangeHandler.bind(this);
      this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
      this.aboutChangeHandler = this.aboutChangeHandler.bind(this);
      this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
      this.favrestChangeHandler = this.favrestChangeHandler.bind(this);
      this.favcuisineChangeHandler = this.favcuisineChangeHandler.bind(this);

      this.submitOtherChange = this.submitOtherChange.bind(this);
      this.submitPasswordChange = this.submitPasswordChange.bind(this);

      this.usernameEditTextFieldHandler = this.usernameEditTextFieldHandler.bind(this);
      this.emailEditTextFieldHandler = this.emailEditTextFieldHandler.bind(this);
      this.passwordEditTextFieldHandler = this.passwordEditTextFieldHandler.bind(this);
      this.aboutEditTextFieldHandler = this.aboutEditTextFieldHandler.bind(this);
      this.phoneEditTextFieldHandler = this.phoneEditTextFieldHandler.bind(this);
      this.favrestEditTextFieldHandler = this.favrestEditTextFieldHandler.bind(this);
      this.favcuisineEditTextFieldHandler = this.favcuisineEditTextFieldHandler.bind(this);

      this.handleFileUpload = this.handleFileUpload.bind(this);
      this.handleFileChange = this.handleFileChange.bind(this);
  }


  usernameEditTextFieldHandler = (event) => {
    this.setState({
    	usernameToChange: true,
    })
  }  

  emailEditTextFieldHandler = (event) => {
    this.setState({
      emailToChange: true,
    })
  }

  passwordEditTextFieldHandler = (event) => {
    this.setState({
    	passwordToChange: true,
    })
  }

  aboutEditTextFieldHandler = (event) => {
    this.setState({
      aboutToChange: true,
    })
  }

  phoneEditTextFieldHandler = (event) => {
    this.setState({
      phoneToChange: true,
    })
  }


  favrestEditTextFieldHandler = (event) => {
    this.setState({
      favrestToChange: true,
    })
  }

  favcuisineEditTextFieldHandler = (event) => {
    this.setState({
      favcuisineToChange: true,
    })
  }



  usernameChangeHandler = (event) => {
  	let err = this.state.errors;
    err.username = validText.test(event.target.value) ? "" : "Username-Only alphanumeric word"
    this.setState({
            errors: err
        }, ()=> {
            console.log(err.username)
    }) 
    this.setState({
        username : event.target.value
    })
  	
    dataToChange = {
      cemail: this.props.cemail,
      cname: event.target.value,
      cphone: this.props.cphone,
      cabout: this.props.cabout,
      cphoto: this.props.cphoto,
      cfavrest: this.props.cfavrest,
      cfavcuisine: this.props.cfavcuisine,
    }
  	
  }

  emailChangeHandler = (event) => {
    this.setState({
        email : event.target.value
    })
    
    dataToChange = {
      cemail: event.target.value,
      cname: this.props.cname,
      cphone: this.props.cphone,
      cabout: this.props.cabout,
      cphoto: this.props.cphoto,
      cfavrest: this.props.cfavrest,
      cfavcuisine: this.props.cfavcuisine,
    }
    
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

  aboutChangeHandler = (event) => {
    
    this.setState({
        about : event.target.value
    })
    
    dataToChange = {
      cemail: this.props.cemail,
      cname: this.props.cname,
      cphone: this.props.cphone,
      cabout: event.target.value,
      cphoto: this.props.cphoto,
      cfavrest: this.props.cfavrest,
      cfavcuisine: this.props.cfavcuisine,
    }
  }


  phoneChangeHandler = (event) => {
    let err = this.state.errors;
    err.phone = event.target.value.length > 10 ? "" : "Invalid phone number"
    this.setState({
      errors: err
      }, ()=> {
      console.log(err.password)
    }) 
    this.setState({
        phone : event.target.value
    })

    dataToChange = {
      cemail: this.props.cemail,
      cname: this.props.cname,
      cphone: event.target.value,
      cabout: this.props.cabout,
      cphoto: this.props.cphoto,
      cfavrest: this.props.cfavrest,
      cfavcuisine: this.props.cfavcuisine,
    }
  }


  favrestChangeHandler = (event) => {
    
    this.setState({
        favrest : event.target.value
    })
    
    dataToChange = {
      cemail: this.props.cemail,
      cname: this.props.cname,
      cphone: this.props.cphone,
      cabout: this.props.cabout,
      cphoto: this.props.cphoto,
      cfavrest: event.target.value,
      cfavcuisine: this.props.cfavcuisine,
    }

    console.log("favrets ", event.target.value)
  }


  favcuisineChangeHandler = (event) => {
    
    this.setState({
        favcuisine : event.target.value
    })
    
    dataToChange = {
      cemail: this.props.cemail,
      cname: this.props.cname,
      cphone: this.props.cphone,
      cabout: this.props.cabout,
      cphoto: this.props.cphoto,
      cfavrest: this.props.cfavrest,
      cfavcuisine: event.target.value,
    }
  }

  submitOtherChange = (event) => {
  	//Write backend put request
  	event.preventDefault();
    
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log(dataToChange);
    let url = 'http://localhost:3001/customers/' + this.props.cid;
    axios.put(url, dataToChange)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){

          //call props action
          this.props.update('CEMAIL', dataToChange.cemail)
          this.props.update('CNAME', dataToChange.cname)
          this.props.update('CPHONE', dataToChange.cphone)
          this.props.update('CABOUT', dataToChange.cabout)
          this.props.update('CPHOTO', dataToChange.cphoto)
          this.props.update('CFAVREST', dataToChange.cfavrest)
          this.props.update('CFAVCUISINE', dataToChange.cfavcuisine)

          this.setState({
    	    	usernameToChange: false,
            aboutToChange: false,
            phoneToChange: false,
            favrestToChange: false,
            favcuisineToChange: false,
            errors: {
              username: '',
              password: '',
              phone: '',
            }
  	      })
        }
      }).catch(err =>{
        alert("Update failed")
    });
  }
	

  submitPasswordChange = (event) => {
  	//Write backend put request
  	event.preventDefault();
    
    const data = {
      cname: this.props.cname,
      cpassword: this.state.password,
      cemail: this.props.cemail
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    let url = 'http://localhost:3001/customers/' + this.props.cid + '/password';
    axios.put(url, data)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
          //call props action
          this.props.update('CPASSWORD', this.state.password)

          this.setState({
	    	    passwordToChange: false,
	        })
        }
      }).catch(err =>{
        alert("Update failed")
    });
  }


  handleFileChange = (event) => {
    this.setState({
      success: false, url : ''
    });
  }

  // Perform the upload
  handleFileUpload = (event) => {
    this.setState({
      success: false, 
      url : ''
    });

    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = 'custprof_' + this.props.cid + '_' + fileParts[0];
    console.log(fileName);
    let fileType = fileParts[1];
    console.log("Preparing the upload");

    axios.defaults.withCredentials = false;

    axios.post("http://localhost:3001/sign_s3",{ fileName : fileName, fileType : fileType })
      .then(response => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;

        this.setState({url: url})
        this.setState({success: true})
        console.log("Recieved a signed request " + signedRequest);
        // Put the fileType in the headers for the upload
        var options = {
          headers: {
            'ContentType': fileType
          }
        };

        axios.put(signedRequest,file, options)
          .then(result => {
            console.log("Response from s3")
            this.setState({
              success: true
            });

            //Add the URL to database HERE
            dataToChange = {
              cemail: this.props.cemail,
              cname: this.props.cname,
              cphone: this.props.cphone,
              cabout: this.props.cabout,
              cphoto: url,
              cfavrest: this.props.cfavrest,
              cfavcuisine: this.props.cfavcuisine,
            }

            let endpoint = 'http://localhost:3001/customers/' + this.props.cid;
            axios.put(endpoint, dataToChange)
              .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){

                  //call props action
                  this.props.update('CEMAIL', dataToChange.cemail)
                  this.props.update('CNAME', dataToChange.cname)
                  this.props.update('CPHONE', dataToChange.cphone)
                  this.props.update('CABOUT', dataToChange.cabout)
                  this.props.update('CPHOTO', dataToChange.cphoto)
                  this.props.update('CFAVREST', dataToChange.cfavrest)
                  this.props.update('CFAVCUISINE', dataToChange.cfavcuisine)

                  this.setState({
                    usernameToChange: false,
                    aboutToChange: false,
                    phoneToChange: false,
                    favrestToChange: false,
                    favcuisineToChange: false,
                    errors: {
                      username: '',
                      password: '',
                      phone: '',
                    }
                  })
                  alert('Picture changed');
                }
              }).catch(err =>{
                alert("Update picture URL to database failed")
            });


          })
          .catch(error => {
            alert("ERROR " + JSON.stringify(error));
          })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }


  render() {
  	let redirectVar = null;
  	console.log(this.props.isLogged)
    if(this.props.isLogged === false) {
      redirectVar = <Redirect to= '/login'/>
    }
    if(this.props.isLogged === true && this.props.whoIsLogged === true) {
      redirectVar = <Redirect to= '/login'/>
    }

  	let usernameTextField = <button class="btn btn-danger btn-sm" onClick = {this.usernameEditTextFieldHandler}>Edit</button>;
    let emailTextField = <button class="btn btn-danger btn-sm" onClick = {this.emailEditTextFieldHandler}>Edit</button>;
  	let passwordTextField = <button class="btn btn-danger btn-sm" onClick = {this.passwordEditTextFieldHandler}>Edit</button>;
    let aboutTextField = <button class="btn btn-danger btn-sm" onClick = {this.aboutEditTextFieldHandler}>Edit</button>;
    let phoneTextField = <button class="btn btn-danger btn-sm" onClick = {this.phoneEditTextFieldHandler}>Edit</button>;
    let favrestTextField = <button class="btn btn-danger btn-sm" onClick = {this.favrestEditTextFieldHandler}>Edit</button>;
    let favcuisineTextField = <button class="btn btn-danger btn-sm" onClick = {this.favcuisineEditTextFieldHandler}>Edit</button>;


  	const errors = this.state.errors;

  	if(this.state.usernameToChange === true) {
  	  usernameTextField = (
  	  	<div class = 'login-form'>
  	  	<input onChange = {this.usernameChangeHandler} 
                                type="text"  
                                name="username" 
                                class="form-control"
                                placeholder="New username"
                                required/>
        {errors.username.length > 0 && 
          <span>{errors.username}</span>}
        <button class="btn btn-danger btn-sm" disabled={this.state.errors.username.length > 0} onClick = {this.submitOtherChange}>Submit change</button>
        </div>
      )
  	}

    if(this.state.emailToChange === true) {
      emailTextField = (
        <div class = 'login-form'>
        <input onChange = {this.emailChangeHandler} 
                                type="email"  
                                name="username" 
                                class="form-control"
                                placeholder="New email ID"
                                required/>
        <button class="btn btn-danger btn-sm" onClick = {this.submitOtherChange}>Submit change</button>
        </div>
      )
    }

  	if(this.state.passwordToChange === true) {
  	  passwordTextField = (
  	  	<div>
  	  	<input onChange = {this.passwordChangeHandler} 
                                type="password"  
                                name="password" 
                                class="form-control"
                                placeholder="New password"
                                required/>
        {errors.password.length > 0 && 
          <span>{errors.password}</span>}

        <button class="btn btn-danger btn-sm" disabled={this.state.errors.password.length > 0} onClick = {this.submitPasswordChange}>Submit change</button>
        </div>
      )
  	}

    if(this.state.aboutToChange === true) {
      aboutTextField = (
        <div class = 'login-form'>
        <input onChange = {this.aboutChangeHandler} 
                                type="text"  
                                name="username" 
                                class="form-control"
                                placeholder="New about"
                                required/>
        <button class="btn btn-danger btn-sm" onClick = {this.submitOtherChange}>Submit change</button>
        </div>
      )
    }


    if(this.state.phoneToChange === true) {
      phoneTextField = (
        <div class = 'login-form'>
        <input onChange = {this.phoneChangeHandler} 
                                type="number"  
                                name="phone" 
                                class="form-control"
                                placeholder="New Phone number"
                                required/>
        {errors.phone.length > 0 && 
          <span>{errors.phone}</span>}
        <button class="btn btn-danger btn-sm" disabled={this.state.errors.phone.length > 0} onClick = {this.submitOtherChange}>Submit change</button>
        </div>
      )
    }

    if(this.state.favrestToChange === true) {
      favrestTextField = (
        <div class = 'login-form'>
        <input onChange = {this.favrestChangeHandler} 
                                type="text"  
                                name="favrest" 
                                class="form-control"
                                placeholder="New Favourite Restaurant"
                                required/>
        <button class="btn btn-danger btn-sm" onClick = {this.submitOtherChange}>Submit change</button>
        </div>
      )
    }

    if(this.state.favcuisineToChange === true) {
      favcuisineTextField = (
        <div class = 'login-form'>
        <input onChange = {this.favcuisineChangeHandler} 
                                type="text"  
                                name="favcuisine" 
                                class="form-control"
                                placeholder="New Favourite cuisine"
                                required/>
        <button class="btn btn-danger btn-sm" onClick = {this.submitOtherChange}>Submit change</button>
        </div>
      )
    }


    const Success_message = () => (
      <div class='form-group'>
      <img src={this.state.url} alt="" class="img-responsive" width="40" height="40"/>
      <br/>
      </div>
    )

    return (

      <div>
        <Navbar/>
        <div>
          {redirectVar}
          <div class="container-fluid style={{height: 100}}">
              <div class="row">
                <div class="col-12 mt-3">
                  <div class="card">
                    <div class="card-horizontal">
                      
                      <div class="form-group">
                        <img src={this.props.cphoto} class="img-thumbnail" alt="Cinque Terre" width = "300" />
                        
                        <input onChange={this.handleFileUpload} ref = {(ref) => {this.uploadInput = ref;}} type = "file"/>
                      </div>
                      <div class="card-body">
                        <p class="card-text font-weight-bold font-italic"> {this.props.cname} {usernameTextField}</p>  
                      </div>
                    </div>
                    <div class="card-footer">
                      <p class="card-text font-weight-bold font-italic"> Password {passwordTextField} </p>
                      <p class="card-text font-weight-bold">About Me: {aboutTextField}</p>
                      <p class="card-text font-italic">{this.props.cabout}</p>
                      <p class="card-text font-weight-bold">Favourite Restaurant: {favrestTextField}</p>
                      <p class="card-text font-italic">{this.props.cfavrest}</p>
                      <p class="card-text font-weight-bold">Favourite Cusine: {favcuisineTextField}</p>
                      <p class="card-text font-italic">{this.props.cfavcuisine}</p>
                      <small class="text-muted">muted</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>







        /*

      <div>
      	{redirectVar}
  	    <div class='dashboard'>
  		    <div class='form-group'>
  			  USERNAME: {this.props.cname}
  			  {usernameTextField}

  		    </div>
  		    <div class='form-group'>
  		      PASSWORD
  		      {passwordTextField}

  		    </div>
  		    <div class='form-group'>
  			  EMAIL ID: {this.props.cemail}
  			</div>
  			<div>
  			  PROFILE PICTURE
  			  <div>
  		    	<img src={profilepicture} alt = "" width="300px" height="200px"></img>
  			    <h2>User Dashboard</h2>
  		      </div>
  			 </div>
         
         <div class="form-group">
            {this.state.success ? <Success_message /> : null}
            <input onChange={this.handleFileUpload} ref = {(ref) => {this.uploadInput = ref;}} type = "file"/>
          </div>

  		  </div>
  	  </div>
      */
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

//const mapDispatchToProps = (dispatch) => { since this does not call a function directly it cannot be a function

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Userdash);

//export default Userdash;