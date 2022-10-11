import apiClient from "..";

/**
 * Fetch user addresses.
 *
 * @function
 * @return {Promise<Array>} All user addresses
 */
export const fetchUserAddresses = async () => {
  try {
    const data = await apiClient.get("user/api/consumer/get-address").json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Add user address.
 *
 * @function
 * @param {Object} address address object
 * @return {Promise<Object>} address object
 */
export const addUserAddress = async (payload) => {
  try {
    const data = await apiClient
      .post("user/api/consumer/add-address", { json: payload })
      .json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Update user address.
 *
 * @function
 * @param {Object} address address object
 * @return {Promise<Object>} address object
 */
export const updateUserAddress = async (payload) => {
  try {
    const data = await apiClient
      .put("user/api/consumer/update-address", { json: payload })
      .json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteUserAddress = async (payload) => {
  try {
    const data = await apiClient
      .get(`user/api/consumer/delete-address/${payload}`)
      .json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
