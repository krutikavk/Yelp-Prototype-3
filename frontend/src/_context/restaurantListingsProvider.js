import * as React from 'react';
import axios from 'axios';
import { graphql, compose, withApollo } from 'react-apollo';
import composeLodash from 'lodash.flowright';
import { getRestaurantsQuery, getRestaurantsByCuisineQuery, getRestaurantsByDeliveryQuery } from '../_queries/queries';

const DefaultState = {
  restaurantListings: [],
  filter: {}
}

class RestaurantListingsProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurantListings: [],
      filter: {}
    }
  }

  async getAllRestaurants() {
    const response = await this.props.client.query({
      query: getRestaurantsQuery,
    });
    const { status, entity } = response.data.restaurants;
    if (status === 200) {     
      let locations = [];
      entity.forEach(item => {
        let location = {
          name: item.rname,
          lat: item.rlatitude,
          lng: item.rlongitude
        }
        locations.push(location)
      });

      let pins = {
        restaurants: locations
      }
      this.setState({ 
        restaurantListings: entity, 
      }) 
    }
    return;
  }

  async getRestaurantByCuisine(cuisine) {
    const response = await this.props.client.query({
      query: getRestaurantsByCuisineQuery,
      variables: { rcuisine: cuisine}
    });
    const { status, entity } = response.data.getRestaurantsByCuisine;
    if (status === 200) {     
      let locations = [];
      entity.forEach(item => {
        let location = {
          name: item.rname,
          lat: item.rlatitude,
          lng: item.rlongitude
        }
        locations.push(location)
      });

      let pins = {
        restaurants: locations
      }
      this.setState({ 
        restaurantListings: entity, 
      }) 
    }
    return;
  }

  async getRestaurantByDtype(delivery) {
    const response = await this.props.client.query({
      query: getRestaurantsByDeliveryQuery,
      variables: { rdelivery: delivery }
    });
    const { status, entity } = response.data.getRestaurantsByDelivery;
    if (status === 200) {     
      let locations = [];
      entity.forEach(item => {
        let location = {
          name: item.rname,
          lat: item.rlatitude,
          lng: item.rlongitude
        }
        locations.push(location)
      });

      let pins = {
        restaurants: locations
      }
      this.setState({ 
        restaurantListings: entity, 
      }) 
    }
    return;
  }

  getRestaurantByDname(dname) {
    let url = 'http://localhost:3001/restaurants/search/dish';
    const data = {
      dname : dname,
    }

    console.log("delivery data sent", data)

    axios.post(url, data)
      .then(response => {

        if(response.status === 200){
          let rid = [...response.data]
          console.log("Recieved rids: ", response.data)
           console.log("Read rids: ", rid)
          let promiseArray = rid.map(dataarr => axios.get('http://localhost:3001/restaurants/' + dataarr.rid));
          Promise.all( promiseArray )
          .then(
            results => {
              let restaurants = results.filter(entry => 
                entry.status === 200
              )

              if(restaurants.length > 0) {
                let restArr = [];
                let locations = []
                console.log("restaurants returned: ", restaurants)
                restaurants.forEach(rest => {
                  //rest.data[0] will have each restaurant
                  restArr.push(rest.data[0]);
                  let location = {
                    name: rest.data[0].rname,
                    lat: rest.data[0].rlatitude,
                    lng: rest.data[0].rlongitude
                  }
                  locations.push(location)

                })

                let pins = {
                  restaurants: locations
                }

                restArr = restArr.sort((a, b) => 
                  Math.sqrt(
                    ((a.rlatitude-this.props.searchLat)*(a.rlatitude-this.props.searchLat)) +
                    ((a.rlongitude-this.props.searchLng)*(a.rlongitude-this.props.searchLng))
                  ) <
                  Math.sqrt(
                    ((b.rlatitude-this.props.searchLat)*(b.rlatitude-this.props.searchLat)) +
                    ((b.rlongitude-this.props.searchLng)*(b.rlongitude-this.props.searchLng))
                  ) ? -1 : 1
                )

                this.setState({ 
                  restaurantListings: [...restArr], 
                })

              }
            }
          )
          .catch(console.log) 

        }
      }).catch(err =>{
          console.log("No response")
    });

    return;
  }


  componentDidMount() {

    console.log("RestaurantListingsProvider props: ", this.props)

    //Props coming from searchrest -> searchRestResults ->here
    /* original
      this.state = {
        searchBy: '',
        x searchStates: ['Location', 'Cuisine', 'Delivery Type', 'Dish Name'],
        searchTxt: '',
        searchAddress : '',
        searchLat: 0.0,
        searchLng: 0.0,
        cuisineType: '',
        x cuisineStates: ['Mexican', 'Italian', 'French', 'Indian', 'Continental', 'Dessert', 'Pan Asian', 'Patisserie', 'Fusion'],
        deliveryType: '',
        x deliveryStates: ['Curbside pickup', 'Yelp Delivery', 'Dine In'],
        searchStarted: false                        
      };
    */
    

    if(this.props.searchBy === 'Cuisine' && this.props.cuisineType !== '') {
      console.log("Search by cuisine: ", this.props.cuisineType)
      this.getRestaurantByCuisine(this.props.cuisineType);
    } else if(this.props.searchBy === 'Delivery Type' && this.props.deliveryType !== ''){
      this.getRestaurantByDtype(this.props.deliveryType);
    } else if (this.props.searchBy === 'Dish Name' && this.props.searchTxt !== '') {
      this.getRestaurantByDname(this.props.searchTxt)
    } else {
      console.log('hit get all restaurants')
      this.getAllRestaurants();
    }

    
    let temp = this.state.restaurantListings
    console.log("State: ", this.state.restaurantListings)
    console.log("temp before", temp)
    temp = temp.sort((a, b) => 
      Math.sqrt(
        ((a.rlatitude-this.props.searchLat)*(a.rlatitude-this.props.searchLat)) +
        ((a.rlongitude-this.props.searchLng)*(a.rlongitude-this.props.searchLng))
      ) <
      Math.sqrt(
        ((b.rlatitude-this.props.searchLat)*(b.rlatitude-this.props.searchLat)) +
        ((b.rlongitude-this.props.searchLng)*(b.rlongitude-this.props.searchLng))
      ) ? -1 : 1
    )
    console.log("temp after", temp)

    this.setState({
      restaurantListings: temp
    })
    
    
  }


  updateFilter = filter => {
    this.setState({
      filter: filter
    })
  }



  static applyFilter(restaurants, filter) {
    const displayRestaurant = filter
    let result = restaurants

    
    if (displayRestaurant && displayRestaurant.method && displayRestaurant.method  !== 'All') {
       result = result.filter(item => item.rdelivery === displayRestaurant.method)
    }

    if (displayRestaurant && displayRestaurant.nbrLatitude && displayRestaurant.nbrLongitude) {
    //formula is SQRT of (a1Lat-nbr1Lat)(a1Lat-nbr1LAt) + (a1long-nb1long)(a1long-b1long)
      /*
      ((a.rlatitude-displayRestaurant.nbrLatitude)*(a.rlatitude-displayRestaurant.nbrLatitude) + (a.longitude-displayRestaurant.nbrLongitude)*(a.longitude-displayRestaurant.nbrLongitude)) -
                                            ((b.rlatitude-displayRestaurant.nbrLatitude)*(b.rlatitude-displayRestaurant.nbrLatitude) + (b.longitude-displayRestaurant.nbrLongitude)*(b.longitude-displayRestaurant.nbrLongitude))
      */

      result = result.sort((a, b) => 
        Math.sqrt(
          ((a.rlatitude-displayRestaurant.nbrLatitude)*(a.rlatitude-displayRestaurant.nbrLatitude)) +
          ((a.rlongitude-displayRestaurant.nbrLongitude)*(a.rlongitude-displayRestaurant.nbrLongitude))
        ) <
        Math.sqrt(
          ((b.rlatitude-displayRestaurant.nbrLatitude)*(b.rlatitude-displayRestaurant.nbrLatitude)) +
          ((b.rlongitude-displayRestaurant.nbrLongitude)*(b.rlongitude-displayRestaurant.nbrLongitude))
        ) ? -1 : 1
      );
    } 
    return result;
  }


  render() {
    const { children } = this.props
    const { restaurantListings, filter } = this.state
    let filteredListings = RestaurantListingsProvider.applyFilter(restaurantListings, filter)
    return (
      <RestaurantListingsContext.Provider
        value={{
          restaurantListings: filteredListings,
          updateFilter: this.updateFilter
        }} 
      >
        {children}
      </RestaurantListingsContext.Provider>
    )
  }
}

const RestaurantListingsContext = React.createContext(DefaultState)
export default withApollo(RestaurantListingsProvider);
export const RestaurantListingsConsumer = RestaurantListingsContext.Consumer
