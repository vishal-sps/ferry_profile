import apiClient from "..";

/**
 * Login customer.
 *
 * @function
 * @param {Object} customer customer object
 * @return {Promise<Object>} customer object
 */
export const loginUser = async (payload) => {
  try {
    const data = await apiClient
      .post("user/pub/login", { json: payload })
      .json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Sign up customer.
 *
 * @function
 * @param {Object} customer customer object
 * @return {Promise<Object>} customer object
 */
export const signUpUser = async (payload) => {
  try {
    const data = await apiClient
      .post("user/pub/register", { json: payload })
      .json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
