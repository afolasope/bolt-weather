import React, { useContext, useEffect, useReducer, useState } from 'react';
import {
  GET_SEARCH_BEGIN,
  GET_SEARCH_ERROR,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_INVALID,
  EMPTY_SEARCH,
} from '../actions';
import { search_reducer as reducer } from '../reducers/search_reducer';

const SearchFormContext = React.createContext();
const SEARCH_FORM_API_ENDPOINT = `https://api.weatherstack.com/autocomplete?access_key=${process.env.REACT_APP_WEATHER_STACK_API_KEY}&query=`;

const initialState = {
  isLoading: false,
  error: false,
  isInvalid: false,
  search_result: {},
};
export const SearchFormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [query, setQuery] = useState('');

  const clearSearch = () => {
    dispatch({ type: EMPTY_SEARCH });
  };

  const getSearchAutocomplete = async () => {
    try {
      dispatch({ type: GET_SEARCH_BEGIN });
      const data = await fetch(`${SEARCH_FORM_API_ENDPOINT}${query}`);
      let response = await data.json();
      if (response && response.success === false) {
        dispatch({ type: GET_SEARCH_SUCCESS, payload: response });
        dispatch({ type: GET_SEARCH_INVALID });
      } else {
        let tempresult = response.results.map((item) => {
          return { ...item, id: `${item.name}, ${item.country}` };
        });
        response = { ...response, results: tempresult };

        dispatch({ type: GET_SEARCH_SUCCESS, payload: response });
      }
    } catch (error) {
      dispatch({ type: GET_SEARCH_ERROR });
    }
  };
  useEffect(() => {
    if (query) {
      getSearchAutocomplete();
    }
    if (!query) {
      clearSearch();
    }
  }, [query]);

  return (
    <SearchFormContext.Provider value={{ ...state, setQuery, clearSearch }}>
      {children}
    </SearchFormContext.Provider>
  );
};

export const useSearchFormContext = () => {
  return useContext(SearchFormContext);
};
