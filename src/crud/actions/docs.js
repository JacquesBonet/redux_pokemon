import * as TYPES from '../constants/docs'

/**
 * Read a REST resource
 *
 * @param {string} path       l'URI de la ressource
 * @param {string} isLoading  Say if we want to display yourglass
 */
export const read = (path, isLoading = true) => ({ path, type: TYPES.READ, isLoading })

/**
 * Rest read success
 * This method is call by the system.
 *
 * @param {string} path             l'URI de la ressource
 * @param {object} payload          les données lus
 */
export const readSuccess = (path, payload) => {
   return {
      payload: payload.results,
      next: payload.next,
      previous: payload.previous,
      count: payload.count,
      path,
      type: TYPES.READ_SUCCESS,
      isLoading: false,
   }
}

/**
 * Read REST resource identified by its path and id. L'uri is <path>/<id>
 *
 * @param {string} path    uri de la ressource
 * @param {number} id      id de la ressource
 * @param {string} isLoading  Say if we want to display yourglass
 */
export const readId = (path, id = -1, isLoading = true) => ({
   path,
   id,
   type: TYPES.READ_ID,
   isLoading,
})

/**
 * Success de lecture de la ressource REST identifiée par l'uri <path>/<id>
 * Cette methode est appelé par le système. Elle n'a pas à etre appelée explicitement
 *
 * @param {string} path             l'URI de la ressource
 * @param {string} id               resource identifier
 * @param {object} payload          les données lus
 */
export const readIdSuccess = (path, id, payload) => ({
   payload,
   path,
   id,
   type: TYPES.READ_ID_SUCCESS,
   isLoading: false,
})

/**
 * Creation d'une ressource REST
 *
 * @param {string} path       uri de la ressource
 * @param {object} payload    données de la ressource
 * @param {string} isLoading  Say if we want to display yourglass
 */
export const create = (path, payload, isLoading = true) => ({
   payload,
   path,
   type: TYPES.CREATE,
   isLoading,
})

/**
 * Success d'ecriture de la ressource REST
 * Cette methode est appelé par le système. Elle n'a pas à etre appelée explicitement
 *
 * @param {string} path             l'URI de la ressource
 * @param {object} payload          les données lus
 */
export const createSuccess = (path, payload) => ({
   path,
   payload,
   type: TYPES.CREATE_SUCCESS,
   isLoading: false,
})

/**
 * Update d'une ressource REST
 *
 * @param {string} path       uri parent de la ressource
 * @param {object} payload    données de la ressource contenant l'id de la ressource
 */
export const update = (path, payload) => ({
   path,
   payload,
   type: TYPES.UPDATE,
   isLoading: true,
})

/**
 * Success de mise à jour de la ressource REST
 * Cette methode est appelé par le système. Elle n'a pas à etre appelée explicitement
 *
 * @param {string} path             l'URI de la ressource
 * @param {object} payload          les données lus
 */
export const updateSuccess = (path, payload) => ({
   path,
   payload,
   type: TYPES.UPDATE_SUCCESS,
   isLoading: false,
})

/**
 * Delete d'une ressource REST
 *
 * @param {string} path       uri parent de la ressource
 * @param {object} payload    données de la ressource contenant l'id de la ressource
 */
export const del = (path, payload) => ({
   path,
   payload,
   type: TYPES.DELETE,
   isLoading: true,
})

/**
 * Success du delete de la ressource REST
 * Cette methode est appelé par le système. Elle n'a pas à etre appelée explicitement
 *
 * @param {string} path             l'URI parent de la ressource
 * @param {object} payload          les données de la ressource
 */
export const delSuccess = (path, payload) => ({
   path,
   payload,
   type: TYPES.DELETE_SUCCESS,
   isLoading: false,
})

/**
 * Error returned by CRUD action
 *
 * @param type
 * @param path
 * @param payload
 */
export const crudError = (type, path, payload) => ({
   type,
   path,
   payload,
   isLoading: false,
})
