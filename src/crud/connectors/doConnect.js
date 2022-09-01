import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { read, readId } from '../actions'
import * as actions from '../actions'

export const doConnect = schema => {
   return connect(
      (state, { path, id, type }) => {
         return !id
            ? { docs: state[path].payload, schema, next: state[path].next, isLoading: state[path].isLoading, type }
            : {
                 doc: state[path].payload.find(elem => elem.name === id || elem.id === id),
                 schema,
                 next: null,
                 isLoading: state[path].isLoading,
                 type,
              }
      },
      (dispatch, { path, id }) => {
         !id ? dispatch(read(path)) : dispatch(readId(path, id))
         return bindActionCreators(actions, dispatch)
      }
   )
}
