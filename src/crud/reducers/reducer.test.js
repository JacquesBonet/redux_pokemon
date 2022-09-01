import { createSuccess, delSuccess, updateSuccess } from '../actions/docs'
import { factoryReducer } from './factoryReducer'

describe('reducer', function () {
   describe('initial state', function () {
      let initialState

      beforeEach(function () {
         initialState = factoryReducer('pokemon')(undefined, {})
      })

      it('should have an empty users array', function () {
         expect(initialState).toEqual({ isLoading: false, payload: [] })
      })
   })

   describe('CRUD actions', function () {
      let state = { isLoading: false, payload: [] }
      const user = { id: 1, nom: 'Bonet', prenom: 'Jacques' }
      let reducer = null

      beforeAll(function () {
         reducer = factoryReducer('pokemon')
      })

      it('adds the user to the store', function () {
         const action = createSuccess('pokemon', user)
         const newState = reducer(state, action)
         expect(newState.payload[0]).toEqual(user)
      })

      it('update the user to the store', function () {
         const action = delSuccess('pokemon', { id: 1 })
         const newState = reducer(state, action)
         expect(newState.payload).toEqual([])
      })

      it('remove the user the store', function () {
         const action = updateSuccess('pokemon', { ...user, nom: 'Bonet2' })
         const newState = reducer(state, action)
         expect(newState.payload[0]).toEqual({ ...user, nom: 'Bonet2' })
      })
   })
})
