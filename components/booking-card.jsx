import React from "react";
import Image from "next/image";

import Stargazer from "./stargazer";
import { myLoader } from "../services/custom_loader";

function BookingCard({ booking, ...rest }) {
  return (
    <div
      style={{
        boxShadow: "0px 7px 64px rgba(0, 0, 0, 0.10)",
        borderRadius: 8,
      }}
      {...rest}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <span
            className="rounded-full relative"
            style={{ height: 38, width: 38, background: "#eee" }}
          >
            {booking.profilePic && (
              <Image
                src={booking.profilePic}
                alt="booking image"
                layout="fill"
                className="rounded-full"
                objectFit="cover"
                loader={myLoader}
              />
            )}
          </span>

          <div className="flex flex-col ml-4">
            <span className="font-medium">{booking.name}</span>
            <small>{booking.relativeTime}</small>
          </div>
        </div>
        <Stargazer stars={booking.stars} />
      </div>

      <p className="mb-5">
        {/* In at iacuis lrem. Praesent tempor dictum tellus ut molestle, Sed sed
        ullamcorper lorem, id faucibus odio. */}
        {booking.description}
      </p>

      <div
        className="mb-5 relative rounded-lg"
        style={{ height: 200, background: "#eee" }}
      >
        {booking.images && (
          <Image
            src={booking.images[0]}
            alt="booking image"
            layout="fill"
            className="rounded-lg"
            loader={myLoader}
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg width="24.85" height="21.868" viewBox="0 0 24.85 21.868">
            <path
              id="Path_11975"
              data-name="Path 11975"
              d="M40.425,61.863S28,54.905,28,46.456a6.462,6.462,0,0,1,12.425-2.489h0A6.462,6.462,0,0,1,52.85,46.456C52.85,54.905,40.425,61.863,40.425,61.863Z"
              transform="translate(-28 -39.995)"
              fill="rgba(233,0,0,0.67)"
            />
          </svg>

          <span className="ml-2">{booking.likes}</span>
        </div>

        <svg
          id="Group_11717"
          data-name="Group 11717"
          xmlns="http://www.w3.org/2000/svg"
          width="18.245"
          height="21.563"
          viewBox="0 0 18.245 21.563"
        >
          <circle
            id="Ellipse_382"
            data-name="Ellipse 382"
            cx="3.317"
            cy="3.317"
            r="3.317"
            transform="translate(0 7.464)"
            fill="#333"
          />
          <circle
            id="Ellipse_383"
            data-name="Ellipse 383"
            cx="3.317"
            cy="3.317"
            r="3.317"
            transform="translate(11.611 14.928)"
            fill="#333"
          />
          <circle
            id="Ellipse_384"
            data-name="Ellipse 384"
            cx="3.317"
            cy="3.317"
            r="3.317"
            transform="translate(11.611)"
            fill="#333"
          />
          <line
            id="Line_319"
            data-name="Line 319"
            x1="6.03"
            y2="3.877"
            transform="translate(6.106 5.111)"
            fill="none"
            stroke="#333"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          />
          <line
            id="Line_320"
            data-name="Line 320"
            x2="6.03"
            y2="3.877"
            transform="translate(6.106 12.575)"
            fill="none"
            stroke="#333"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}

export default BookingCard;
