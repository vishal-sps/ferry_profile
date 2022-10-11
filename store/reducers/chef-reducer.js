const initialState = {
  data: {
    profilePic: "",
    description: "",
    chefCuisines: [],
    city: {},
    galleryImages: [],
  },
  error: null,
};

const chefReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CHEF":
      return {
        ...state,
        data: action.payload,
      };

    case "SET_CHEF_ERROR":
      return {
        ...state,
        data: initialState,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default chefReducer;
