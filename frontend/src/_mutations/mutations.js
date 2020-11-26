import { gql } from 'apollo-boost';

const addCustomerMutation = gql`
  mutation ($cname: String, $cemail: String, $cpassword: String){
      addCustomer(cname: $cname, cemail: $cemail, cpassword: $cpassword){
          id
          cname
          cemail
          cpassword
      }
  }
`;

const addRestaurantMutation = gql`
  mutation ($rname: String, $remail: String, $rpassword: String){
    addCustomer(rname: $rname, remail: $remail, rpassword: $rpassword){
      id
      rname
      remail
      rpassword
    }
  }
`;

export {addCustomerMutation, addRestaurantMutation};