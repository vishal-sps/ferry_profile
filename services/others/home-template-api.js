import apiClient from "..";

/**
 * Fetch home template.
 *
 * @function
 * @return {Promise<Object>} page template object
 */
const getHomeTemplate = async () => {
  try {
    const data = await apiClient
      .get("user/pub/get-user-homepage-template")
      .json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export default getHomeTemplate;
