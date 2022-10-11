import { useState, useEffect } from "react";
import { searchChef } from "../../services/chef-api";
import ChButton from "../base/ch-button";
import ChefCard from "../chef-card";
import GridToScroll from "../grid-to-scroll";

import getTime from "../../utils/get-time";
import getDay from "date-fns/getDay";
import { transformSearchResult } from "../../utils/transformers/chef";
import Empty from "../empty";

function ExploreChefs() {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    // const time = getTime(new Date());
    // const day = getDay(new Date());

    // searchChef({ time, day })
    //   .then((response) => setChefs(transformSearchResult(response)))
    //   .catch((error) => console.log(error));
  }, []);

  return (
    <section className="w-11/12 mx-auto md:pt-44 pt-32">
      <h2 className="md:text-4xl text-2xl font-semibold md:text-center md:mb-4 mb-2">
        Explore Chefs Near You
      </h2>

      <div className="flex justify-center mb-10">
        <p className="md:text-center md:text-lg text-sm md:w-4/12 text-gray-500">
          Find chef&apos;s nearby and book them for your next party or meal.
        </p>
      </div>

      {chefs.length ? (
        <>
          <GridToScroll gridCols={3} gapX={8} gapY={8}>
            {chefs.map((chef, index) => (
              <ChefCard chef={chef} key={index} className="mb-14" />
            ))}
          </GridToScroll>

          {chefs.length ? (
            <div className="flex justify-center md:mt-16 mt-8">
              <ChButton className="bg-black text-white py-3 px-7 font-medium">
                45 More Chefs
              </ChButton>
            </div>
          ) : null}
        </>
      ) : (
        <Empty
          title={`No Chef's Near You`}
          subTitle="We will come to your city soon."
        />
      )}
    </section>
  );
}

export default ExploreChefs;
