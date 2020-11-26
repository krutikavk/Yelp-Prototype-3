
import React, { Component } from 'react';
import '../../App.css';
//import { OrderListingsProvider, OrderListingsConsumer } from '../../_context/orderListingsProvider';
import {OrderListingsConsumer, OrderListingsProvider} from '../../_context/orderListingsProvider';
//import  from '../../_context/orderListingsProvider';
import Order from './order';
import Filter from '../Filter/orderfilter';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, login, logout} from '../../_actions';
import Navbar from '../Navbar/navbar';

class OrdersDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ooption: ''
    }
  }

  render() {
    let redirectVar = null;
    let id = '';
    let type = '';

    if(this.props.isLogged === false) {
      //customer login
      redirectVar = <Redirect to="/login"/>
    } else {
      if(this.props.whoIsLogged === false) {
        //customer login
        id = this.props.cid
        type = 'customers'
      } else{
        id = this.props.rid
        type = 'restaurants'
      }
    }

    return (

      <div>
        <Navbar/>
        <div>
          {redirectVar}
          <div className="container">
            <OrderListingsProvider id = {id} type = {type} >
              <OrderListingsConsumer>
                {function(value) {
                  const { orderListings, updateFilter } = value
                  return (
                    
                    <div>
                      <Filter updateFilter={updateFilter}/>
                      <ul>
                        {orderListings.map(listing => (
                          <Order order = {listing}/>
                        ))}
                      </ul>
                    </div>
                    
                  )
                }}
              </OrderListingsConsumer>
            </OrderListingsProvider >
          </div>
        </div>
      </div>

    )

  }
}



const mapStateToProps = (state) => {
    return {
      cid: state.custProfile.cid,
      rid: state.restProfile.rid,
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

export default connect(mapStateToProps, mapDispatchToProps)(OrdersDisplay);
