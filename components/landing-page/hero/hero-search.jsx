import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDays, setHours, setMinutes } from "date-fns";

import { useRouter } from "next/router";
import { DateTimePicker } from "@material-ui/pickers";
import styled, { keyframes } from "styled-components";

import ChSelectField from "../../base/ch-select-field";
import ChDropdown from "../../base/ch-dropdown";
import SearchIcon from "./search-icon.svg";

import {
  fetchCities,
  fetchDishesCuisinesAndChefs,
} from "../../../services/chef-api";

import useDebounce from "../../../custom-hooks/use-debounce";
import { transformCities } from "../../../utils/transformers/chef";

function HeroSearch() {
  const defaultOpenForBusinessDate = setMinutes(
    setHours(addDays(new Date(), 1), 11),
    0
  );

  // state
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDishesCuisinesAndChefs, setLoadingDishesCuisinesAndChefs] =
    useState(false);

  const [city, setCity] = useState("San Fransisco");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [dishCuisineAndChef, setDishCuisineAndChef] = useState("");
  const [allDishesCuisinesAndChefs, setAllDishesCuisinesAndChefs] = useState(
    []
  );
  const [selectedDishCuisineAndChef, setSelectedDishCuisineAndChef] = useState(
    {}
  );

  const [date, setDate] = useState(defaultOpenForBusinessDate);
  const [bookingType, setBookingType] = useState("1");

  // hooks
  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.geoLocation);
  const router = useRouter();
  const debouncedCity = useDebounce(city);
  const debouncedDishCuisineAndChef = useDebounce(dishCuisineAndChef);

  useEffect(() => {
    if (coordinates && Object.keys(coordinates).length) {
      fetchCities({ ...coordinates, limit: 1 })
        .then((res) => {
          if (Array.isArray(res)) {
            setCity("San Fransisco CA");
            setSelectedCity({
              id: "60d9717e0aeee56963e219a0",
              name: "San Fransisco CA",
            });
            return;
          }
          setCity(`${res.data[0].name} ${res.data[0].state_code}`);
          setSelectedCity(res.data[0]);
        })
        .catch((err) => console.log(err));
    }
    //////////////checking with else code ///////////
    else{
      setSelectedCity({
        id: "60d9717e0aeee56963e219a0",
        name: "San Fransisco CA",
      });
    }
  }, [coordinates]);

  useEffect(() => {
    if (debouncedCity) {
      fetchCities({ name: debouncedCity })
        .then((res) => {
          setCities(transformCities(res));
          setLoadingCities(false);
        })
        .catch((err) => console.log(err));
    }
  }, [debouncedCity]);

  useEffect(() => {
    fetchDishesCuisinesAndChefs({ name: debouncedDishCuisineAndChef })
      .then((res) => {
        setAllDishesCuisinesAndChefs(res);
        setLoadingDishesCuisinesAndChefs(false);
      })
      .catch((err) => console.log(err));
  }, [debouncedDishCuisineAndChef]);

  const handleSearch = () => {
    const searchPayload = {
      city: selectedCity,
      date,
      cuisine_category: bookingType || 1,
      name: selectedDishCuisineAndChef,
      type:"regular-search"
    };
    localStorage.setItem('search', JSON.stringify(searchPayload))
    dispatch({ type: "SET_SEARCH_PAYLOAD", payload: searchPayload });
    router.push("/chef/search");
  };

  return (
    <div className="relative flex flex-col">
      <div
        className="flex md:flex-row flex-col rounded-lg w-full"
        style={{ boxShadow: "0px 7px 64px rgba(0, 0, 0, 0.1)" }}
      >
        <div
          className="flex md:border-b-0 border-b md:w-6/12"
          style={{ height: 70 }}
        >
          <div className="w-6/12 flex flex-col justify-center border-r">
            <ChDropdown
              show={city ? true : false}
              loading={loadingCities}
              options={cities.map((city) => ({
                ...city,
                name: `${city.name} ${city.stateCode}`,
              }))}
              handleOnClick={(selected) => {
                setCity(selected.name);
                setSelectedCity(selected);
              }}
            >
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={({ target }) => {
                  setCity(target.value);
                  if (city) {
                    setLoadingCities(true);
                  } else {
                    setLoadingCities(false);
                  }
                }}
                className="md:text-base text-sm focus:outline-none appearance-none w-full h-full px-5"
              />
            </ChDropdown>
          </div>

          <div className="flex flex-col justify-center md:border-r px-5 w-6/12">
            <StyledDatePicker
              className="md:text-base text-sm focus:outline-none appearance-none"
              value={date}
              placeholder="Date / Time"
              onChange={(event) => setDate(event)}
            />
          </div>
        </div>

        <div
          className="flex flex-col justify-center md:border-b-0 border-b md:border-r md:w-2/12"
          style={{ height: 70 }}
        >
          <ChSelectField
            options={[
              { name: "Party", value: "1" },
              { name: "Meals", value: "2" },
            ]}
            value={bookingType}
            onChange={({ target }) => setBookingType(target.value)}
          />
        </div>

        <div style={{ height: 70 }}>
          <ChDropdown
            show={dishCuisineAndChef ? true : false}
            loading={loadingDishesCuisinesAndChefs}
            options={allDishesCuisinesAndChefs.map((item) => ({
              ...item,
              name: `${item.name} ${item.type}`,
            }))}
            handleOnClick={(selected) => {
              setDishCuisineAndChef(selected.name);
              setSelectedDishCuisineAndChef(selected);
            }}
          >
            <input
              type="search"
              placeholder="Search for Cuisine, Dishes, Chefs.."
              value={dishCuisineAndChef}
              onChange={({ target }) => {
                setDishCuisineAndChef(target.value);

                if (dishCuisineAndChef) {
                  setLoadingDishesCuisinesAndChefs(true);
                } else {
                  setLoadingDishesCuisinesAndChefs(false);
                }
              }}
              className="text-sm focus:outline-none pr-40 pl-3 h-full"
            />
          </ChDropdown>
        </div>
      </div>

      <button
        className="md:absolute md:top-2/4 md:right-2.5 md:transform md:-translate-y-2/4 flex items-center justify-center bg-black text-white py-4 px-8 font-medium md:mt-0 mt-4"
        style={{
          borderRadius: 8,
        }}
        onClick={handleSearch}
      >
        <SearchIcon
          className="mr-2 font-medium"
          style={{ width: 18, height: 18 }}
        />
        Search
      </button>
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
`;
const menu = keyframes`
    from {
      transform: translate3d(0, 30px, 0);
    }
    to {
      transform: translate3d(0, 20px, 0);
    }
  `;
const StyledSection = styled.div`
  border-radius: 5px;
  z-index: 2;
  margin-top: 0.25rem;
  position: absolute;
  top: 50px;
  max-height: 256px;
  overflow-y: auto;
  padding-left: 18px;
  padding-right: 18px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(45, 49, 66, 0.06), 0px 1px 3px rgba(8, 7, 8, 0.1);
  animation: ${menu} 0.3s ease forwards;
`;
const StyledList = styled.div`
  padding: 5px;
  &:hover {
    color: #ffffff;
    background: #e23744;
    cursor: pointer;
  }
`;

export default HeroSearch;
