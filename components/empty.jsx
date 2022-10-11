import React from "react";
import Image from "next/image";
import { myLoader } from "../services/custom_loader";

function Empty({ title, subTitle, type }) {
  const determineImage = () => {
    if (type === "dish")
      return {
        image: "/assets/images/empty-dish.png",
        width: "125",
        height: "86",
      };
    return {
      image: "/assets/images/empty-chef.png",
      width: "85",
      height: "85",
    };
  };
  return (
    <div className="relative bg-gray-100 w-full h-72 flex flex-col items-center justify-center rounded-lg">
      <Image
        src={determineImage().image}
        alt="empty chef"
        width={determineImage().width}
        height={determineImage().height}
        loader={myLoader}

      />

      <h2 className="md:text-2xl font-semibold mb-2 mt-5">{title}</h2>

      <p className="md:text-base text-sm text-gray-400">{subTitle}</p>
    </div>
  );
}

export default Empty;
