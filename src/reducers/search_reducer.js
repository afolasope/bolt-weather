import {
  GET_SEARCH_BEGIN,
  GET_SEARCH_ERROR,
  GET_SEARCH_INVALID,
  GET_SEARCH_SUCCESS,
  EMPTY_SEARCH,
} from '../actions';

export const search_reducer = (state, action) => {
  if (action.type === GET_SEARCH_BEGIN) {
    return { ...state, isLoading: true, isInvalid: false };
  }
  if (action.type === GET_SEARCH_ERROR) {
    return { ...state, isLoading: false, error: true };
  }
  if (action.type === GET_SEARCH_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      search_result: action.payload,
      isInvalid: false,
    };
  }
  if (action.type === GET_SEARCH_INVALID) {
    return { ...state, isInvalid: true, isLoading: false };
  }
  if (action.type === EMPTY_SEARCH) {
    return { ...state, search_result: {}, isInvalid: false };
  }

  return state;
};

export default search_reducer;
