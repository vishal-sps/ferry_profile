import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";
import useChef from "../../../custom-hooks/use-chef";
import { getCartSettings } from "../../../services/cart-api/user";
import { getChefHourlyRate } from "../../../services/payment-api/chef";
import { getTotalAmount, getTotalMinutes, roundTill2Decimals } from "../../../utils/cart-calculations";

// const StickyCart = ({ total, cart, canProceed }) => (
  function StickyCart({ total, cart, canProceed }) {
  const { chef } = useChef();
  const [hourlyCookingCharges, setHourlyCookingCharges] = useState(0);
  const { data: cartSettingsData, error: cartSettingsError } = useSWR("cart_settings", getCartSettings);
  useEffect(() => {
    if (cartSettingsData) {
      setHourlyCookingCharges(cartSettingsData.data.hourly_cooking_charges);
    }
  }, [cartSettingsData])
  return (
  <div
    className={`fixed w-full border bg-white z-10 h-16`}
    style={{ bottom: 0, left: 0}}
  >
    <div className="wrapper h-full flex items-center justify-between">
      <div className="flex flex-col">
        <p className="p mb-1 flex gap-1 items-center text-sm font-normal md:text-lg md:font-semibold"> Your Order
          <span className="bg-primary text-xs md:text-base rounded-full h-5 w-5 md:h-8 md:w-8 leading-3 font-semibold center-all text-white md:ml-2">{total}</span> 
          <span className="text-xs hidden md:block md:text-sm font-medium">Servings</span> 
        </p>
        <h5 className="h5 md:hidden font-bold mb-0">
        ${roundTill2Decimals(getTotalMinutes(cart).totalTime * hourlyCookingCharges / 60)}
        </h5>
      </div>

      <div className="flex items-center">
        <span className="mr-6 text-lg text-gray-500 font-medium hidden md:block">
          Subtotal ${roundTill2Decimals(getTotalMinutes(cart).totalTime * hourlyCookingCharges / 60)}

        </span>
        {canProceed ? (
          <Link href="/chef/order">
            <a className="btn btn-black btn-lg">Proceed</a>
          </Link>
        ) : (
          <Link href="/login">
            <a className="btn btn-black btn-lg">Proceed</a>
          </Link>
        )}
      </div>
    </div>
  </div>
);
        }

export default StickyCart;
