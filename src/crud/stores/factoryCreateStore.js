import { applyMiddleware, createStore } from 'redux'
import { fetchMiddleware, searchMiddleware } from '../middlewares'
import { factoryCombineReducers } from '../reducers'

export const factoryCreateStore = paths =>
   createStore(factoryCombineReducers(paths), applyMiddleware(searchMiddleware, fetchMiddleware))
