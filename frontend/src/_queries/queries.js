import { gql } from 'apollo-boost';

export const getCustomerQuery = gql `
  {
    customer{
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
`;

export const getCustomersQuery = gql `
  {
    customer{
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
`;

export const getRestaurantQuery = gql `
  {
    restaurant {
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
`;

export const getRestaurantsQuery = gql`
  {
    restaurants {
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
