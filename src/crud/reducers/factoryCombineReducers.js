import { combineReducers } from 'redux'
import { factoryReducer } from './factoryReducer'
import errors from '../reducers/errors'

export const factoryCombineReducers = paths =>
   combineReducers(paths.reduce((acc, path) => ({ ...acc, [path]: factoryReducer(path) }), { errors }))
