import React from "react";
import Image from "next/image";

import LocationPin from "./location-pin.svg";
import { IMAGE_URL } from "../../constants/enviroment-vars";
import { myLoader } from "../../services/custom_loader";

function OrderChefInfo({ chef, ...rest }) {
  return (
    <div {...rest}>
        
      <div className="relative bg-gray-300 h-16 w-16 rounded-full">
        <Image
          src={`${IMAGE_URL}${chef.profilePic}`}
          alt="louis-circle"
          className="rounded-full"
          layout="fill"
          objectFit="cover"
          loader={myLoader}

        />
      </div>

      <div className="ml-3 flex-col">
        <h5 className="h5">
          {chef?.fullName}
        </h5>
        <div className="text-sm text-gray-500 flex items-end -ml-1">
          <LocationPin className="scale-75" />
          <span>
            {chef?.city?.name} {chef?.city?.stateCode}
          </span>
        </div>
       
      </div>
 
    </div>
    
  );
}

export default OrderChefInfo;
