export default function fetchItemReducer(state= {}, action) {
    switch(action.type) {
        case 'SET_ERROR':
            return {
                ...state,
                errorData: action.payload
            }
        default: 
            const { errorData, ...others} = state
            return others
    }

}