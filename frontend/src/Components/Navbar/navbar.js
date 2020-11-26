import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout} from '../../_actions';
import logo from './yelp-logo.jpg';

//create the Navbar Component
class Navbar extends Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }


  handleLogout = () => {
      //cookie.remove('cookie', { path: '/' })
      this.props.update('CID', '')
      this.props.update('CEMAIL', '')
      this.props.update('CPASSWORD', '')
      this.props.update('CNAME', '')
      this.props.update('CPHONE', '')
      this.props.update('CABOUT', '')
      this.props.update('CJOINED', '')
      this.props.update('CPHOTO', '')
      this.props.update('CFAVREST', '')
      this.props.update('CFAVCUISINE', '')

      this.props.update('RID', '')
      this.props.update('REMAIL', '')
      this.props.update('RPASSWORD', '')
      this.props.update('RNAME', '')
      this.props.update('RPHONE', '')
      this.props.update('RABOUT', '')
      this.props.update('RLOCATION', '')
      this.props.update('RLATITUDE', '')
      this.props.update('RLONGITUDE', '')
      this.props.update('RADDRESS', '')
      this.props.update('RCUISINE', '')
      this.props.update('RDELIVERY', '')

      this.props.logout()

  }


  render(){

    let navLogin = null;
    if(this.props.isLogged === true){
        console.log("Login is true");
        navLogin = (
              <Link className="nav-link" to="/login" onClick = {this.handleLogout}>Logout</Link>
        ); 
    }else{
        navLogin = (
              <Link className="nav-link" to="/login">Login</Link>
        )
    }


    let cart = (
        <Link className="nav-link" to="/cart">
          <i className="fa fa-shopping-cart" style={{'font-size':36}}></i>
        </Link>
      )
    let menu = null;
    


    let dashboard = null;
    if(this.props.isLogged === true && this.props.whoIsLogged === false) {
      //customer login
      dashboard = <Link className="nav-link" to="/customer/profile">Profile</Link>

    } else if (this.props.isLogged === true && this.props.whoIsLogged === true) {
      //restaurant login
      dashboard = <Link className="nav-link" to="/restaurant">Profile</Link>
      menu = <Link className="nav-link" to="/dishes">Menu</Link>
      cart = null;
    }

    let registeredEvents = null;
    if(this.props.isLogged === true && this.props.whoIsLogged === false) {
      registeredEvents = <li className="nav-item"> <Link className="nav-link" to="/events/registered">MyEvents</Link> </li>
    } 

    //Display all events for customer/only hosted events for restaurant
    let events = null;
    if(this.props.isLogged === true && this.props.whoIsLogged === false) {
      events = <li className="nav-item">
                <Link className="nav-link" to="/events">Events</Link>
              </li>
    } else if (this.props.isLogged === true && this.props.whoIsLogged === true) {
      events = <li className="nav-item">
                <Link className="nav-link" to="/events/hosted">MyEvents</Link>
              </li>
    }
    
    
    
    return(

      <div>
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
          <Link to="/"><img src={logo}></img></Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              {dashboard}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">Orders</Link>
            </li>
            <li className="nav-item">
              {menu}
            </li>
            {events}
            {registeredEvents}
          </ul>
            
          <ul className="navbar-nav mx-auto">
            <Link className="nav-link" to="/restaurants/search">Search</Link>
          </ul>
          
          <ul className="navbar-nav ml-auto">
            {cart}
            <li className="nav-item">
              {navLogin}
            </li>
          </ul>
        </nav>
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

      rid: state.restProfile.rid,
      remail: state.restProfile.remail,
      rpassword: state.restProfile.rpassword,
      rname: state.restProfile.rname,
      rphone: state.restProfile.rphone,
      rabout: state.restProfile.rabout,
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
    logout: () => dispatch(logout())
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

//export default Navbar;