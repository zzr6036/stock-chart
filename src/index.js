import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import * as serviceWorker from './serviceWorker'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
// import { ThemeProvider } from 'styled-components'
// import baseTheme from './themes/bookmyshow'
import allReducer from './reducers/index'
import 'antd/dist/antd.css';
// import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  allReducer,
  applyMiddleware(thunkMiddleware)
)

ReactDOM.render(
  <Provider store={store}>
    {/* <ThemeProvider theme={baseTheme}> */}
    <App />
    {/* </ThemeProvider> */}
  </Provider>,
  document.getElementById('root')
)
