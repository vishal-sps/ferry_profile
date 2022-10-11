import apiClient from "..";
import { IMAGE_URL } from "../../constants/enviroment-vars";

const transformCuisinesAndChefs = ({ data }) => {
  return data.map((item) => ({
    id: item._id,
    name: item.name,
    chefs: item.chefCount[0],
    image: `${IMAGE_URL}${item.image1}`,
  }));
};

/**
 * Fetch user cuisines and chefs.
 *
 * @function
 * @return {Promise<Array>} All cuisines and chefs
 */
export const fetchUserCusinesAndChefs = async () => {
  try {
    const data = await apiClient.get("user/pub/get-cuisine-n-chef").json();
    return transformCuisinesAndChefs(data);
  } catch (err) {
    throw new Error(err);
  }
};

const transformCuisinesAndDishCount = ({ data }) => {
  return data.map(({ chefDishCount, _id, ...rest }) => ({
    ...rest,
    id: _id,
    count: chefDishCount,
  }));
};

/**
 * Fetch user cuisines and dish count.
 *
 * @function
 * @return {Promise<Array>} All cuisines and dish count
 */
export const fetchUserCusinesAndDishCount = async (identifier) => {
  try {
    const data = await apiClient
      .get(`user/pub/get-chef-cuisines-n-dish-count/${identifier}`)
      .json();

    return transformCuisinesAndDishCount(data);
  } catch (err) {
    throw new Error(err);
  }
};
