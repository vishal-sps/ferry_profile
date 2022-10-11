import {
  fetchUserChefReviews,
  addUserChefReviews,
} from "../../services/review-api/user";

export const fetchReviews = (payload) => async (dispatch) => {
  try {
    const response = await fetchUserChefReviews(payload);
    dispatch({ type: "SET_REVIEWS", payload: response });
  } catch (err) {
    dispatch({ type: "SET_REVIEWS_ERROR", payload: err.message });
    console.log(err);
  }
};

export const addReview = (payload) => async (dispatch) => {
  try {
    const { rate_chef: rating, ...rest } = payload;
    dispatch({ type: "UPDATE_REVIEWS", payload: { ...rest, rating } });
    await addUserChefReviews(payload);
  } catch (err) {
    console.log(err);
  }
};
