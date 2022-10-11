import apiClient from "..";

const transformDishesByCuisineId = ({ data }) => {
  // console.log('transformDishesByCuisineId', data);
  return data.map((item) => ({
    id: item.dish_Id,
    cookingInfo: item.cooking_info,
    price: item.price,
    name: item.name,
    description: item.description,
    image: "/assets/images/chefs/james.jpg",
    images: item.images,
    count: 0,
    _id: item._id,
    dish_Id: item._id
    // newId: item._id
  }));
};

/**
 * Fetch user Dishes by cusineId.
 *
 * @function
 * @return {Promise<Array>} All Dishes by cuisineId
 */
export const fetchUserChefDishesByCuisineId = async (payload) => {
  try {
    const data = await apiClient
      .post("user/pub/get-dish-by-cusineId", { json: payload })
      .json();
    return transformDishesByCuisineId(data);
  } catch (err) {
    throw new Error(err);
  }
};
