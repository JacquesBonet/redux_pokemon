import * as TYPES from '../constants'

let textToSearch = ''
let lastAction = null

export const searchMiddleware = store => next => action => {
   switch (action.type) {
      case TYPES.SEARCH:
         textToSearch = action.payload.search
         store.dispatch({
            ...lastAction,
            search: textToSearch,
         })
         break
      case TYPES.READ:
         lastAction = action
         if (textToSearch) action = { ...action, search: textToSearch }
         break
      default:
         break
   }
   return next(action)
}
