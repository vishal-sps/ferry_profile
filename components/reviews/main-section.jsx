import React from "react";
import Image from "next/image";
import styled from "styled-components";

import Star from "../svg/star.svg";
import { IMAGE_URL } from "../../constants/enviroment-vars";
import { myLoader } from "../../services/custom_loader";

function ReviewMainSection({ rating, description, images }) {
  const stars = (rating) => {
    const roundedRating = Math.round(rating);
    const stars = [];

    for (let index = 0; index < roundedRating; index++) {
      stars.push(<StyledStar className="h-4 w-4 mr-3" />);
    }

    return stars;
  };

  return (
    <div className="w-full p-4 h-100 border rounded-lg mb-5">
      <span className="flex items-center">{stars(rating)}</span>

      <p className="font-medium mt-4">{description}</p>

      <div className="flex mt-4 h-12 ">
        <small className="rounded-full mt-2 h-9 w-9 bg-gray-300"></small>
        <div className="block h-10 ml-3 mt-1">
          <p className="font-extralight text-xs mt-1">
            {"Reviewdata.content[0].name"}
          </p>
          <div className="flex mt-1 space-x-2">
            <small className="rounded-full mt-0.5 h-3 w-3 bg-gray-300"></small>
            <a className=" text-xs ">{"Reviewdata.content[0].area"}</a>
          </div>
        </div>
      </div>

      <div className="flex w-100 space-x-2 py-3 ">
        {images.map((image, index) => (
          <div
            className="relative w-24 h-16 border rounded-md bg-gray-200"
            key={index}
          >
            <Image
              src={`${IMAGE_URL}${image}`}
              className="rounded-md"
              layout="fill"
              alt="review image"
              objectFit="cover"
              loader={myLoader}

            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewMainSection;

const StyledStar = styled(Star)`
  fill: #ffc107;
`;
