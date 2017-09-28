import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { createLogger } from 'redux-logger'
// Import the necessary methods for saving and loading
import { save, load } from "redux-localstorage-simple"

const DEBUG = process.env.NODE_ENV !== 'production'

export const store = createStore(
    rootReducer, load(),
    applyMiddleware(
    DEBUG ? createLogger() : () => next => action => next(action),
        save()
))
