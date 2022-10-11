import apiClient from "..";
import { IMAGE_URL } from "../../constants/enviroment-vars";

const transformUserSuccessfulBookings = ({ data }) => {
  return data.map((item) => ({
    id: item._id,
    profilePic: `${IMAGE_URL}${item.chefId.profile_pic}`,
    name: `${item.chefId.first_name} ${item.chefId.last_name}`,
    description: item.description,
    images: item.images.map((image) => `${IMAGE_URL}${image}`),
    relativeTime: "4 mins ago",
    stars: item.chefId.default_star,
    likes: 129,
  }));
};

/**
 * Fetch user successful bookings.
 *
 * @function
 * @return {Promise<Array>} All user addresses
 */
export const fetchUserSuccessfulBookings = async () => {
  try {
    const data = await apiClient
      .get("user/pub/get-successful-booking-post")
      .json();
    return transformUserSuccessfulBookings(data);
  } catch (err) {
    throw new Error(err);
  }
};
