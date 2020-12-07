import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout, restaurantLogin} from '../../_actions';
import Restaurant from './restaurant';
import restro from './restro.jpg';
import Review from '../Reviews/displayreview';
import Navbar from '../Navbar/navbar';
import { Icon, InlineIcon } from '@iconify/react';
import starIcon from '@iconify/icons-typcn/star';


 
class Restaurants extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      hours: '',
      avgrating: '',
      url: '',
      success: false,
      updated: false
    }

    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange = (event) => {
    this.setState({
      success: false, 
      url : ''
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
    let fileName = 'restprof_' + this.props.rid + '_' + fileParts[0];
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

        axios.put(signedRequest, file, options)
          .then(result => {
            console.log("Response from s3")
            this.setState({
              success: true
            });

            //Add the URL to database HERE

            const data = {
              remail: this.props.remail,
              rname: this.props.rname,
              rphone : this.props.rphone,
              rabout : this.props.rabout,
              rphoto: url,
              rlocation: this.props.rlocation,
              rlatitude: this.props.rlatitude,
              rlongitude: this.props.rlongitude,
              raddress: this.props.raddress,
              rcuisine: this.props.rcuisine,
              rdelivery: this.props.rdelivery,
              rid: this.props.rid
            }
            
            let endpoint = 'http://localhost:3001/restaurants/' + this.props.rid;
            axios.put(endpoint, data)
              .then(response => {
                console.log('Status Code : ', response.status);
                if(response.status === 200){
                  console.log('Update completed')
                  //call props action
                  //this.props.update('RNAME', this.state.rname)
                  this.props.update('RPHOTO', this.state.url)
                  this.setState({
                    updated: true,
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

  //Menu handler for view dishes has to be here and not on restaurant page (only the render component is returned there)

  componentWillMount() {
    console.log(" restaurantpage component did mount rid", this.props)

    let rid = (this.props.whoIsLogged === true) ? this.props.rid : this.props.location.query.rid;
    console.log("rid on restaurantpage", rid)
    /*
    //Get all reviews
    let getReviews = 'http://localhost:3001/restaurants/' + rid + '/reviews'
    axios.get(getReviews)
    .then(response => {
      if(response.status === 200){
        //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
        //use JSON.parse(JSON.stringify()) to convert back to JSON object
        let temp = JSON.parse(JSON.stringify(response.data));
        this.setState({
          reviews: [...temp]
        })
      }

    }).catch(err =>{
        console.log("No response")
    });
    */

    /*
    let getAvgRating = 'http://localhost:3001/restaurants/' + rid + '/average'
    axios.get(getAvgRating)
    .then(response => {
      if(response.status === 200){
        //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
        //use JSON.parse(JSON.stringify()) to convert back to JSON object
        let temp = JSON.parse(JSON.stringify(response.data));
        console.log("avg ", response.data[0]['AVG(rerating)'])
        this.setState({
          avgrating: response.data[0]['AVG(rerating)']
        })
      }

    }).catch(err =>{
        console.log("No response")
    });
    */
  }

  render() {
    // If customer is logged in, take information from props passed to the page
    let restaurantprofile = {};

    let buttonDisplay = '';
    let menuOption = null;
    let addReview = null;
    let addPhoto = null;
    let updateInfo = null;
    let updateLocation = null;
    let addEvent = null;

    // If restaurant is logged in, take this info from redux state
    if(this.props.whoIsLogged === true) {
      restaurantprofile = {
        rid: this.props.rid,
        remail: this.props.remail,
        rpassword: this.props.rpassword,
        rname: this.props.rname,
        rphone: this.props.rphone,
        rabout: this.props.rabout,
        rphoto: this.props.rphoto,
        rlocation: this.props.rlocation,
        rlatitude: this.props.rlatitude,
        rlongitude: this.props.rlongitude,
        raddress: this.props.raddress,
        rcuisine: this.props.rcuisine,
        rdelivery: this.props.rdelivery,
      }

      addPhoto = <input onChange={this.handleFileUpload} ref = {(ref) => {this.uploadInput = ref;}} type = "file"/>
      updateInfo = <Link to='/restaurant/updateinfo'> <button id="btnLogin" className="btn btn-danger">Update Basic profile</button></Link>
      updateLocation = <Link to='/restaurant/updatelocation'> <button id="btnLogin" className="btn btn-danger">Update Location</button></Link>
      addEvent = <Link to='/events/add'> <button id="btnLogin" className="btn btn-danger">Add Events</button></Link>


      buttonDisplay = 'View/Edit Menu'
      menuOption = <Link to= {{
                        pathname: '/dishes/add',
                        query: {
                          rid: `${restaurantprofile.rid}`, 
                          remail: `${restaurantprofile.remail}`,
                          rname: `${restaurantprofile.rname}`, 
                          rphone: `${restaurantprofile.rphone}`, 
                          rabout: `${restaurantprofile.rabout}`, 
                          rphoto: `${restaurantprofile.rphoto}`,
                          rlocation: `${restaurantprofile.rlocation}`,
                          rlatitude: `${restaurantprofile.rlatitude}`, 
                          rlongitude: `${restaurantprofile.rlongitude}`, 
                          raddress: `${restaurantprofile.raddress}`,
                          rcuisine: `${restaurantprofile.rcuisine}`,
                          rdelivery: `${restaurantprofile.rdelivery}`,

                        }
                      }}> <button id="btnLogin" className="btn btn-danger">Add Dishes</button> </Link>

      

    } else {
      console.log('here')

      restaurantprofile = {
        rid: this.props.location.query.rid,
        remail: this.props.location.query.remail,
        rpassword: this.props.location.query.rpassword,
        rname: this.props.location.query.rname,
        rphone: this.props.location.query.rphone,
        rabout: this.props.location.query.rabout,
        rphoto: this.props.location.query.rphoto,
        rlocation: this.props.location.query.rlocation,
        rlatitude: this.props.location.query.rlatitude,
        rlongitude: this.props.location.query.rlongitude,
        raddress: this.props.location.query.raddress,
        rcuisine: this.props.location.query.rcuisine,
        rdelivery: this.props.location.query.rdelivery,
      }
      console.log('restaurant profile: ', restaurantprofile)
      buttonDisplay = 'Place Order'
      addReview = <Link to= {{
                        pathname: '/restaurant/addreview',
                        query: {
                          rid: `${restaurantprofile.rid}`, 
                          remail: `${restaurantprofile.remail}`,
                          rname: `${restaurantprofile.rname}`, 
                          rphone: `${restaurantprofile.rphone}`, 
                          rabout: `${restaurantprofile.rabout}`, 
                          rphoto: `${restaurantprofile.rphoto}`,
                          rlocation: `${restaurantprofile.rlocation}`,
                          rlatitude: `${restaurantprofile.rlatitude}`, 
                          rlongitude: `${restaurantprofile.rlongitude}`, 
                          raddress: `${restaurantprofile.raddress}`,
                          rcuisine: `${restaurantprofile.rcuisine}`,
                          rdelivery: `${restaurantprofile.rdelivery}`,

                        }
                      }}> <button id="btnLogin" className="btn btn-danger">Add Review</button> </Link>
    }

    console.log("restaurant page restaurantprofile: ", restaurantprofile)
    

    return(

      <div>
        <Navbar/>
        <div class="container-fluid style={{height: 100}}">
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card">
                <div class="card-horizontal shadow-sm p-3 mb-5 bg-white rounded">
                  <div class="form-group">
                    <img src={restaurantprofile.rphoto} class="img-thumbnail" width = "300" alt=""></img> <br/>
                    Change photo <br/>
                    {addPhoto}
                  </div>
                  <div class="card-body shadow-sm p-3 mb-5 bg-white rounded">
                    <p class="card-text font-weight-bold">{restaurantprofile.rname}</p>
                    <p class="card-text font-weight-bold font-italic"> 
                      <Icon icon={starIcon} color="red" width="30" height="30" /> 
                      {this.state.avgrating}/5
                    </p>
                    <p class="card-text font-italic">Phone: {restaurantprofile.rphone}</p>
                    <p class="card-text font-italic">Address: {restaurantprofile.raddress}</p>
                    <p class="card-text font-italic">Cuisine: {restaurantprofile.rcuisine}</p>
                    <p class="card-text font-italic">Service: {restaurantprofile.rdelivery}</p>
                    <Link to ={{
                        pathname: '/dishes',
                        query: {
                          rid: `${restaurantprofile.rid}`, 
                          remail: `${restaurantprofile.remail}`,
                          rname: `${restaurantprofile.rname}`, 
                          rphone: `${restaurantprofile.rphone}`, 
                          rabout: `${restaurantprofile.rabout}`, 
                          rphoto: `${restaurantprofile.rphoto}`,
                          rlocation: `${restaurantprofile.rlocation}`,
                          rlatitude: `${restaurantprofile.rlatitude}`, 
                          rlongitude: `${restaurantprofile.rlongitude}`, 
                          raddress: `${restaurantprofile.raddress}`,
                          rcuisine: `${restaurantprofile.rcuisine}`,
                          rdelivery: `${restaurantprofile.rdelivery}`,

                        }
                      }}><button id="btnLogin" className="btn btn-danger">{buttonDisplay}</button>
                    </Link> {menuOption} {addReview} {updateInfo} {updateLocation} {addEvent}
                  </div>


                </div>
                <div class="card-footer">

                  <p class="card-text font-weight-bold">About us: {restaurantprofile.rabout}</p>
                  <p class="card-text font-weight-bold">Hours:</p>
                    <p class="card-text">
                        <div>
                          <div> Sunday: Open</div>
                          <div> Monday: Open</div>
                          <div> Tuesday: Open</div>
                          <div> Wednesday: Open</div>
                          <div> Thursday: Closed</div>
                          <div> Friday: Open</div>
                          <div> Saturday: Open</div>
                          <div> From: 11:00 am</div>
                          <div> To: 9:00 pm</div>
                        </div>
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid style={{height: 100}}">
          <p class="card-text font-weight-bold">Reviews</p>
          {this.state.reviews.map (entry => (
            <Review review={entry} />
          ))}
        </div>
      </div>

    )

  }

}


const mapStateToProps = (state) => {
    return {

      //Get global state to get cid, rid and login details to fetch dishes for customer/restaurant

      cid: state.custProfile.cid,
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

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);