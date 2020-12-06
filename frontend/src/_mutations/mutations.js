import { gql } from 'apollo-boost';

export const addCustomerMutation = gql`
  mutation ($cname: String, $cemail: String, $cpassword: String){
    addCustomer(cname: $cname, cemail: $cemail, cpassword: $cpassword){
      status
      entity {
        id
        cname
        cemail
        cpassword
        cjoined
      }
    }
  }
`;

export const addRestaurantMutation = gql`
  mutation ($rname: String, $remail: String, $rpassword: String){
    addRestaurant(rname: $rname, remail: $remail, rpassword: $rpassword){
      status
      entity {
        id
        rname
        remail
        rpassword
      }
    }
  }
`;

export const customerLoginMutation = gql`
  mutation($cemail: String, $cpassword: String) {
    loginCustomer(cemail: $cemail, cpassword: $cpassword) {
      status
      entity {
        id
        cname
        cemail
        cpassword
      }
    }
  }
`;

export const restaurantLoginMutation = gql`
  mutation ($remail: String, $rpassword: String){
    loginRestaurant(remail: $remail, rpassword: $rpassword){
      status
      entity {
        id
        rname
        remail
        rpassword
      }
    }
  }
`;

export const updateRestaurantInfoMutation = gql`
  mutation (
    $rid: ID,
    $rphone: String,
    $rabout: String,
    $rcuisine: String,
    $rdelivery: String,
  ) {
    updateRestaurantInfo(
      rid: $rid,
      rphone: $rphone,
      rabout: $rabout,
      rcuisine: $rcuisine,
      rdelivery: $rdelivery,
    ) {
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
      }
    }
  }
`;

export const updateRestaurantLocationMutation = gql`
  mutation (
    $rid: ID,
    $rlatitude: Float,
    $rlongitude: Float,
    $raddress: String,
  ) {
    updateRestaurantLocation(
      rid: $rid,
      rlatitude: $rlatitude,
      rlongitude: $rlongitude,
      raddress: $raddress,
    ) {
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
      }
    }
  }
`;
