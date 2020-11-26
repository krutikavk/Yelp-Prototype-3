import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {update} from '../../_actions'
import {login} from '../../_actions';
import {Redirect, Link} from 'react-router-dom';
import profilepicture from './profile-picture.png';
import Review from '../Reviews/displayreview';
import Navbar from '../Navbar/navbar';


const validText = RegExp('[A-Za-z0-9]+')

class DisplayProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }

  }

  componentWillMount() {
    let url = 'http://localhost:3001/customers/' + this.props.cid + '/reviews';
    axios.get(url)
      .then(response => {
        if(response.status === 200){
          //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
          //use JSON.parse(JSON.stringify()) to convert back to JSON object
          let temp = JSON.parse(JSON.stringify(response.data));
          this.setState({
              reviews: [...temp],
          })
        }
      }).catch(err =>{
        console.log("No response")
    });
  }



  render() {
    let redirectVar = null;
    console.log(this.props.isLogged)
    if(this.props.isLogged === false) {
      redirectVar = <Redirect to= '/login'/>
    }

    //If customer is logged in, get data from redux state
    let customerprofile = {}

    //If restaurant is logged in, get display data from props passed from another page
    if(this.props.whoIsLogged === true) {
      //customer login--display from redux state
      customerprofile = {
        cid: this.props.location.query.cid,
        cemail: this.props.location.query.cemail,
        cpassword: this.props.location.query.cpassword,
        cname: this.props.location.query.cname,
        cphone: this.props.location.query.cphone,
        cabout: this.props.location.query.cabout,
        cjoined: this.props.location.query.cjoined,
        cphoto: this.props.location.query.cphoto,
        cfavrest: this.props.location.query.cfavrest,
        cfavcuisine: this.props.location.query.cfavcuisine,
      }

    } else {
      customerprofile = {
        cid: this.props.cid,
        cemail: this.props.cemail,
        cpassword: this.props.cpassword,
        cname: this.props.cname,
        cphone: this.props.cphone,
        cabout: this.props.cabout,
        cjoined: this.props.cjoined,
        cphoto: this.props.cphoto,
        cfavrest: this.props.cfavrest,
        cfavcuisine: this.props.cfavcuisine,
      }
    }

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
                    <img src={this.props.cphoto} class="img-thumbnail" alt="Cinque Terre" width = "300" />

                    <div class="card-body">
                      <p class="card-text font-weight-bold font-italic"> {customerprofile.cname}</p>
                      <p class="card-text text-muted font-italic">Here since: {customerprofile.cjoined.split("T")[0]}</p>
                      <p class="card-text text-muted font-italic">Reviews given: {this.state.reviews.length}</p>
                      <p class="card-text text-muted font-italic">Friends: 4728</p>
                      <Link to='/customer/edit' class="btn btn-danger">Edit profile</Link> 
                    </div>
                  </div>
                  <div class="card-footer">
                    <p class="card-text font-weight-bold">About Me:</p>
                    <p class="card-text font-italic">{customerprofile.cabout}</p>
                    <p class="card-text font-weight-bold">Favourite Restaurant:</p>
                    <p class="card-text font-italic">{customerprofile.cfavrest}</p>
                    <p class="card-text font-weight-bold">Favourite Cusine:</p>
                    <p class="card-text font-italic">{customerprofile.cfavcuisine}</p>
                  </div>                
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid ">
          <p class="card-text font-weight-bold">Reviews Given</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayProfile);

//export default Userdash;