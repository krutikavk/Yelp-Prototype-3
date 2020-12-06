import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { update } from '../../_actions';
import profilepicture from './profile-picture.png';
import Review from '../Reviews/displayreview';
import Navbar from '../Navbar/navbar';


class DisplayProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  componentDidMount() {
    /*
    const url = 'http://localhost:3001/customers/' + this.props.cid + '/reviews';
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
    */
  }

  render() {
    let redirectVar = null;
    const { isLogged, whoIsLogged } = this.props;
    if (isLogged === false) {
      redirectVar = <Redirect to='/login' />;
    }

    // If customer is logged in, get data from redux state
    const {
      cid,
      cemail,
      cpassword,
      cname,
      cphone,
      cabout,
      cjoined,
      cphoto,
      cfavrest,
      cfavcuisine,
    } = (whoIsLogged === true) ? this.props.location.query : this.props;

    const customerProfile = {
      cid,
      cemail,
      cpassword,
      cname,
      cphone,
      cabout,
      cjoined,
      cphoto,
      cfavrest,
      cfavcuisine,
    };

    console.log('customer profile: ', customerProfile);

    // If restaurant is logged in, get display data from props passed from another page
    /*
    if (whoIsLogged === true) {
      // customer login--display from redux state
      const {
        cid,
        cemail,
        cpassword,
        cname,
        cphone,
        cabout,
        cjoined,
        cphoto,
        cfavrest,
        cfavcuisine,
      } = this.props.location.query;

      customerprofile = {
        cid,
        cemail,
        cpassword,
        cname,
        cphone,
        cabout,
        cjoined,
        cphoto,
        cfavrest,
        cfavcuisine,
      };
    } else {
      const {
        cid,
        cemail,
        cpassword,
        cname,
        cphone,
        cabout,
        cjoined,
        cphoto,
        cfavrest,
        cfavcuisine,
      } = this.props;

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
    */

    return (
      <div>
        <Navbar />
        <div>
          {redirectVar}
          <div className="container-fluid style={{height: 100}}">
            <div className="row">
              <div className="col-12 mt-3">
                <div className="card">
                  <div className="card-horizontal">
                    <img src={profilepicture} className="img-thumbnail" alt="Cinque Terre" width="300" />

                    <div className="card-body">
                      <p className="card-text font-weight-bold font-italic"> {customerProfile.cname}</p>
                      <p className="card-text text-muted font-italic">Here since: {customerProfile.cjoined}</p>
                      <p className="card-text text-muted font-italic">Friends: 4728</p>
                      <Link to='/customer/edit' class="btn btn-danger">Edit Profile</Link>
                    </div>
                  </div>
                  <div className="card-footer">
                    <p className="card-text font-weight-bold">About Me:</p>
                    <p className="card-text font-italic">{customerProfile.cabout}</p>
                    <p className="card-text font-weight-bold">Favourite Restaurant:</p>
                    <p className="card-text font-italic">{customerProfile.cfavrest}</p>
                    <p className="card-text font-weight-bold">Favourite Cusine:</p>
                    <p className="card-text font-italic">{customerProfile.cfavcuisine}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line arrow-body-style
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
  };
};

function mapDispatchToProps(dispatch) {
  return {
    update: (field, payload) => dispatch(update(field, payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayProfile);
