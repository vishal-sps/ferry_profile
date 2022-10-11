import Link from 'next/link';
import styled from "styled-components";

import PeopleToast from "./people-toast.svg";
import PersonScheduling from "./person-scheduling.svg";
import ChefCooking from "./chef-cooking.svg";

function BookAChef() {
  return (
    <section className="w-9/12 mx-auto">
      <div className="flex md:flex-row flex-col flex-col-reverse items-center md:mb-44 mb-32">
        <div className="md:w-1/2 text-center md:text-left md:mt-0 mt-7">
          <h2 className="font-bold md:text-4xl text-xl md:w-11/12">
            Book A Chef For Your Next House Party.
          </h2>

          <p className="text-gray-500 md:text-lg md:mt-7 mt-3 md:w-8/12">
            Attend to your guests and make them feel at home.
          </p>

          <Link href="#hero">
            <a className="bg-black text-white py-3 px-7 mt-6 font-medium rounded-lg inline-block">
              Book A Chef
            </a>
          </Link>
        </div>

        <div className="md:w-1/2 flex md:justify-end justify-center">
          <PeopleToast className="w-full" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between md:mb-44 mb-20">
        <div className="md:w-5/12">
          <PersonScheduling className="w-full" />
        </div>

        <div className="md:w-5/12 text-center md:text-left md:mt-0 mt-6">
          <h2 className="font-bold md:text-4xl text-xl">
            Schedule Chefs For Your Daily Meals.
          </h2>

          <p className="text-gray-500 md:text-lg  md:mt-6 mt-3 md:w-8/12">
            Don&apos;t worry about the food, we got this.
          </p>

          <Link
            href="#hero"
          >
            <a className="bg-black text-white py-3 px-7 rounded mt-6 font-medium rounded-lg inline-block">Book A Chef</a>
          </Link>
        </div>
      </div>

      <div className="flex flex-col flex-col-reverse md:flex-row  items-center">
        <div className="md:w-1/2 text-center md:text-left md:mt-0 mt-6">
          <h2 className="font-bold md:text-4xl text-xl md:w-9/12">
            All This Starts At $30/Hour
          </h2>

          <p className="text-gray-500 md:text-lg md:mt-7 mt-3 md:w-8/12">
            Cheaper than ordering from a restaurant.
          </p>

          <Link href="#hero">
            <a className="bg-black text-white py-3 px-7 rounded mt-6 font-medium rounded-lg inline-block">
              Book A Chef
            </a>
          </Link>
        </div>

        <div className="md:w-1/2 flex justify-end">
          <ChefCooking className="w-full" />
        </div>
      </div>
    </section>
  );
}

const ImageWrapper = styled.div`
  width: 300px;
`;

export default BookAChef;
