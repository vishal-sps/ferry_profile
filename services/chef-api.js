import apiClient from ".";
import { IMAGE_URL } from "../constants/enviroment-vars";
import { getDay } from "date-fns";

/**
 * fetch trending chef.
 *
 * @function
 * @return {Promise<Object>} chef object
 */
//////////////////////////this is only for Homepage Trending List//////////////////////////////
const transformNewTrendingChefs = ({ data }) => { 
  let result = data.result?.map((el)=>{
    return el._id[0]
  })
  
  return result.map((item) => {
    let day = getDay(new Date()) 
    let timeArr = item.availability.filter((item)=> item.working_day === day )[0].routine_schedule 
   return ({
    id: item._id,
    name: item.first_name,
    stars: item.chef_reviews?.length
    ? item.chef_reviews[0].rate_chef
    : item.default_star,
    cuisine: item.chef_cuisines.map((data) => data.name).join(", "),
    time: `${item.availability[0].routine_schedule[0].start_time ? item.availability[0].routine_schedule[0].start_time : item.availability[0].routine_schedule[1].start_time} to ${item.availability[0].routine_schedule[0].end_time ? item.availability[0].routine_schedule[0].end_time : item.availability[0].routine_schedule[1].end_time}`,
    profilePic: `${IMAGE_URL}${item.profile_pic}`,
    timeArr,
  })
}
  );
};

export const fetchNewTrendingChef = async (payload) => {
  try {
    const data = await apiClient.post("user/pub/get-trending-chef", {json: payload}).json();
    if(data.message.includes("successfully")){
      return transformNewTrendingChefs(data);
    }else{
      if(data.message.includes("No")){
       return "No chef found"
      }
    }
    
  } catch (err) {
    throw new Error(err);
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////this is only for Trending result in Search page/////////////////////

export const transformTrendingChefs = ( data ) => {
  let result = data?.map((el)=>{
    return el._id[0]
  })
  return result.map((item) => {
    let day = getDay(new Date()) 
    let timeArr = item.availability.filter((item)=> item.working_day === day )[0].routine_schedule
    return ({
    id: item._id,
    name: `${item.first_name} ${item.last_name}`,
    stars: item.chef_reviews?.length
      ? item.chef_reviews[0].rate_chef
      : item.default_star,
    cuisine: item.chef_cuisines.map((data) => data.name).join(", "),

    time: `${item.availability[0].routine_schedule[0].start_time ? item.availability[0].routine_schedule[0].start_time : item.availability[0].routine_schedule[1].start_time} to ${item.availability[0].routine_schedule[0].end_time ? item.availability[0].routine_schedule[0].end_time : item.availability[0].routine_schedule[1].end_time}`,

    timeArr,

    profilePic: `${IMAGE_URL}${item.profile_pic}`,
    link: `/chef/${item._id}`, //profile-rem
  })});
};


export const fetchTrendingChef = async (payload) => {
  try {
    const data = await apiClient.post("user/pub/get-trending-chef", {json: payload}).json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////


// export const fetchTrendingChefs = async () => {
//   try {
//     const data = await apiClient.get("user/pub/get-trending-chef").json();
//     return transformTrendingChefs(data);
//   } catch (err) {
//     throw new Error(err);
//   }
// };



/**
 * fetch chef.profile
 *
 * @function
 * @return {Promise<Object>} chef object
 */
export const fetchChefProfile = async () => {
  try {
    const data = await apiClient.get("api/chef/get-chef-profile").json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const transformUserChefProfile = ({ data }) => {
  const item = data[0];

  return {
    id: item._id,
    profilePic: item.profile_pic,
    fullName: `${item.first_name} ${item.last_name}`,
    description: item.description,
    serve_city : item.serve_city,
    chefCuisines: item.chef_cuisines.map((cuisine, index) => ({
      index,
      id: cuisine._id,
      name: cuisine.name,
      value: 6,
      image: "/assets/images/dishes/japanese.png",
    })),
    city: {
      stateCode: item.home_city[0].state_code,
      name: item.home_city[0].name,
    },
    galleryImages: item.images.map((image, index) => ({
      image: `${IMAGE_URL}${image}`,
      name: `gallery-${index + 1}`,
    })),
    rating: item.chef_review.length
      ? item.chef_review[0].rate_chef
      : item.default_star,
  };
};

/**
 * fetch user chef.profile
 *
 * @function
 * @return {Promise<Object>} chef object
 */
export const fetchUserChefProfile = async (payload) => {
  try {
    const data = await apiClient
      .get(`user/pub/get-chef-profile/${payload}`)
      .json();

    return transformUserChefProfile(data);
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * search chef
 *
 * @function
 * @param {payload}
 * @return {Promise<Object>} chef object
 */
export const searchChef = async (payload) => {
  try {
    const data = await apiClient
      .post("user/pub/get-chef", { json: payload })
      .json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const transformDishesCuisinesAndChefs = (response) => {
  if (Array.isArray(response)) return response;

  const { Dish, Cuisine, Chef } = response.data;

  const modifiedDish = Dish.length
    ? Dish.map((item) => ({
        id: item._id,
        name: item.name,
        type: "dish",
      }))
    : [];

  const modifiedCuisine = Cuisine.length
    ? Cuisine.map((item) => ({
        id: item._id,
        name: item.name,
        type: "cuisine",
      }))
    : [];

  const modifiedChef = Chef.length
    ? Chef.map((item) => ({
        id: item._id,
        name: item.first_name,
        type: "chef",
      }))
    : [];

  return [...modifiedDish, ...modifiedCuisine, ...modifiedChef];
};

/**
 * fetch dish, cuisine and chef
 *
 * @function
 * @param {payload}
 * @return {Promise<Array>} Search Array
 */
export const fetchDishesCuisinesAndChefs = async (
  payload = {
    name: "",
  }
) => {
  try {
    const data = await apiClient
      .post("user/pub/find-dish-cuisine-n-chef", { json: payload })
      .json();
    return transformDishesCuisinesAndChefs(data);
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * fetch city
 *
 * @function
 * @param {payload}
 * @return {Promise<Array>} City Array
 */
export const fetchCities = async (
  payload = {
    name: "",
  }
) => {
  try {
    const data = await apiClient
      .post("user/pub/get-city", { json: payload })
      .json();
    return data;

  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchAllCities = async (
) => {
  try {
    const data = await apiClient
      .get("user/pub/get-all-cities")
      .json();
    return data;

  } catch (err) {
    console.log(err);
    return [];
  }
};

export  function timeConvert(n, error=false) {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  if (error) {
    return `${rhours}:${rminutes} Hrs`
  }
  if (rminutes === 0) {
    return rhours + " hours";
  } else {

  return rhours + " hour " + rminutes + " minutes";
  }
}

/**
 * fetch chef by cuisine id
 *
 * @function
 * @param {payload}
 * @return {Promise<Array>} Chefs Array
 */
export const fetchChefsByCusineId = async (payload) => {
  try {
    const data = await apiClient
      .get(`user/pub/get-chef-cuisines/${payload}`)
      .json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
