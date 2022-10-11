import Image from "next/image";
import styled from "styled-components";

import { IMAGE_URL } from "../../../constants/enviroment-vars";
import { myLoader } from "../../../services/custom_loader";

const Cuisine = ({ cuisine, setSelected, isActive }) => (
  <Wrapper
    className={`${
      !isActive ? "bg-gray-100" : "bg-white"
    } flex items-center md:p-5 p-3 md:mb-0 mb-5 cursor-pointer flex-none`}
    isActive={isActive}
    disabled={isActive}
    onClick={() => setSelected(cuisine)}
  >
    <div className="bg-gray-500 h-16 w-16 rounded-full relative">
      <Image
        src={`${IMAGE_URL}${cuisine.image1}`}
        alt={cuisine.name}
        className="rounded-full"
        layout="fill"
        loader={myLoader}
        objectFit="cover"
      />
    </div>
    <div className="ml-5">
      <h4 className="text-lg font-semibold mb-1">{cuisine.name}</h4>
      <p>{cuisine.count} Dishes</p>
    </div>
  </Wrapper>
);

export default Cuisine;

const Wrapper = styled.button`
  border-radius: 12px;
  width: 230px;
  ${(props) =>
    props.isActive && "box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.10)"};

  @media screen and (min-width: 768px) {
    width: 23%;
  }
`;
