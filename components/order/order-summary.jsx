import { useState, useEffect } from "react";
import styled from "styled-components";
import { getTotalAmount, getTotalMinutes, roundTill2Decimals } from "../../utils/cart-calculations";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import { addDays, set, addMinutes, setHours, setMinutes, setSeconds, getHours, getMinutes, getTime, isAfter } from "date-fns";
import { getCartSettings, getGroceryCharges } from "../../services/cart-api/user";
import useSWR from "swr";
import { useSnackbar } from "nextjs-toast";
import { timeConvert } from "../../services/chef-api";


function OrderSummary({ chef_time, extra_time_charges, hourlyCookingCharges, setHourlyCookingCharges, settings, setSettings, step, cart, cartCount, bookingDateChange, setAbove150Minutes, isPickupGrocery, setIsPickupGrocery, setTax_rate, setIsChecked, isChecked, setIndexDate, handleTotalAmount, handleGroceryCharges, handlePlatformFee, handleTaxes }) {

  const defaultOpenForBusinessDate = setSeconds(setMinutes(setHours(addDays(new Date(), 0), 0), 0), 0);
  const snackbar = useSnackbar();

  const handleChange = () => {
    setIsPickupGrocery(!isPickupGrocery);
    localStorage.setItem("isPickupGrocery", !isPickupGrocery);
  }


  const [cartSettings, setCartSettings] = useState({
    platform_fee: 0,
    pick_up_charges: 0,
    tax_rate: 0,
    min_order_time: 0,
  })
  const { data: cartSettingsData, error: cartSettingsError } = useSWR("cart_settings", getCartSettings);
  const { data: GroceryCharges, error: GroceryChargesError } = useSWR("chef_hourly_rate", getGroceryCharges);
  useEffect(() => {
    if (cartSettingsData) {
      setCartSettings({
        platform_fee: cartSettingsData.data.platform_fee || 0,
        pick_up_charges: parseInt(cartSettingsData.data.hourly_cooking_charges) / 2,
        tax_rate: cartSettingsData.data.tax_rate || 0,
        min_order_time: cartSettingsData.data.minimum_cooking_time || 0
      });
      setSettings({
        platform_fee: cartSettingsData.data.platform_fee || 0,
        pick_up_charges: parseInt(cartSettingsData.data.hourly_cooking_charges) / 2,
        tax_rate: cartSettingsData.data.tax_rate || 0,
        min_order_time: cartSettingsData.data.minimum_cooking_time || 0
      })

      setHourlyCookingCharges(cartSettingsData.data.hourly_cooking_charges);
      setTax_rate(cartSettingsData.data.tax_rate);
    }
  }, [cartSettingsData])

  useEffect(() => {
    if (GroceryCharges) {
      // update cart settings key "pick_up_charges"
      setCartSettings((prevState) => ({
        ...prevState,
        pick_up_charges: parseInt(GroceryCharges.data),
      }));
    }
  }, [GroceryCharges])

  const [date, setDate] = useState(() => {

    return defaultOpenForBusinessDate;
  });

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [showTimeValidation, setTimeValidation] = useState(""); // show time validation message

  useEffect(() => {
    if (localStorage.getItem("startTime")) {
      let startT = localStorage.getItem("startTime")
      if(isAfter(new Date(startT), new Date(date)) ){
        setStartTime(startT);
        setDate(startT)
      }else{
        const updatedStartTime = updateTime(date, startT)
        localStorage.setItem("startTime", updatedStartTime);
        setStartTime(updatedStartTime);
      }
      bookingDateChange(true);
    }
    if (localStorage.getItem("endTime")) {
      let endT = localStorage.getItem("endTime")
      const updatedEndTime = updateTime(date, endT);
      if(isAfter(new Date(endT), new Date(addMinutes(new Date(date), getTotalMinutes(cart).totalTime)))){
        setEndTime(endT);
      }else{
        localStorage.setItem("endTime",updatedEndTime );
        setEndTime(updatedEndTime);
      }
      bookingDateChange(true);
    }
  }, []);
  ///syncing Date with time /////////////////////////////////////// 
  const updateTime=(newdate, startTime)=>{
    let hours = startTime && new Date(startTime).getHours()
    let minutes = startTime && new Date(startTime).getMinutes()
     return set(new Date(newdate), { hours, minutes })
    
  }
  useEffect(() => {
    if(date !== defaultOpenForBusinessDate ){
      if (date) {
       const updatedTime =  updateTime(date, startTime)
       //update start time
        setStartTime(updatedTime);
        localStorage.setItem("startTime", updatedTime);
        bookingDateChange(true);

        //update end time
        setEndTime(addMinutes(new Date(updatedTime), getTotalMinutes(cart).totalTime));
        localStorage.setItem("endTime", addMinutes(new Date(updatedTime), getTotalMinutes(cart).totalTime));
        bookingDateChange(true);
      }
    }
  }, [date])
//////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (startTime) {

      setEndTime(addMinutes(new Date(startTime), getTotalMinutes(cart).totalTime));
      localStorage.setItem("endTime", addMinutes(new Date(startTime), getTotalMinutes(cart).totalTime));
    }
  }, [getTotalMinutes(cart).totalTime])
useEffect(()=>{
let newEndTime_when_minimum_not_satisfy = localStorage.getItem("endTime");
setEndTime(newEndTime_when_minimum_not_satisfy)
},[extra_time_charges])
  useEffect(() => {
    if (localStorage.getItem('isPickupGrocery') === 'true') {
      document.getElementById('checkbox-1').checked = true;
      setIsPickupGrocery(true);
    } else {
      setIsChecked(false);
    }
  }, []);

  const updateStartTime = (dateInput) => {
    setStartTime(dateInput);
    // set end time to be 1 hour after start time
    setEndTime(addMinutes(dateInput, getTotalMinutes(cart).totalTime));
    localStorage.setItem("search", JSON.stringify({ date: dateInput }));
    localStorage.setItem("startTime", dateInput);
    localStorage.setItem("endTime", addMinutes(dateInput, getTotalMinutes(cart).totalTime));
    var validationMessage = checkTime(dateInput, addMinutes(dateInput, getTotalMinutes(cart).totalTime));
    checkBookingDate(validationMessage, dateInput, endTime);
    // setTimeValidation(validationMessage);
  }

  useEffect(() => {
    const isAbove150Mintues = (parseInt(getTotalMinutes(cart).totalTime)) >= cartSettings.min_order_time;
    setAbove150Minutes(isAbove150Mintues)
    // minimum book minitues is 150
    if (!isAbove150Mintues && document.readyState === "complete" && step == 0 && extra_time_charges === 0) {
      setTimeValidation(`Minimum booking time is ${cartSettings.min_order_time} minutes`, "error")
    } else {
      setTimeValidation("")
    }
  }, [cart, extra_time_charges, step])

  const updateEndTime = (dateInput) => {
    // setEndTime(dateInput);
    // var validationMessage = checkTime(startTime,dateInput);
    // checkBookingDate(validationMessage,startTime,dateInput);
    // setTimeValidation(validationMessage);   
  }

  const checkBookingDate = (validationMessage, start, end) => {
    // if(!validationMessage && start && end)
    bookingDateChange(true);
    //  else bookingDateChange(false)
  }

  let total_amount = roundTill2Decimals(getTotalAmount(cart, cartCount, cartSettings, hourlyCookingCharges, isPickupGrocery, extra_time_charges))

  let gorcery_charges = roundTill2Decimals(cartSettings.pick_up_charges)

  let taxes = roundTill2Decimals(getTotalAmount(cart, cartCount, cartSettings, hourlyCookingCharges, isPickupGrocery, extra_time_charges) - (getTotalAmount(cart, cartCount, cartSettings, hourlyCookingCharges, isPickupGrocery, extra_time_charges) / (1 + (cartSettings.tax_rate / 100))))
  

  let platform_fee = roundTill2Decimals((cartSettings.platform_fee || 0) * ((extra_time_charges > 0 ? cartSettings.min_order_time: getTotalMinutes(cart).totalTime) * hourlyCookingCharges / 60) /100 ) 

  let platform_fee_with_grocery_charges =  roundTill2Decimals((cartSettings.platform_fee || 0) * (((extra_time_charges > 0 ? cartSettings.min_order_time: getTotalMinutes(cart).totalTime) * hourlyCookingCharges / 60) + cartSettings?.pick_up_charges) /100 ) 

  useEffect(()=>{
    handleTotalAmount(total_amount)
  },[total_amount]);

  useEffect(()=>{
    handleGroceryCharges(gorcery_charges)
  },[gorcery_charges]);
  useEffect(()=>{
    handleTaxes(taxes)
  },[taxes])
  useEffect(()=>{
    if(isPickupGrocery){
      handlePlatformFee(platform_fee_with_grocery_charges)
    }else{
      handlePlatformFee(platform_fee)
    }
  },[platform_fee,isPickupGrocery ])

  const checkTime = (starttime, endtime) => {
    if (starttime != null && endtime != null) {
      var difference = endtime.getTime() - starttime.getTime(); // This will give difference in milliseconds
      var resultInMinutes = Math.round(difference / 60000);

      if (resultInMinutes < 0) return "End time cannot be less than Start time.";
      else if (resultInMinutes < 120) return "The booking should be minimum 2 hours.";
      else return null;
    }
    return null;
  }

  return (
    <div className="w-full p-4 shadow-2xl rounded-xl">
      <div className="flex items-center border-b pb-2">
        <div className="flex gap-2 basis-1/2">

          <span className="material-icons-outlined text-gray-700">
            calendar_today
          </span>

          <div className="flex flex-col ">
            <span className="text-sm text-gray-400">Date</span>

            <StyledDatePicker
              className="md:text-base focus:outline-none cursor-pointer appearance-none font-semibold underline text-sm"
              value={date}
              placeholder="Date / Time"
              onChange={(event) => { 
               setDate(event);
                // setIndexDate(event) 
              }}
              disablePast
              disabled={step > 0 ? true : false}
            />

          </div>

        </div>

        <div className="flex gap-2 basis-1/2 border-l border-gray-200 pl-3">
          <span className="material-icons-outlined">
            schedule
          </span>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Time</span>
            <div className="flex justify-start items-center">
              <StyledTimePicker
                className="focus:outline-none cursor-pointer appearance-none"
                value={startTime}
                placeholder="Start Time"
                disabled={step > 0 ? true : false}
                onChange={(event) => {
                  updateStartTime(event)}}
              />
              <span className="flex mx-1">
                -
              </span>
              <StyledTimePicker
                className="focus:outline-none cursor-pointer appearance-none"
                value={endTime}
                disabled={true}
                placeholder="End Time"
                onChange={(event) => updateEndTime(event)}
              />
            </div>
            {/* <p className="font-semibold underline">
              7:00PM - 8:55PM
            </p> */}
          </div>
        </div>
      </div>

      {
        showTimeValidation ? <p className="p text-primary mt-4">
          {showTimeValidation}
        </p> : null
      }


      <div className="order-details mt-3">
        <div className="order-item mb-4">
          <div className="flex justify-between">
            <p className="font-semibold">Total Time</p>
            <p className="font-semibold">{extra_time_charges > 0 ? timeConvert(cartSettings.min_order_time) : timeConvert(getTotalMinutes(cart).totalTime)}</p>
          </div>

          <div className="flex justify-between items-end mt-2">
            <div className="flex items-center">
              <input id="checkbox-1" aria-describedby="checkbox-1" type="checkbox" className="form-checkbox" onChange={handleChange} />
              <label htmlFor="checkbox-1" className="ml-2 text-sm font-medium"> Pick Up Grocery</label>
            </div>

            <p className="font-medium">${roundTill2Decimals(cartSettings.pick_up_charges)}</p>
          </div>

          <span className="text-xs text-gray-500">
            Pickup Charge Does Not Include Cost Of Grocery
          </span>
        </div>

        <div className="flex justify-between mb-4">
          <div>
            <p className="font-semibold">Cooking Charges</p>
            <span className="text-xs font-medium text-gray-500">( {extra_time_charges === 0 ? timeConvert(getTotalMinutes(cart).totalTime): timeConvert(cartSettings.min_order_time)} @ ${hourlyCookingCharges}/hour)</span>
          </div>

          <p className="font-semibold">
            ${roundTill2Decimals((getTotalMinutes(cart).totalTime * hourlyCookingCharges / 60) + (extra_time_charges >0 ? extra_time_charges : 0))}
          </p>
        </div>

{/* {
extra_time_charges && step != 0? 
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-semibold">Extra Charges</p>
            <span className="text-xs font-medium text-gray-500">(To meet the minimum time requirement)</span>
          </div>

          <p className="font-semibold">
            ${roundTill2Decimals(extra_time_charges)}
          </p>
        </div> :""
} */}

        <div className="flex justify-between mb-4">
          <div>
            <p className="font-semibold">Platform Fee</p>
            <span className="text-xs font-medium text-gray-500">(Goes To Chef Joy)</span>
          </div>

          <p className="font-semibold">
            ${ isPickupGrocery ?
            roundTill2Decimals((cartSettings.platform_fee || 0) * (((extra_time_charges > 0 ? cartSettings.min_order_time: getTotalMinutes(cart).totalTime) * hourlyCookingCharges / 60) + cartSettings?.pick_up_charges) /100 )
            : roundTill2Decimals((cartSettings.platform_fee || 0) * ((extra_time_charges > 0 ? cartSettings.min_order_time: getTotalMinutes(cart).totalTime) * hourlyCookingCharges / 60)/100)}
          </p>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <p className="font-semibold">Taxes</p>
        <p className="font-semibold">
          ${roundTill2Decimals(getTotalAmount(cart, cartCount, cartSettings, hourlyCookingCharges, isPickupGrocery, extra_time_charges) - (getTotalAmount(cart, cartCount, cartSettings, hourlyCookingCharges, isPickupGrocery, extra_time_charges) / (1 + (cartSettings.tax_rate / 100))))}
        </p>
      </div>


      <div className="flex justify-between mt-3 pt-4 border-t border-gray-200">
        <h6 className="h6 font-bold">Total</h6>
        <h6 className="h6 font-bold">${roundTill2Decimals(getTotalAmount(cart, cartCount, cartSettings, hourlyCookingCharges, isPickupGrocery, extra_time_charges))}</h6>
      </div>
     
    </div>
  );
}

const StyledDatePicker = styled(DatePicker)`
  /* default */
  .MuiInput-input{
    font-weight: 600;
    font-size: 0.875rem;
    font-family: 'Poppins';
    text-decoration: underline;
    cursor: pointer;
  }
  .MuiInput-underline:before {
    border-bottom: none;
  }
  /* hover (double-ampersand needed for specificity reasons. */
  && .MuiInput-underline:hover:before {
    border-bottom: none;
  }
  /* focused */
  .MuiInput-underline:after {
    border-bottom: none;
  }
`;


const StyledTimePicker = styled(TimePicker)`
/* default */
.MuiInput-input{
  font-weight: 600;
  font-size: 0.875rem;
  font-family: 'Poppins';
  text-decoration: underline;
  cursor: pointer;
}
.MuiInput-underline:before {
  border-bottom: none;
}
/* hover (double-ampersand needed for specificity reasons. */
&& .MuiInput-underline:hover:before {
  border-bottom: none;
}
/* focused */
.MuiInput-underline:after {
  border-bottom: none;
}
`;

// const Wrapper = styled.div`
//   box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.1);
//   border-radius: 10px;
// `;

export default OrderSummary;
