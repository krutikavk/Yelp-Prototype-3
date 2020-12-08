import * as React from 'react';
import axios from 'axios';
import {update, login, logout} from '../_actions';
import {connect} from 'react-redux';
import { graphql, compose, withApollo } from 'react-apollo';
import composeLodash from 'lodash.flowright';
import { ordersForCustomerQuery, ordersForRestaurantQuery } from '../_queries/queries';

const DefaultState = {
  orderListings: [],
  filter: {}
}

const OrderListingsContext = React.createContext(DefaultState)

export class OrderListingsProvider extends React.Component {
  
  constructor(props){
    super(props)
    this.state = DefaultState

  }

  async componentWillMount() {
    if(this.props.type === 'customers') {
      const response = await this.props.client.query({
        query: ordersForCustomerQuery,
        variables: { cid: this.props.id}
      });
      const { status, entity } = response.data.ordersForCustomer;
      if (status === 200) {     
        this.setState({ 
            orderListings: response.data 
          })
          console.log("orderlistings", this.state.orderListings)
      } else {
        alert('Error fetching orders')
      }

    } else if(this.props.type === 'restaurants') {
      const response = await this.props.client.query({
        query: ordersForRestaurantQuery,
        variables: { rid: this.props.id}
      });
      const { status, entity } = response.data.ordersForRestaurant;
      if (status === 200) {     
        this.setState({ 
            orderListings: response.data 
          })
          console.log("orderlistings", this.state.orderListings)
      } else {
        alert('Error fetching orders')
      }
    }
  }

  updateFilter = filter => {
    this.setState({
      filter: filter
    })
  }


  static applyFilter(orders, filter) {
    const displayOrder = filter
    let result = orders
    console.log("Inside apply filter")
    console.log("orders", orders)
    
    if (displayOrder && displayOrder.ooption && displayOrder.ooption !== 'All') {
       result = result.filter(item => item.ooption === displayOrder.ooption)
    }

    if (displayOrder && displayOrder.ostatus && displayOrder.ostatus !== 'All') {
       result = result.filter(item => item.ostatus === displayOrder.ostatus)
    } 

    if (displayOrder && displayOrder.otype && displayOrder.otype !== 'All') {
       result = result.filter(item => item.otype === displayOrder.otype)
    }
    
    console.log(result)
    return result;
    
  }

  render() {
    let {children} = this.props
    console.log("children: ", this.props)
    const { orderListings, filter } = this.state
    console.log("updateFilter: ", filter)
    let filteredListings = OrderListingsProvider.applyFilter(orderListings, filter)
    return (
      <OrderListingsContext.Provider
        value={{
          orderListings: filteredListings,
          updateFilter: this.updateFilter
        }}
      >
      {children}
      </OrderListingsContext.Provider>
    )
  }
}


export default withApollo(OrderListingsProvider);
export const OrderListingsConsumer = OrderListingsContext.Consumer