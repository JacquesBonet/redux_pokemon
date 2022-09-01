import { CREATE_SUCCESS, DELETE_SUCCESS, READ_ID_SUCCESS, READ_SUCCESS, UPDATE_SUCCESS } from '../constants'
import { match } from '../utils/match'

/**
 * The base reducer
 *
 * @param {object} state          the reducer state
 * @param {string[]} paths           the rest resource(s) of the reducer.
 * @param {object} action         the redux action
 * @param {string| boolean} payloadName    the object identifier to read from the response
 * @returns {*}
 */
export default function docs(state, paths, action, payloadName = false) {
   if (!matchPaths(paths, action)) return state

   const { path } = action

   if (action.type.indexOf('_REQUEST') > 0)
      return { ...state, isLoading: action.isLoading, id: action.id ? action.id : '' }
   if (action.type.indexOf('_ERROR') > 0) return { ...state, isLoading: false }

   switch (action.type) {
      case READ_SUCCESS: {
         let payload = payloadName ? action.payload[payloadName] || action.payload : action.payload

         // la donnée n'est pas retourné par l'appel, on ne fait rien
         if (payload === null) return state

         return {
            next: action.next,
            count: action.count,
            type: action.type,
            path,
            isLoading: action.isLoading,
            payload: [...state.payload, ...payload],
         }
      }

      case READ_ID_SUCCESS:
      case CREATE_SUCCESS:
      case UPDATE_SUCCESS: {
         let payload = payloadName ? action.payload[payloadName] || action.payload : action.payload

         // la donnée n'est pas retourné par l'appel, on ne fait rien
         if (payload === null) return state

         if (state.payload instanceof Array) {
            // Pas d'id permettant d'identifier l'objet, on ne fait rien
            if (payload.id === undefined) return state

            let found = false
            const res = state.payload.map(doc => {
               if (payload.id && doc.id && doc.id === payload.id) {
                  found = true
                  return { ...doc, ...payload }
               }
               if (payload.name && doc.name && doc.name === payload.name) {
                  found = true
                  return { ...doc, ...payload }
               }
               return doc
            })
            if (found) {
               return {
                  next: state.next,
                  type: action.type,
                  path,
                  isLoading: action.isLoading,
                  payload: res,
               }
            }
            return {
               next: state.next,
               type: action.type,
               path,
               isLoading: action.isLoading,
               payload: [...state.payload, payload],
            }
         }
         return {
            next: state.next,
            type: action.type,
            isLoading: action.isLoading,
            path,
            payload: { ...state.payload, payload },
         }
      }

      case DELETE_SUCCESS: {
         if (state.payload instanceof Array) {
            const payload = payloadName ? action.payload[payloadName] : action.payload
            const res = state.payload.filter(doc => doc.id !== payload.id)
            return {
               next: state.next,
               type: action.type,
               isLoading: action.isLoading,
               path,
               payload: res,
            }
         }
         return {
            next: state.next,
            type: action.type,
            isLoading: action.isLoading,
            path,
            payload: {},
         }
      }

      default:
         return state
   }
}

const ROOT_PATH = 'https://pokeapi.co/api/v2/'

/**
 * Check if the path match with the action path
 *
 * @param {string[]} pathToMatch  the rest resource of the reducer
 * @param {string} path           the action path
 * @param {string} type           the action type
 * @returns {boolean}
 */
function matchPaths(pathToMatch, { path, type }) {
   if (path === undefined) return false
   const rootPath = path && path.startsWith(ROOT_PATH) ? path.substr(ROOT_PATH.length) : path
   for (let i = 0; i < pathToMatch.length; i++) if (match(pathToMatch[i], rootPath)) return true
   return false
}
