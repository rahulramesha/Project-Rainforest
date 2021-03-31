import { createStore, applyMiddleware, compose } from 'redux'
import AppReducer from './reducers/AppReducer'
import thunk from 'redux-thunk'

const composer =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose

const enhancer = composer(applyMiddleware(thunk))

export default initialState => createStore(AppReducer, initialState, enhancer)
