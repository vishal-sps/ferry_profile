import apiClient from "..";

/**
 * Fetch user payment sources.
 *
 * @function
 * @return {Promise<Array>} All payment sources
 */
export const fetchUserPaymentSources = async (
  identifier = "5dad4e007b81173328ab0bff"
) => {
  try {
    const data = await apiClient
      .get(`/user/pub/get-dish-by-cusineId/${identifier}`)
      .json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const makePayment = async (payload) => {
  try {
    const data = await apiClient
      .post(`user/api/booking/book-a-chef`, { json: payload })
      .json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
