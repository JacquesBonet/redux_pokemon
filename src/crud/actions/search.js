import * as TYPES from '../constants/docs'

/**
 * Read REST resource identified by its path and id. L'uri is <path>/<id>
 *
 * @param {string} search    text to search
 */
export const search = search => ({
   type: TYPES.SEARCH,
   payload: {
      search,
   },
})
