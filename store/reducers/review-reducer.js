const initialState = {
  data: [],
  error: null,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_REVIEWS":
      return {
        ...state,
        data: action.payload,
        error: null,
      };

    case "UPDATE_REVIEWS":
      return {
        data: [...state.data, action.payload],
        error: null,
      };

    case "SET_REVIEWS_ERROR":
      return {
        ...state,
        data: [],
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reviewReducer;
