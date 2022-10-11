import { IMAGE_URL } from "../../constants/enviroment-vars";

export const transformCities = (response) => {
  if (Array.isArray(response)) return response;
  return response.data.map((item) => ({
    name: item.name,
    id: item._id,
    stateCode: item.state_code,
  }));
};

export const transformSearchResult = ({ data }) => {
  return data.getChef.map((item) => ({
    id: item._id,
    name: `${item.first_name} ${item.last_name}`,
    stars: item.chef_review.length
      ? item.chef_review[0].rate_chef
      : item.default_star,
    cuisine: item.chef_cuisines.map((data) => data.name).join(", "),
    time: `${item.availability.routine_schedule[0].start_time} to ${item.availability.routine_schedule[0].end_time}`,
    profilePic: `${IMAGE_URL}${item.profile_pic}`,
    link: `/chef/${item._id}`, //profile-rem
  }));
};


// export const transformTrendingResult = ({ data }) => {
//   return data.getChef.map((item) => ({
//     id: item._id,
//     name: `${item.first_name} ${item.last_name}`,
//     stars: item.chef_review.length
//       ? item.chef_review[0].rate_chef
//       : item.default_star,
//     cuisine: item.chef_cuisines.map((data) => data.name).join(", "),
//     time: `${item.availability.routine_schedule[0].start_time} to ${item.availability.routine_schedule[0].end_time}`,
//     profilePic: `${IMAGE_URL}${item.profile_pic}`,
//     link: `/chef/profile/${item._id}`,
//   }));
// };
