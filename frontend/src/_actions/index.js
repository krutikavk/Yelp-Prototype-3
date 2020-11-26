

export const login = () => {
	return {
    type : 'SIGN_IN'
	} ;
}

export const logout = () => {
	return {
    type : 'SIGN_OUT'
	} ;
}

export const customerLogin = () => {
	return {
    type : 'CUSTOMER'
	} ;
}

export const restaurantLogin = () => {
	return {
		type: 'RESTAURANT'
	}
}

//incoming field, data ==> infield, payload
export const update = (infield, payload) => {
	//console.log(infield)
	//console.log(payload)
	return {
		type  : 'UPDATE',
		field : infield,
		payload: payload
	}
}

export const updateCart = (infield, payload) => {
	//console.log(infield)
	//console.log(payload)
	return {
		type: 'UPDATECART',
		field: infield,
		payload: payload
	}
}