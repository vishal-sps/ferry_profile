import { fetchUserChefProfile } from "../../services/chef-api";

export const fetchChef = (payload) => async (dispatch) => {
  try {
    const response = await fetchUserChefProfile(payload);
    dispatch({ type: "SET_CHEF", payload: response });
    return Promise.resolve(response);
  } catch (err) {
    dispatch({ type: "SET_CHEF_ERROR", payload: err.message });
    console.log(err);
  }
};
