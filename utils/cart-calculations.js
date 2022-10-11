import { minutesToHours } from "date-fns";
import getDishMinutes from "./get-dish-minutes";

export const getTotalMinutes = (cart) => {
  let totalTime = 0;

  cart.forEach((item) => {
    const { count, cookingInfo } = item;

    const dishMinutes = getDishMinutes(cookingInfo, count);

    totalTime += Number(dishMinutes);
  });

  return minutesToHours(totalTime)
    ? {
      rawVal: minutesToHours(totalTime),
      formattedVal: `${minutesToHours(totalTime)} Hours`,
      totalTime: totalTime,
    }
    : { rawVal: totalTime, formattedVal: `${totalTime} Minutes`, totalTime: totalTime };
};

export const getTotalAmount = (cart, cartCount, cartSettings = null, hourlyCookingCharges = null, isPickupGrocery = false, extra_time_charges = 0) => {
  let pickUpCharges = 0;
  let platform_fee, tax_rate, hourly_cooking_charges;
  if (cartSettings) {
    platform_fee = cartSettings.platform_fee;
    tax_rate = cartSettings.tax_rate;
  } else {
    platform_fee = cart[0]?.price.platform_fee;
    tax_rate = cart[0]?.price.tax_rate;
  }
  if (hourlyCookingCharges || hourlyCookingCharges === 0) {
    hourly_cooking_charges = hourlyCookingCharges;
  } else {
    hourly_cooking_charges = cart[0]?.price.hourly_cooking_charges;
  }
  if (!cart || !cart.length) return 0;
  if (isPickupGrocery) {
    pickUpCharges = cartSettings.pick_up_charges
  } else {
    pickUpCharges = 0
  }
  // return (
  //   ((
  //     getTotalMinutes(cart).totalTime * Number(hourly_cooking_charges) / 60
  //   ) + (extra_time_charges) + 
  //     (Number(platform_fee) * ((getTotalMinutes(cart).totalTime * Number(hourly_cooking_charges) / 60)) / 100) + pickUpCharges) * (1 + (tax_rate / 100))

  // );
   ///////////////pickUpCharges also need to add while calculating platform fee /////////////
   let platform_charges = roundTill2Decimals((cartSettings.platform_fee || 0) * ((extra_time_charges > 0 ? cartSettings.min_order_time: getTotalMinutes(cart).totalTime) * hourlyCookingCharges / 60) /100 ) 

   let platform_fee_with_grocery_charges =  roundTill2Decimals((cartSettings.platform_fee || 0) * (((extra_time_charges > 0 ? cartSettings.min_order_time: getTotalMinutes(cart).totalTime) * hourlyCookingCharges / 60) + cartSettings?.pick_up_charges) /100 ) 

   let final_platform_charges = isPickupGrocery ? platform_fee_with_grocery_charges : platform_charges
  // return (
  //   ((
  //     getTotalMinutes(cart).totalTime * Number(hourly_cooking_charges) / 60
  //   ) + (extra_time_charges) + 
  //     (Number(platform_fee) * ((getTotalMinutes(cart).totalTime * Number(hourly_cooking_charges) / 60)+pickUpCharges) / 100) + pickUpCharges) * (1 + (tax_rate / 100))
  // );
  return (
    ((
      getTotalMinutes(cart).totalTime * Number(hourly_cooking_charges) / 60
    ) + (extra_time_charges > 0 ? extra_time_charges : 0) + 
      Number(final_platform_charges) + Number(pickUpCharges)) * (1 + (tax_rate / 100))
  );
};

export const roundTill2Decimals = (value, decimals = 2) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
}

