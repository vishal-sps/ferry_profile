import styled from "styled-components";

import ChefHero from "./chef-hero";
import HeroSearch from "./hero-search";

function Hero() {
  return (
    <section className="w-11/12 mx-auto pt-32 pb-44" id="hero">
      <div className="flex flex-col md:flex-row md:flex-row-reverse items-center w-full md:mb-0 mb-10">
        <div className="md:w-6/12 flex md:justify-end justify-center">
          <StyledChefHero />
        </div>

        <div className="md:w-6/12 text-center md:text-left md:mt-0 mt-6">
          <h1 className="font-bold md:text-5xl text-2xl md:w-10/12">
            Book Your Favorite Chef With Lovely Menu
          </h1>

          <p className="md:text-lg text-sm md:w-8/12 md:mt-6 mt-3 text-gray-500">
            Book the best chefs nearby for your next party or daily meals.
          </p>
        </div>
      </div>

      <HeroSearch />
    </section>
  );
}

const StyledChefHero = styled(ChefHero)`
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 500px;
  }
`;

export default Hero;
