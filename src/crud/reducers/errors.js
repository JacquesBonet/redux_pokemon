/**
 * The base reducer
 *
 * @param {object} state          the reducer state
 * @param {object} action         the redux action
 * @returns {*}
 */
export default function docs(state = {}, action) {
   if (action && action.type && action.type.indexOf('_ERROR') > 0) {
      return action.payload
   }
   return state
}
