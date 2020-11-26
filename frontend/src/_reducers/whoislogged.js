const initialWhoIsLogged = {
  //false: customer, true: restaurant
  whoIsLoggedIn : false
}

const whoIsLoggedReducer = (state = initialWhoIsLogged, action) => {
  // eslint-disable-next-line default-case
  switch(action.type) {
  case 'CUSTOMER':
    return {whoIsLoggedIn: false};
  case 'RESTAURANT':
    return {whoIsLoggedIn: true};
  default:
    return state;  

  }
}

export default whoIsLoggedReducer;