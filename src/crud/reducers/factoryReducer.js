import crudReducer from './docs'

const initialState = {
   isLoading: false,
   payload: [],
}

export const factoryReducer =
   path =>
   (state = initialState, action) =>
      crudReducer(state, [path], action)
