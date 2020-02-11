const cartItems = (state = {cart:[], alert: {}, user: {}, factura: false}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.payload};
        case 'RESET':
            return {...state, cart:[], alert: {}};
    }
    return state;
}

export default cartItems;