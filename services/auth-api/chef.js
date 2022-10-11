import apiClient from "..";

/**
 * Login chef.
 *
 * @function
 * @param {Object} chef chef object
 * @return {Promise<Object>} chef object
 */
export const loginChef = async (payload) => {
  try {
    const data = await apiClient.post("pub/login", { json: payload }).json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Sign up chef.
 *
 * @function
 * @param {Object} chef chef object
 * @return {Promise<Object>} chef object
 */
export const signUpChef = async (payload) => {
  try {
    const data = await apiClient.post("pub/register", { json: payload }).json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
