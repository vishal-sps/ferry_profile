import React from "react";
import Image from "next/image";
import Link from "next/link";

import Stargazer from "./stargazer";
import trimString from "../utils/trim-string";
import router from "next/router";
import { myLoader } from "../services/custom_loader";
import default_profile from "../public/assets/images/chefs/default_profile.jpg"
import { IMAGE_URL } from "../constants/enviroment-vars";
import { setHours, setMinutes, format } from "date-fns";

function ChefCard({ chef }) {
  const handleClick = (chefLink) => {
    if (chefLink) router.push(chefLink);
  };

  //////////////chef-time availability time from api coming in UTC time, so we need to convert that into local time /////////////
  let [fromTime, toTime] = chef?.time.split(" to ") 

  const convertTime = timeStr => {
    if(timeStr.includes('pm') || timeStr.includes("am") || timeStr.includes('PM') || timeStr.includes('AM') ){
      let times = timeStr.match(/^(\d+)/)[1] ;
      let modifier = timeStr.match(/[a-zA-Z]+/g)[0]
      let hours = times
      let minutes = 0 
      if(timeStr.includes(":")){
        minutes =  timeStr.match(/:(\d+)/)[1]
     }
     if (hours === '12') {
      hours = '00';
   }
     if (modifier === 'pm' || modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
     }
    return `${hours}:${minutes == 0 ? "00" : minutes}`;
    }else{
        return timeStr
    }
 };

 let convertToLocalTime = (time) => {
  const [hour, minutes] = convertTime(time).split(":")
  let t1 = setHours(new Date(), hour)
  let t2 = setMinutes(t1, minutes)
  let finalLocalTime = new Date(`${t2} UTC`)
  return format(finalLocalTime, "hh:mm a")
 }

 let From_time = convertToLocalTime(fromTime)
 let To_time = convertToLocalTime(toTime)
 ////////////////////////////////////////////////////////////////////////////////
  return (
    <button
      className={`w-11/12 md:w-full flex-none text-left ${
        chef.link ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      onClick={() => handleClick(chef.link)}
    >
      <div
        className="mb-5 relative rounded-lg"
        style={{ height: 200, background: "#eee" }}
      >
         {chef.profilePic == IMAGE_URL ?  
         <Image
         src={default_profile}
         alt={'chef profile'}
         layout="fill"
         objectFit="contain"
         objectPosition="50% 50%"
         className="rounded-lg"
         loader={myLoader}
       />
          :
          <Image
            src={chef.profilePic}
            alt={chef.name}
            layout="fill"
            objectFit="contain"
            objectPosition="50% 50%"
            className="rounded-lg"
            loader={myLoader}

          />
        }
      </div>

      <div>
        <div className="flex justify-between">
          <span className="font-semibold text-lg">{chef.name}</span>

          <Stargazer stars={chef.stars.toFixed(1)} />
        </div>

        <div className="border-b pb-3 pt-2 text-gray-500 trimString">
          {chef.cuisine
          //  && trimString(chef.cuisine, 55)
           }
        </div>

        {/* <div className="mt-3 text-gray-700"> {chef.time} </div> */}
        {/* <div className="mt-3 text-gray-700"> {From_time} to {To_time} </div> */}
       { chef?.timeArr?.length > 0 ? 
          <div className="mt-3 text-gray-700 trimStringChefTime ">  { chef?.timeArr?.map((e,index) =>{ 
            if(e.start_time){
              let i = (index === chef?.timeArr.length - 1 ? "" : ", ")
             let time =  `${convertToLocalTime(e.start_time)} to ${convertToLocalTime(e.end_time)}`
             return time + i
            } 
            })}
           </div>
          :     
        <div className="mt-3 text-gray-700"> {From_time} to {To_time} </div>  }
      </div>
    </button>
  );
}

export default ChefCard;
