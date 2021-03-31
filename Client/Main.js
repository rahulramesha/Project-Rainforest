import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import configureStore from './store/store'

import App from './components/App'

import './Main.scss'

const store = configureStore(window.INITIAL_STATE)

function render(Component) {
    ReactDOM.hydrate(
      <Provider store={store}>
        <AppContainer>
          <Component />
        </AppContainer>
      </Provider>,
      document.getElementById("react-root")
    )
}

render(App)

if (module.hot) {
  module.hot.accept("./components/App.js", () => {
    const NewApp = require("./components/App.js").default
    render(NewApp)
  })
}