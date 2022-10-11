import React from "react";
import Image from "next/image";

import CartButton from "../../cart-button";
import { IMAGE_URL } from "../../../constants/enviroment-vars";
import trimString from "../../../utils/trim-string";
import getDishMinutes from "../../../utils/get-dish-minutes";
import { myLoader } from "../../../services/custom_loader";

function OrderContent({ cart = [], handleCart }) {
  if (!cart.length) return <div>Cart Empty</div>;
  return (
    <>
      {cart.map((item) => (
        <div className="flex mb-8" key={item.id}>
          <div className="relative flex bg-gray-200 rounded-lg basis-1/3 lg:basis-1/4 h-28 overflow-hidden">
            <Image
              src={`${IMAGE_URL}${item.images[0]}`}
              alt="cart-dish"
              className="rounded-lg"
              layout="fill"
              objectFit="cover"
              loader={myLoader}

            />
          </div>

          <div className="w-full flex lg:flex-row md:justify-between flex-col md:pl-5 pl-4 basis-2/3 lg:basis-3/4">
            <div className="flex-col">
              <h6 className="h6 font-semibold">{item.name}</h6>
              <p className="p font-medium mb-2">
                {item.cookingInfo.length
                  ? `Serves ${item.count} - ${getDishMinutes(
                      item.cookingInfo,
                      item.count
                    )} mins`
                  : `Serves 2 - ${getDishMinutes(
                    item.cookingInfo,
                    2
                  )} mins`}
              </p>
              <span className="md:w-7/12 text-sm text-gray-500 text-ellipsis">
                {trimString(item.description, 55)} {item.description.length > 55? "...":""}
              </span>
            </div>

            <div className="lg:mt-0 mt-5">
              <CartButton
                count={item.count}
                hasExceeded={item.price.consumer_max_guest == item.count}
                onClick={(actionType) =>
                  handleCart(actionType, item.id, item.cuisineId)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default OrderContent;
