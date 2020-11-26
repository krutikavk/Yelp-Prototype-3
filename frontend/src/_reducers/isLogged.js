const initialLoggedInState = {
	isLoggedIn : false
}

const loggedReducer = (state = initialLoggedInState, action) => {
  // eslint-disable-next-line default-case
  switch(action.type) {
	case 'SIGN_IN':
	  return {isLoggedIn: true};
	case 'SIGN_OUT':
	  return {isLoggedIn: false};
	default:
	  return state;  

  }
}

export default loggedReducer;