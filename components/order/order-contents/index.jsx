import React from "react";
import Link from "next/link";

import OrderChefInfo from "../order-chef-info";
import OrderContent from "./order-content";

const formatAMPM = (date) => {
  let hours = parseInt(date.split(":")[0]);
  let minutes = parseInt(date.split(":")[1]);
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const strTime = `${hours}:${minutes} ${ampm}`;

  return strTime;
};

function OrderContents({ cart, chef, WeekDays, IndexDate, handleCart }) {
  return (
    <div>
      <OrderChefInfo
        className="flex items-center pb-5"
        chef={chef}
      />

      {/* <div style={{ flexDirection: "column" }} className="border-b flex items-center pb-5 mb-5">
        <h5 className="h5">
          Chef Availability
        </h5>
        <span> {WeekDays[IndexDate.getDay()]} </span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

          {(START_END_TIME_ARRAY?.length === 0 || START_END_TIME_ARRAY === null) ? <p className="p text-primary mt-1">Chef is not available on {WeekDays[IndexDate.getDay()]}</p> : START_END_TIME_ARRAY.map((time, index) => {
            return (
              <>
                <span key={index} className="text-sm text-gray-500 flex items-end -ml-1">
                  <span style={{ margin: "0 10px" }}>{formatAMPM(time.start_time)}</span><b>-</b><span style={{ margin: "0 10px" }}>{formatAMPM(time.end_time)}</span>
                </span> {index !== START_END_TIME_ARRAY.length - 1 && <span>|</span>}
              </>
            );
          }
          )}
        </div>


      </div> */}

      <h4 className="h4">Cart</h4>
      <OrderContent cart={cart} handleCart={handleCart} />

      <div className="flex md:justify-start justify-center md:mt-14 mt-12"> 
      {/* profile-rem */}
        <Link href={`/chef/${chef.id}`}> 
          <a className="btn btn-outline btn-lg">
            <span className="text-lg">+</span> Add More Dishes
          </a>
        </Link>
      </div>
    </div>
  );
}

export default OrderContents;
