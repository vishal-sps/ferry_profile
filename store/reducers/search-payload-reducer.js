import { addDays, setHours, setMinutes } from "date-fns";

const initialState = {
  cuisine_category: 1,
  cuisineId: null,
  city: {
    id: "60d9717e0aeee56963e219a0",
    name: "San Fransisco",
  },
  date: setMinutes(setHours(addDays(new Date(), 1), 11), 0),
  name: {},
  type: "regular-search",
};

const searchPayloadReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_PAYLOAD": {
      return { ...state, ...action.payload };
    }

    case "SET_SEARCH_CUISINE_ID":
      return {
        ...state,
        cuisineId: action.payload,
        type: "cuisine-search",
      };

      case "SET_SEARCH_TRENDING_CHEF":{
          return {
            ...state,
            type: "trending-chef",
            date: null,
            city: {
              id: "60d9717e0aeee56963e219a0",
              name: "San Fransisco",
            },
          }
        }

    default:
      return { ...state };
  }
};

export default searchPayloadReducer;
