import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import { store } from './store'


render(
    <Provider store={store}>
        <div className="app">
            <App />
        </div>
    </Provider>,
document.getElementById('app'))
