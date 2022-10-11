import { useState } from "react";

import ChefCard from "../chef-card";
import ChButton from "../base/ch-button";
import GridToScroll from "../grid-to-scroll";
import useSWR from "swr";
import { fetchTrendingChefs, fetchNewTrendingChef } from "../../services/chef-api";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { useEffect } from "react";

function TrendingChefs() {
  // const { data, error } = useSWR("fetch_trending_chefs", fetchTrendingChefs);

  const [data, setData] = useState([])
  const dispatch = useDispatch();
  const router = useRouter();
  const coordinates = useSelector((state) => state.geoLocation);
  const payload =  (coordinates && Object.keys(coordinates).length) ? coordinates : {city: "60d9717e0aeee56963e219a0"}

  useEffect(async()=>{
    payload.limit = 5
    const res =  await fetchNewTrendingChef(payload)
    if(typeof res === "string"){
      setData([])
    }else{
      setData(res)
    }
    
  },[coordinates])
  const handleSubmit = async() => {
  //  const res =   await fetchNewTrendingChef(payload)
  dispatch({ type: "SET_SEARCH_TRENDING_CHEF", payload: "" })
   router.push("/chef/search");
  };


  return (
    <section className="w-11/12 mx-auto md:pt-44 pt-32">
      <h2 className="md:text-4xl text-2xl font-semibold md:text-center md:mb-4 mb-2">
        Trending Chefs
      </h2>

      <div className="flex justify-center mb-10">
        <p className="md:text-center md:text-lg text-sm md:w-4/12 text-gray-500">
          Browse the chefs in demand and plan your next meal or party.
        </p>
      </div>

      <GridToScroll gridCols={3} gapX={8}>
        {data?.map((chef, index) => {
          return (
            <ChefCard
              chef={{ ...chef, link: `/chef/${chef.id}` }} //profile-rem
              key={index}
              className="mb-14"
              style={{ flex: "0 0 auto" }}
            />
          );
        })}
      </GridToScroll>

      {  data.length ?
        <div className="flex justify-center md:mt-16 mt-8">
          <ChButton className="bg-black text-white py-3 px-7 font-medium" onClick={handleSubmit}>
            Show All 
          </ChButton>
        </div> : <div className="flex justify-center md:mt-16 mt-8">
          <ChButton className="bg-black text-white py-3 px-7 font-medium">
            No Trending Chef Available 
          </ChButton>
        </div>
      }
    </section>
  );
}

export default TrendingChefs;
