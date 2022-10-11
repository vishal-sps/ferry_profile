import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Hero from "../components/landing-page/hero";
import BookAChef from "../components/landing-page/book-a-chef";
import SelectChef from "../components/landing-page/select-chef";
import HowItWorks from "../components/landing-page/how-it-works";
import ExploreChefs from "../components/landing-page/explore-chefs";
import TrendingChefs from "../components/landing-page/trending-chefs";
import SuccessfulBookings from "../components/landing-page/successful-bookings";
import MobileAd from "../components/landing-page/mobile-ad";

export default function Home() {
  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.geoLocation);

  useEffect(() => {
    if (!Object.keys(coordinates).length) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const payload = {
            lat: position.coords.latitude || "37.36605",
            long: position.coords.longitude || "-121.82718",
          };

          dispatch({ type: "SET_GEO_LOCATION", payload });
        });
      }
    }
  }, [dispatch, coordinates]);

  return (
    <div>
      <Head>
        <title>Chef Joy</title>
        <meta name="description" content="Chef Joy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
        <BookAChef />
        <SelectChef />
        <HowItWorks />
        <ExploreChefs />
        <TrendingChefs />
        <SuccessfulBookings />
        {/* <MobileAd /> */}
      </main>
    </div>
  );
}
