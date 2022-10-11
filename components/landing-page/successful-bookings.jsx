import BookingCard from "../booking-card";
import ChButton from "../base/ch-button";
import GridToScroll from "../grid-to-scroll";
import useSWR from "swr";
import { fetchUserSuccessfulBookings } from "../../services/booking-api/user";

function SuccessfulBookings() {
  const { data, error } = useSWR(
    "fetch_successful_bookings",
    fetchUserSuccessfulBookings
  );

  return (
    <section className="w-11/12 mx-auto md:pt-44 pt-32">
      <h2 className="md:text-4xl text-2xl font-semibold md:text-center md:mb-4 mb-2">
        Successful Bookings
      </h2>

      <p className="md:text-center md:text-lg text-sm text-gray-500 mb-10">
        Chefs completing their bookings and experiences.
      </p>

      <GridToScroll gridCols={3} gapX={8}>
        {data?.map((booking, index) => (
          <BookingCard
            booking={booking}
            key={index}
            className="mb-10 p-5 flex-none w-11/12 md:w-full"
          />
        ))}
      </GridToScroll>

      {data?.length > 3 && (
        <div className="flex justify-center md:mt-16 mt-8">
          <ChButton className="bg-black text-white py-3 px-7 font-medium">
            View All Bookings
          </ChButton>
        </div>
      )}
    </section>
  );
}

export default SuccessfulBookings;
