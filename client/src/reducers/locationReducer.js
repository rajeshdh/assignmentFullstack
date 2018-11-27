import {FETCH_LOCATIONS} from '../actions/types';

const initialState = {
  locations: {},
  isLoading: true,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS:
      return {
        ...state,
        isLoading: false,
        locations: action.payload.locations
      };
    default:
      return state;
  }
}