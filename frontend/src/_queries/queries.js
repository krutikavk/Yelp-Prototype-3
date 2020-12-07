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

// export {getCustomerQuery, getCustomersQuery, getRestaurantQuery, getRestaurantsQuery};
