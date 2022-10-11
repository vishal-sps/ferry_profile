import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "nextjs-toast";
import getDay from "date-fns/getDay";
import FadeLoader from "react-spinners/FadeLoader";

import ChefCard from "../../components/chef-card";

import Dinner from "../../components/dinner.svg";
import Champagne from "../../components/champagne-glass.svg";
import Modal from "../../components/modal/searchModal";

import { fetchChefsByCusineId, searchChef, fetchTrendingChef, transformTrendingChefs } from "../../services/chef-api";
import Empty from "../../components/empty";
import getTime from "../../utils/get-time";
import { transformSearchResult, } from "../../utils/transformers/chef";
import formatInTimeZone from "../../utils/format-in-timezone";
import { IMAGE_URL } from "../../constants/enviroment-vars";
import { capitalize } from "@material-ui/core";


const transformCuisineSearchResult = ({ data }) => {
  return data.map((item) => ({
    id: item._id,
    name: `${item.first_name} ${item.last_name}`,
    stars: 4,
    cuisine: item.chef_cuisines.map((data) => data.name).join(", "),
    time: `9PM to 10PM`,
    profilePic: `${IMAGE_URL}${item.profile_pic}`,
    link: `/chef/${item._id}`, //profile-rem
  }));
};

function Search() {
  // hooks
  const dispatch = useDispatch();
  const searchPayload = useSelector((state) => state.searchPayload);
  const snackbar = useSnackbar();

  // state
  const [chefs, setChefs] = useState([]);
  const [chefCount, setChefCount] = useState({ meal: 0, party: 0 });
  const [show, setShow] = useState(false);
  const [currentTab, setCurrentTab] = useState(1);
  const [loading, setLoading] = useState(true);
  const [trendingPartyRawData, setTrendingRawPartyData] = useState([])
  const [trendingMealsRawData, setTrendingRawMealsData] = useState([])

  useEffect(() => {
    setCurrentTab(searchPayload.cuisine_category);
  }, [searchPayload.cuisine_category]);

  const coordinates = useSelector((state) => state.geoLocation);
  useEffect(() => {
    setLoading(true);

    if (searchPayload.type === "regular-search") {
      const payload = {};
      searchPayload.cuisine_category &&
        (payload.cuisine_category = searchPayload.cuisine_category);
        Object.values(searchPayload.name).length && (
          payload.type = capitalize(searchPayload?.name?.type),
          (  payload.name = payload.type == "chef" ? searchPayload?.name?.name.split(" ")[0]  : searchPayload?.name?.id)
          )
      searchPayload.city &&
        (payload.city = searchPayload.city.id || searchPayload.city._id);

      if (searchPayload.date) {
        const formattedDate = formatInTimeZone(searchPayload.date);

        payload.time = getTime(formattedDate);
        payload.day = getDay(searchPayload.date);
      }

      searchChef(payload)
        .then((res) => {
          setChefs(transformSearchResult(res));
          setChefCount({ meal: res.data.mealChef, party: res.data.partyChef });
        })
        .catch((err) => {
          if (err.message.includes("404")) {
            setChefs([]);
            setChefCount({ meal: 0, party: 0 });
            snackbar.showMessage("No chefs found", "error", "filled");
            return;
          }

          snackbar.showMessage(
            "An error occured while fetching chefs probably a network error",
            "error",
            "filled"
          );

          console.log(err);
        })
        .finally(() => setLoading(false));
    } else if(searchPayload.type === "trending-chef"){
      try {
        setLoading(true);
       const payload =  (coordinates && Object.keys(coordinates).length) ? coordinates : {city: "60d9717e0aeee56963e219a0"}
             //call trending chef-api
             fetchTrendingChef(payload)
             .then((res)=>{
              if(res?.message.includes("successfully")){
                setTrendingRawPartyData(res.data.result_party)
              setTrendingRawMealsData(res.data.result_meal) //checked with .splice(-1)
              setChefs(transformTrendingChefs(res.data.result_party));
              setChefCount({ meal: res.data.mealChef, party: res.data.partyChef });
              }else {
                if(res.message.includes("No")){
                  setChefs([]);
                  setChefCount({ meal: 0, party: 0 });
                  snackbar.showMessage("No chefs found", "error", "filled");
                }
              }
            
            })
              .catch((err)=>{
                console.log('err', err);
                if (err.message.includes("404")) {
                  setChefs([]);
                  setChefCount({ meal: 0, party: 0 });
                  snackbar.showMessage("No chefs found", "error", "filled");
                  return;
                }
                snackbar.showMessage(
                  "An error occured while fetching chefs probably a network error",
                  "error",
                  "filled"
                );
                console.log(err);
              })          
      } catch (error) {
        console.log('trending-error', error);
        snackbar.showMessage(
          "An error occured while fetching chefs probably a network error",
          "error",
          "filled"
        );
      }finally{
        setLoading(false)
      }
    }else {
      fetchChefsByCusineId(searchPayload.cuisineId)
        .then((res) => {
          setChefs(transformCuisineSearchResult(res));
          //setChefCount({ meal: res.data.mealChef, party: res.data.partyChef });
        })
        .catch((err) => {
          if (err.message.includes("404")) {
            setChefs([]);
            snackbar.showMessage("No chefs found", "error", "filled");
            return;
          }

          snackbar.showMessage(
            "An error occured while fetching chefs probably a network error",
            "error",
            "filled"
          );

          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }, [searchPayload, snackbar]);

  if (loading)
    return (
      <div className="pt-44 flex justify-center">
        <FadeLoader color="red" />
      </div>
    );

  return (
    <>
      <div
        className="flex items-center fixed w-full bg-white z-10 border-b"
        style={{ top: 80 }}
      >
        <div className="flex items-center md:w-11/12 w-full md:mx-auto">
          <div
            className={`md:mr-5 flex justify-center items-center md:w-48 w-1/2 ${
              currentTab == 1 ? "border-b-2 border-red-500" : ""
            } py-2 cursor-pointer`}
            onClick={() => {
              if(searchPayload.type == "trending-chef"){
                setChefs(transformTrendingChefs(trendingPartyRawData))
                setCurrentTab(1)
              }else{
                dispatch({
                  type: "SET_SEARCH_PAYLOAD",
                  payload: { cuisine_category: 1 },
                })
              }
              }
             
            }
          >
            <Champagne className="h-7" />
            <div className="flex flex-col ml-3">
              <span className="font-medium">Party</span>
              <span className="text-xs text-gray-500">
                {chefCount.party} Chefs
              </span>
            </div>
          </div>

          <div
            className={`flex justify-center items-center md:w-48 w-1/2 ${
              currentTab == 2 ? "border-b-2 border-red-500" : ""
            } py-2 cursor-pointer`}
            onClick={() =>{
                if(searchPayload.type == "trending-chef"){
                  setChefs(transformTrendingChefs(trendingMealsRawData))
                  setCurrentTab(2)
                }else{
                  dispatch({
                    type: "SET_SEARCH_PAYLOAD",
                    payload: { cuisine_category: 2 },
                  })
                }
            }
            }
          >
            <Dinner className="h-7" />
            <div className="flex flex-col ml-3">
              <span className="font-medium">Meals</span>
              <span className="text-xs text-gray-500">
                {chefCount.meal} Chefs
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto pt-32">
        {chefs.length ? (
          <div className="flex md:flex-row flex-col flex-col-reverse md:items-center md:justify-between pt-8 md:pb-8 pb-5 ">
            <h2 className="md:text-2xl text-lg font-semibold">
              Chefs Near {searchPayload.city.name || "You"}
            </h2>
          </div>
        ) : null}

        {chefs.length ? (
          <div className="grid md:grid-cols-4 grid-cols-1 gap-x-8 gap-y-8">
            {chefs.map((chef, index) => (
              <ChefCard chef={chef} isVariant={true} key={index} />
            ))}
          </div>
        ) : (
          <div className="pt-16">
            <Empty
              title={`No Chef's Near ${searchPayload.city.name || "You"}`}
              subTitle="We will come to your city soon."
            />
          </div>
        )}
      </div>

      <Modal onClose={() => setShow(false)} show={show} />
    </>
  );
}

export default Search;
