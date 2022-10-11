import { useState } from "react";

import BookingCard from "../../components/booking-card";
import LayoutTwo from "../../components/layouts/layout-two";

function Posts() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: "Anthony James",
      relativeTime: "4 mins ago",
      stars: 4.5,
      description: "",
      likes: 129,
      images: "",
      profilePic: "",
    },
  ]);

  return (
    <div className="w-11/12 mx-auto pt-32 pb-10">
      <div className="mb-6 text-sm">
        Home / <span className="text-gray-500">Post By Chef</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Post By Chef</h1>
      <p className="mb-12 text-gray-500">
        Chef&apos;s completing their bookings & experiences
      </p>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8">
        {bookings.map((booking, index) => (
          <BookingCard booking={booking} key={index} className="mb-10 p-5" />
        ))}
      </div>

      <div className="flex justify-center">
        <button className="border border-black px-6 py-2 rounded-lg">
          Load More
        </button>
      </div>
    </div>
  );
}

Posts.getLayout = LayoutTwo;

export default Posts;
