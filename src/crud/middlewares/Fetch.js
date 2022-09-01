import * as docActions from '../actions/docs'
import * as TYPES from '../constants/docs'
import { ROOT_PATH } from '../constants'

export const fetchMiddleware = store => next => action => {
   const returnValue = next(action)

   switch (action.type) {
      case TYPES.READ:
         readStart(store.dispatch, action.path, action.search)
         break
      case TYPES.READ_ID:
         readIdStart(store.dispatch, action.path, action.id)
         break
      case TYPES.CREATE:
         createStart(store.dispatch, action.path, action.payload)
         break
      case TYPES.DELETE:
         delStart(store.dispatch, action.path, action.payload)
         break
      case TYPES.UPDATE:
         updateStart(store.dispatch, action.path, action.payload)
         break
      default:
         break
   }
   return returnValue
}

function readStart(dispatch, path, search) {
   return rawFetchPromise(search ? `${path}?q=${search}` : path)
      .then(result => {
         if (isError(result)) dispatch(docActions.crudError(TYPES.READ_ERROR, path, result))
         else {
            result.results = result.results.map(item => (item.id ? item : { ...item, id: item.name }))
            dispatch(docActions.readSuccess(path, result))
            // check if lazy data
            if (result.results.length && result.results[0].url) {
               result.results.map(item => dispatch(docActions.readId(path, item.id)))
            }
         }
      })
      .catch(err => {
         dispatch(docActions.crudError(TYPES.READ_ERROR, path, err))
      })
}

function readIdStart(dispatch, path, id) {
   return rawFetchPromise(`${path}/${id}`)
      .then(result => {
         if (isError(result)) dispatch(docActions.crudError(TYPES.READ_ID_ERROR, path, result))
         else {
            dispatch(docActions.readIdSuccess(path, result.id, result))
         }
      })
      .catch(err => {
         dispatch(docActions.crudError(TYPES.READ_ID_ERROR, path, err))
      })
}

function createStart(dispatch, path, doc) {
   return rawFetchPromise(path, 'post', doc)
      .then(result => {
         isError(result)
            ? dispatch(docActions.crudError(TYPES.CREATE_ERROR, path, result))
            : dispatch(docActions.createSuccess(path, { ...doc, ...result }))
      })
      .catch(err => {
         dispatch(docActions.crudError(TYPES.CREATE_ERROR, path, err))
      })
}

function updateStart(dispatch, path, aDoc) {
   return rawFetchPromise(`${path}/${aDoc.name}`, 'put', aDoc)
      .then(result => {
         isError(result)
            ? dispatch(docActions.crudError(TYPES.UPDATE_ERROR, path, result))
            : dispatch(docActions.updateSuccess(path, { ...aDoc, ...result }))
      })
      .catch(err => {
         dispatch(docActions.crudError(TYPES.UPDATE_ERROR, path, err))
      })
}

function delStart(dispatch, path, aDoc) {
   return rawFetchPromise(`${path}/${aDoc.name}`, 'delete', aDoc)
      .then(result => {
         isError(result)
            ? dispatch(docActions.crudError(TYPES.DELETE_ERROR, path, aDoc))
            : dispatch(docActions.delSuccess(path, aDoc))
      })
      .catch(err => {
         dispatch(docActions.crudError(TYPES.DELETE_ERROR, path, err))
      })
}

function parseJSON(response) {
   const contentType = response.headers.get('content-type')

   if (contentType && contentType.indexOf('application/json') !== -1) {
      return response.json()
   }
   return new Promise(resolve => resolve({ ok: response.ok, status: response.status, statusText: response.statusText }))
}

function checkSystemError(response) {
   if (response.status >= 200 && response.status < 300) {
      return response
   } else {
      throw response
   }
}

function isError({ Code = 0, code = 0, errors = [], status = 0 }) {
   return ((Code < 0 || code < 0) && Code !== '-3') || status >= 400 || errors.length > 0
}

function rawFetchPromise(url, method = 'GET', payload = undefined) {
   const fullPath = url.startsWith('https://') ? url : ROOT_PATH + url
   const opts = {
      method,
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
   }
   if (payload) {
      opts.body = JSON.stringify(payload)
   }

   return fetch(fullPath, opts).then(checkSystemError).then(parseJSON)
}
