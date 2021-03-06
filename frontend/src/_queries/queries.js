import { gql } from 'apollo-boost';

export const getCustomerQuery = gql`
  {
    customer{
      status 
      entity {
        id
        cname
        cpassword
        cphone
        cabout
        cphone
        cphoto
        cfavrest
        cfavcuisine
      }
    }
  }
`;

export const getCustomersQuery = gql`
  {
    customer{
      status 
      entity {
        id
        cname
        cpassword
        cphone
        cabout
        cphone
        cphoto
        cfavrest
        cfavcuisine
      }
    }
  }
`;

export const getRestaurantQuery = gql`
  {
    restaurant {
      status
      entity {
        id
        rname
        remail
        rpassword
        rphone
        rabout
        rcuisine
        rdelivery
        raddress
        rlatitude
        rlongitude
        rdish
      }
    }
  }
`;

export const getRestaurantsQuery = gql`
  {
    restaurants {
      status
      entity {
        id
        rname
        remail
        rpassword
        rphone
        rabout
        rcuisine
        rdelivery
        raddress
        rlatitude
        rlongitude
        rdish
      }
    }
  }
`;

export const getDishesQuery = gql`
  query ( $rid: ID ) {
    dishes(
      rid: $rid,
    ) {
      status
      entity {
        id
        rid
        dname
        dingredients
        dcategory
        durl 
      }
    }
  }
`;

export const getRestaurantsByCuisineQuery = gql`
  query ( $rcuisine: String ) {
    getRestaurantsByCuisine ( rcuisine: $rcuisine ) {
      status
      entity {
        id
        rname
        remail
        rpassword
        rphone
        rabout
        rcuisine
        rdelivery
        raddress
        rlatitude
        rlongitude
        rdish
      }
    }
  }
`;

export const getRestaurantsByDeliveryQuery = gql`
  query ( $rdelivery: String ) {
    getRestaurantsByDelivery ( rdelivery: $rdelivery ) {
      status
      entity {
        id
        rname
        remail
        rpassword
        rphone
        rabout
        rcuisine
        rdelivery
        raddress
        rlatitude
        rlongitude
        rdish
      }
    }
  }
`;

export const ordersForCustomerQuery = gql`
  query ( $cid: ID ) {
    ordersForCustomer ( cid: $cid ) {
      status
      entity {
        id
        rid
        cid
        ooption
        ostatus
        otime
      }
    }
  }
`;

export const ordersForRestaurantQuery = gql`
  query ( $rid: ID ) {
    ordersForRestaurant ( rid: $rid ) {
      status
      entity {
        id
        rid
        cid
        ooption
        ostatus
        otime
      }
    }
  }
`;
