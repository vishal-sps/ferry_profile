const initialState = {};

const geoLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GEO_LOCATION": {
      return { ...state, ...action.payload };
    }

    default:
      return { ...state };
  }
};

export default geoLocationReducer;
