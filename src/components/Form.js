import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { useSearchFormContext } from '../context/search_context';

const Form = () => {
  const { setQuery, search_result, isLoading, isInvalid, clearSearch } =
    useSearchFormContext();

  const updateQuery = (e) => {
    setQuery(e?.target?.value);
  };
  const debounceQuery = debounce(updateQuery, 1000);

  const inputRef = useRef();

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="input-field"
        type="text"
        placeholder="Search your favorite cities"
        onChange={debounceQuery}
        ref={inputRef}
      />

      {search_result && (
        <>
          <ul className="links-container">
            {isLoading ? <li>loading...</li> : null}
            {isInvalid ? <li>no matching city</li> : null}
            {search_result.results
              ? search_result.results.map(({ id, name, country }) => {
                  return (
                    <li
                      key={id}
                      onClick={() => {
                        clearSearch();
                        setQuery('');
                        inputRef.current.value = '';
                      }}
                    >
                      {
                        <Link to={`./details/${id}`}>
                          {name}, {country}
                        </Link>
                      }
                    </li>
                  );
                })
              : null}
          </ul>
        </>
      )}
    </form>
  );
};

export default Form;
