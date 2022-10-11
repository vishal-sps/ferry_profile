import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTimePicker } from "@material-ui/pickers";
import styled from "styled-components";

import useDebounce from "../../../../custom-hooks/use-debounce";
import { fetchCities } from "../../../../services/chef-api";
import ChDropdown from "../../../base/ch-dropdown";
import { transformCities } from "../../../../utils/transformers/chef";

function SearchBar() {
  // state
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [date, setDate] = useState(null);

  // hooks
  const debouncedValue = useDebounce(searchValue);
  const dispatch = useDispatch();
  const searchPayload = useSelector((state) => state.searchPayload);

  useEffect(() => {
    setSearchValue(searchPayload.city.name);
    setSelectedCity(searchPayload.city);
    setDate(searchPayload.date);
  }, [searchPayload]);

  useEffect(() => {
    fetchCities({ name: debouncedValue })
      .then((res) => {
        setLoading(false);
        setCities(transformCities(res));
      })
      .catch((err) => console.log(err));
  }, [debouncedValue]);

  const handleSearch = () => {
    const payload = {
      city: selectedCity,
      date,
      type:"regular-search"
    };
    localStorage.setItem('search', JSON.stringify(payload))
    dispatch({ type: "SET_SEARCH_PAYLOAD", payload });
  };

  return (
    <div
      className="hidden md:flex items-center ml-16 rounded px-4 py-2"
      style={{ border: "1px solid #eee" }}
    >
      <div
        className="flex flex-col w-44 pr-4"
        style={{ borderRight: "1px solid #eee" }}
      >
        <span className="text-xs text-gray-400 mb-1.5">City</span>

        <ChDropdown
          show={searchValue}
          loading={loading}
          options={cities.map((city) => ({
            ...city,
            name: `${city.name}, ${city.stateCode}`,
          }))}
          handleOnClick={(selected) => {
            setSearchValue(selected.name);
            setSelectedCity(selected);
          }}
        >
          <input
            className="text-sm"
            placeholder="Enter City"
            value={searchValue}
            onChange={({ target }) => {
              if (target.value) {
                setLoading(true);
              } else {
                setLoading(false);
                setSelectedCity({ name: "", id: "" });
              }
              setSearchValue(target.value);
            }}
          />
        </ChDropdown>
      </div>

      <div
        className="flex flex-col ml-5 w-44"
        style={{ borderRight: "1px solid #eee" }}
      >
        <span className="text-xs text-gray-400 mb-1.5">Date & Time</span>

        <StyledDatePicker
          className="text-sm focus:outline-none appearance-none"
          value={date}
          placeholder="Enter Date / Time"
          onChange={(event) => setDate(event)}
        />
      </div>

      <div className="pl-4">
        <button
          className="flex items-center justify-center bg-red-500 text-white w-6 h-6 rounded-full"
          onClick={handleSearch}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

const StyledDatePicker = styled(DateTimePicker)`
  /* default */
  .MuiInput-underline:before {
    border-bottom: none;
  }
  /* hover (double-ampersand needed for specificity reasons. */
  && .MuiInput-underline:hover:before {
    border-bottom: none;
  }
  /* focused */
  .MuiInput-underline:after {
    border-bottom: none;
  }

  .MuiInputBase-input {
    padding: unset;
  }

  .MuiInputBase-root {
    font-size: unset;
    font-family: inherit;
  }
`;

export default SearchBar;
