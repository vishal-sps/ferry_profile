import apiClient from "..";

const transformUserChefReviews = ({ data }) => {
  return data.map((item) => ({
    id: item._id,
    chefId: item.chef_Id,
    description: item.description,
    images: item.images,
    rating: item.rate_chef,
  }));
};

/**
 * fetch user chef reviews
 *
 * @function
 * @return {Promise<Object>} review object
 */
export const fetchUserChefReviews = async (identifier) => {
  try {
    const data = await apiClient
      .get(`user/api/consumer/get-chef-review/${identifier}`)
      .json();
    return transformUserChefReviews(data);
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * add user chef review
 *
 * @function
 * @return {Promise<Object>} chef object
 */
export const addUserChefReviews = async (payload) => {
  try {
    const data = await apiClient
      .post(`user/api/consumer/add-review`, { json: payload })
      .json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
