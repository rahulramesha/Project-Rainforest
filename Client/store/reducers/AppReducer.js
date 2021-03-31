import { combineReducers } from 'redux'

import itemReducer from './item/reducer'
import customerReducer from './customer/reducer'
import errorReducer from './error/reducer'

export default combineReducers({
    item: itemReducer,
    customer: customerReducer,
    error: errorReducer
})