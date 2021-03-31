import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Switch } from 'react-router'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from "webpack-flush-chunks"

import configureStore from '../store/store'
import { StaticRoutes } from '../Routes'
import { AppBar } from '../components/common/AppBar'

import fetchData from './dataFetcher'

export default ({ clientStats }) => (req, res) => {

  const store = configureStore()

  const context = { site: req.hostname.split(".")[0] }

  const app = () =>
    renderToString(
      <Provider store={store}>
        <StaticRouter location={req.originalUrl} context={context}>
          <AppBar />
          <Switch>
            <StaticRoutes />
          </Switch>
        </StaticRouter>
      </Provider>
    )

  const template = () => {
    const appOutput = app()
    const names = flushChunkNames()
    const { js, styles, cssHash } = flushChunks(clientStats, {
      chunkNames: names
    })

    return `
      <!DOCTYPE html>
      <html lang='en'>
        <head>
          <meta name='viewport' content='width=device-width, initial-scale=1'>
          <meta name='description' content='This is a demo apllication'>
          ${styles}
        </head>
        <body style='margin: 0px'>
          <div id="react-root">${appOutput}</div>
          ${js}
          <script>
            window.INITIAL_STATE = ${JSON.stringify(store.getState())}
          </script>
          ${cssHash}
        </body>
      </html>
    `
  }
  
  fetchData(store, req, () => {
    res.send(template())
  })
  
}