export default function fetchItemReducer(state= {}, action) {
    switch(action.type) {
        case 'SET_CUSTOMER':
            return {
                ...state,
                customerData: action.payload,
                isLoggedIn: true
            }
        case 'CUSTOMER_NOT_LOGGED_IN':

            const {customerData, ...others} = state

            return {
                ...others,
                isLoggedIn: false
            }
        default: 
            return state
    }

}