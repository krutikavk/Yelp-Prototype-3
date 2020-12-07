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
        cname
        cphone
        cabout
        cjoined
        cphoto
        cfavrest
        cfavcuisine
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
        rdish 
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
        rdish 
      }
    }
  }
`;

export const addDishMutation = gql`
  mutation (
    $rid: ID,
    $rname: String,
    $dname: String,
    $dingredients: String,
    $dprice: Float,
    $dcategory: String,
    $durl: String,
  ) {
    addDish(
      rid: $rid,
      rname: $rname,
      dname: $dname,
      dingredients: $dingredients,
      dprice: $dprice,
      dcategory: $dcategory,
      durl: $durl,
    ) {
      status
      entity {
        id
        rname
        dname
        dingredients
        dcategory
        durl 
      }
    }
  }
`;

export const addOrderMutation = gql`
  mutation (
    $cid: ID,
    $rid: ID,
    $ooption: String,
  ) {
    addOrder(
      cid: $cid,
      rid: $rid,
      ooption: $ooption,
    ) {
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

export const addOrderDishMutation = gql`
  mutation (
    $oid: ID,
    $did: ID,
    $dname: String,
    $dprice: Float,
    $dquantity: Int,
  ) {
    addOrderDish(
      oid: $oid,
      did: $did,
      dname: $dname,
      dprice: $dprice,
      dquantity: $dquantity,
    ) {
      status
    }
  }
`;
