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

export const getRestaurantsQuery = gql `
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

// export {getCustomerQuery, getCustomersQuery, getRestaurantQuery, getRestaurantsQuery};