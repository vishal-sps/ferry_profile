import apiClient from "..";

/**
 * Fetch chef dishes by cusineId.
 *
 * @function
 * @return {Promise<Array>} All Dishes by cuisineId
 */
export const fetchChefDishesByCuisineId = async (
  identifier = "5dad4e007b81173328ab0bff"
) => {
  try {
    const data = await apiClient
      .get(`api/dish/get-dish-by-cusineId/${identifier}`)
      .json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
