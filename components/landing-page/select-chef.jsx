import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";

import GridToScroll from "../grid-to-scroll";
import { fetchUserCusinesAndChefs } from "../../services/cuisine-api/user";
import { useRouter } from "next/router";
import { myLoader } from "../../services/custom_loader";

function SelectChef() {
  const { data, error } = useSWR(
    "fetch_cusines_and_chefs",
    fetchUserCusinesAndChefs
  );

  const [cusines, setCuisines] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setCuisines(data.slice(0, 8));
    }
  }, [data]);

  const handleSearch = (cuisine) => {
    dispatch({ type: "SET_SEARCH_CUISINE_ID", payload: cuisine.id });
    router.push("/chef/search");
  };

  return (
    <section className="w-10/12 mx-auto md:pt-44 pt-32">
      <div className="flex justify-center md:mb-20 mb-12">
        <h2 className="md:text-4xl text-2xl md:text-center font-semibold md:w-5/12">
          Select Chefs That Cook Your Favourites
        </h2>
      </div>

      <div className="mb-12">
        <GridToScroll gridCols={4} gapX={8} gapY={10} gapXSm={12}>
          {cusines.map((cuisine, index) => (
            <button
              className="flex flex-col items-center"
              key={index}
              onClick={() => handleSearch(cuisine)}
            >
              <ImageWrapper className="rounded-full relative bg-gray-200">
                <Image
                  className="rounded-full"
                  src={cuisine.image}
                  alt={cuisine.name}
                  layout="fill"
                  objectFit="cover"
                  loader={myLoader}

                />
              </ImageWrapper>
              <div className="mt-5 font-semibold text-lg text-gray-800">
                {cuisine.name}
              </div>
              <div className="text-gray-500">{cuisine.chefs} Chefs</div>
            </button>
          ))}
        </GridToScroll>
      </div>

      {/* <GridToScroll gridCols={4} gapX={8} gapXSm={12}>
        {dishes2.map((dish, index) => (
          <div className="flex flex-col items-center" key={index}>
            <ImageWrapper className="rounded-full relative bg-gray-200">
              <Image
                src={dish.image}
                srcSet={`${dish.image}--mobile 1x`}
                alt={dish.name}
                layout="fill"
              />
            </ImageWrapper>
            <div className="mt-5 font-semibold text-lg text-gray-800">
              {dish.name}
            </div>
            <div className="text-gray-500">{dish.chefs} Chefs</div>
          </div>
        ))}
      </GridToScroll> */}

      {data && (
        <div className="flex justify-center mt-16">
          <button
            className="bg-black text-white py-3 px-7 font-medium mt-6"
            style={{ borderRadius: 8 }}
            onClick={() => {
              setCuisines(!showMore ? data : data.slice(0, 8));
              setShowMore(!showMore);
            }}
          >
            {!showMore ? `${data.length} More Cuisines` : "Less Cuisines"}
          </button>
        </div>
      )}
    </section>
  );
}

const ImageWrapper = styled.div`
  height: 120px;
  width: 120px;

  @media screen and (min-width: 768px) {
    height: 180px;
    width: 180px;
  }
`;

export default SelectChef;
