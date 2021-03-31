export default function fetchItemReducer(state= {}, action) {
    switch(action.type) {
        case 'GET_ITEM_SUCCESS':
            return {
                ...state,
                itemData: action.payload
            }
        case 'GET_ITEMS_FOR_HOME':
            return {
                ...state,
                itemsList: action.payload
            }
        default: 
            return state
    }

}