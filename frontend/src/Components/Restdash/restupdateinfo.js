import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, restaurantLogin} from '../../_actions'
import Navbar from '../Navbar/navbar';


const validText = RegExp('[A-Za-z0-9]+')
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Restupdateinfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rphone: '',
      rabout: '',
      rcuisine: '',
      rdelivery: '',
      rdeliveryStates: ['Curbside pickup', 'Yelp Delivery', 'Dine In'],
      updated: false,
      errors: {
        rphone: '',
        rabout: '',
      }
    };

    //this.rnameChangeHandler = this.rnameChangeHandler.bind(this);
    this.rphoneChangeHandler = this.rphoneChangeHandler.bind(this);
    this.raboutChangeHandler = this.raboutChangeHandler.bind(this);
    this.rcuisineChangeHandler = this.rcuisineChangeHandler.bind(this);
    this.rdeliveryChangeHandler = this.rdeliveryChangeHandler.bind(this);
    this.submitChange = this.submitChange.bind(this);
  }

  /*
  rnameChangeHandler = (event) => {
    let err = this.state.errors;
    err.rname = event.target.value.length <= 50 ? '' : 'Too long name'
    this.setState({
        errors: err
      }, ()=> {
        console.log(err.rname)
    }) 
    this.setState({
        rname : event.target.value
    })
  }
  */

  rphoneChangeHandler = (event) => {
    let err = this.state.errors;
    err.rphone = event.target.value.length === 10 ? '' : 'Invalid';

    this.setState({
        errors: err
      }, ()=> {
        console.log(err.rphone)
    }) 
    this.setState({
        rphone : event.target.value
    })
  }


  raboutChangeHandler = (event) => {
    let err = this.state.errors;
    err.rabout = event.target.value.length <= 200 ? '' : 'Too Long, keep to 200 charactersx';

    this.setState({
        errors: err
      }, ()=> {
        console.log(err.rabout)
    }) 
    this.setState({
      rabout : event.target.value
    })
  }


  rcuisineChangeHandler = (event) => {
    this.setState({
      rcuisine : event.target.value
    })
  }

  rdeliveryChangeHandler = (event) => {
    console.log('button-->', event.target.value)
    this.setState({
      rdelivery : event.target.value
    })
  }



  submitChange = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      console.info('Valid form')
    } else {
      console.error('Invalid form')
    }
    const data = {
      remail: this.props.remail,
      rname: this.props.rname,
      rphone : this.state.rphone,
      rabout : this.state.rabout,
      rlocation: this.props.rlocation,
      rlatitude: this.props.rlatitude,
      rlongitude: this.props.rlongitude,
      raddress: this.props.raddress,
      rcuisine: this.state.rcuisine,
      rdelivery: this.state.rdelivery,
      rid: this.props.rid
    }

    /*
    request.body.remail,
    request.body.rname,
    request.body.rphone,
    request.body.rabout,
    request.body.rlocation,
    request.body.rlatitude,
    request.body.rlongitude,
    request.body.raddress,
    request.body.rcuisine,
    request.body.rdelivery,
    request.params.rid
    */

    let endpoint = 'http://localhost:3001/restaurants/' + this.props.rid;
    console.log('update endpoint: ', endpoint)

    axios.put(endpoint, data)
      .then(response => {
        console.log('Status Code : ', response.status);
        if(response.status === 200){
          console.log('Update completed')
          //call props action
          //this.props.update('RNAME', this.state.rname)
          this.props.update('RPHONE', this.state.rphone)
          this.props.update('RABOUT', this.state.rabout)
          this.props.update('RCUISINE', this.state.rcuisine)
          this.props.update('RDELIVERY', this.state.rdelivery)
          this.setState({
            updated: true,
          })
        }
      }).catch(err =>{
        alert("Update failed")
        this.setState({
            updated : false
        })
    });
  }


  
  render() {

    let redirectVar = null;
    //Nobody is logged in
    if(this.props.isLogged === false ) {
      redirectVar = <Redirect to= '/login'/>
    }
    //customer is logged in--redirect to customer dashboard
    else if(this.props.isLogged === true && this.props.whoIsLogged === false) {
      redirectVar = <Redirect to= '/customer/dashboard'/>
    }

    //Update successful--redirect to update2 page
    else if(this.props.isLogged === true && this.props.whoIsLogged === true && this.state.updated === true) {
      redirectVar = <Redirect to= '/restaurant/updatelocation'/>
    }

    const errors = this.state.errors;

    return (

      
      
      <div>
        {redirectVar}
        <Navbar/>
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center" >
          <form>
            <div className="col d-flex justify-content-center rounded-0">

            <div className="card-header">
              <h4>Restaurant</h4>
            </div>
            </div>

              <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Phone Number</label>
                <input onChange = {this.rphoneChangeHandler} 
                                    type="number" 
                                    name="rphone" 
                                    className="form-control form-control-sm"
                                    placeholder="10-digit Phone Number"
                                    required/>
                                    {errors.rphone.length > 0 && 
                                    <span><small id="emailHelp" className="form-text text-muted">{errors.rphone}</small></span>}
              </div>

              <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Cuisine</label>
                <input onChange = {this.rcuisineChangeHandler} 
                                    type="text" 
                                    name="rcuisine" 
                                    className="form-control form-control-sm"
                                    placeholder="Cuisine"
                                    required/>
              </div>

              
              <div class="form-group">
                <label for="rdelivery">Delivery Type</label>
                <select class="form-control" id="rdelivery" onChange = {this.rdeliveryChangeHandler}>>
                  <option value = {this.state.rdelivery}> Choose...</option>
                  {this.state.rdeliveryStates.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group text-left">
                <label for="comment">About You</label>
                <textarea onChange = {this.raboutChangeHandler} 
                          class="form-control form-control-sm" rows="5" id="rabout"></textarea>
                          {errors.rabout.length > 0 && 
                          <span><small id="emailHelp" className="form-text text-muted">{errors.rabout}</small></span>}
              </div>

              <div className="col-md-12 text-center">
              <button disabled={! validateForm(this.state.errors)} id="btnLogin" className="btn btn-success btn-lg" onClick={this.submitChange}>Submit</button>
            </div>
          </form>
        </div>
      </div>

    )
  }

}


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
    restaurantLogin: () => dispatch(restaurantLogin())
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Restupdateinfo);