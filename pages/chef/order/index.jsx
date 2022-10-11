import styled from "styled-components";
import useSWR from "swr";

import LayoutTwo from "../../../components/layouts/layout-two";
import OrderSummary from "../../../components/order/order-summary";
import OrderProgress from "../../../components/order/order-progress";
import OrderContents from "../../../components/order/order-contents";
import OrderAddress from "../../../components/order/order-address";
import OrderPayment from "../../../components/order/order-payment";
import OrderSuccess from "../../../components/order/order-success";
import ChButton from "../../../components/base/ch-button";
import { getTotalAmount, getTotalMinutes, roundTill2Decimals } from "../../../utils/cart-calculations";
import { useSnackbar } from "nextjs-toast";
import { addMinutes, differenceInMinutes, subMinutes  } from "date-fns";
import { useDispatch } from "react-redux";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {
  fetchUserAddresses,
  addUserAddress,
  deleteUserAddress,
} from "../../../services/address-api/user";
import { makePayment } from "../../../services/payment-api/user";
import cartHandler from "../../../utils/cart-handler";
import useCart from "../../../custom-hooks/use-cart";
import useChef from "../../../custom-hooks/use-chef";
import useOrderProgress from "../../../custom-hooks/use-order-progess";
import { useEffect, useState } from "react";
import { fetchCart, updateCartCount, getChefAvailability } from "../../../services/cart-api/user";
import { timeConvert } from "../../../services/chef-api";
import { fetchOrderDetails } from "../../../services/booking";

function Order() {
  const {
    data: addresses,
    error,
    mutate,
  } = useSWR("user_addresses", fetchUserAddresses);

  const snackbar = useSnackbar();
  const dispatch = useDispatch();

   const WeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

   const [open, setOpen] = useState(false);
  const [hourlyCookingCharges, setHourlyCookingCharges] = useState(0);
  const [extra_time_charges, setExtraTimeCharges] = useState(0);


   const handleClickOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };
 

  const { cart, mutateCart, cartCount } = useCart();
  const { chef } = useChef();
  const { step, updateStep, hasCompletedStep } = useOrderProgress();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedZipcode, setSelectedZipCode] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [bookingDateEntered, setBookingDateEntered] = useState(false);
  const [orderDetails, setOrderDetails] = useState({})
  const [Above150Minutes, setAbove150Minutes] = useState(true);
  const [serveInCity, setServeInCity] = useState(false);
  const [tax_rate, setTax_rate] = useState(0);
  const [isPickupGrocery, setIsPickupGrocery] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [allDetails, setAllDetails] = useState({})
  const [final_amount, setFinalAmount] = useState(0)
  const [grocery_charges, setGroceryCharges] = useState(0)
  const [platform_fee, setPlatformFee] = useState(0)
  const [taxes, setTaxes] = useState(0)
  const [isHandleYesCalled, setIsHandleYesCalled] = useState(false)
  // const [START_END_TIME_ARRAY, setSTART_END_TIME_ARRAY] = useState(null);
  // const [IndexDate, setIndexDate] = useState(new Date());

  // useEffect(async () => {
  //   const chef_availability = await getChefAvailability(localStorage.getItem('chef_id'))
  //   //check if chef_availability.data.working_day is an array
  //   const weekNos = [];
  //   for (let j = 0; j < chef_availability?.data.length; j++) {
  //    const chef = chef_availability?.data[j];

  //     if ('modified_scedule' in chef) {
  //       for (let i = 0; i < chef.modified_scedule.length; i++) {
  //         const element = chef.modified_scedule[i];
  //         let dateObj = new Date(element.date);
 
 
  //         // check today's date is equal to dateobj
  //         if (dateObj.getDate() ===IndexDate.getDate() && dateObj.getMonth() ===IndexDate.getMonth() && dateObj.getFullYear() ===IndexDate.getFullYear()) {
  //            setSTART_END_TIME_ARRAY([{ start_time: element.start_time, end_time: element.end_time }]);
  //            return
  //         }
  //       }
  //     }

  //      let today_day = IndexDate.getDay();
  //      if (today_day == 0) {
  //       today_day = 7;
  //     }
  //     weekNos.push(chef?.working_day);
  //      if (chef?.working_day === today_day) {
  //       let tempArr = [];
  //       for (let k = 0; k < chef?.routine_schedule.length; k++) {
  //         const element = chef?.routine_schedule[k];
  //         if (element.start_time && element.end_time) {
  //           tempArr.push({ start_time: element.start_time, end_time: element.end_time });
  //         }
  //       }
  //        setSTART_END_TIME_ARRAY(tempArr);
  //      } else if ((chef?.working_day !== today_day) && (!weekNos.includes(today_day)) && (j === chef_availability?.data.length - 1)) {
  //       setSTART_END_TIME_ARRAY(null);
  //      }


  //  }
  // } , [IndexDate]);

  let dish_charges = roundTill2Decimals((getTotalMinutes(cart).totalTime * hourlyCookingCharges / 60) + (extra_time_charges>0 ? extra_time_charges : 0));
  // useEffect(()=>{
  //   if(localStorage.getItem('selectedAddress') && !selectedAddress){
  //     setSelectedAddress(localStorage.getItem('selectedAddress'))
  //   }
  //   localStorage.setItem('selectedAddress', selectedAddress)
  // },[selectedAddress])

  // let total_amount = roundTill2Decimals(getTotalAmount(cart, cartCount, cartSettings, hourlyCookingCharges, isPickupGrocery, extra_time_charges))


  useEffect(async () => {
    let cityId;
    if (chef.serve_city) {
      const addressList = addresses?.data?.filter((address) => address._id === selectedAddress);
      if (addressList.length > 0) {
        cityId = addressList[0].cityId?._id;
      }

    }
    if (cityId && !chef.serve_city.includes(cityId)) {
      snackbar.showMessage("Sorry, the chef does not serve in the selected city. :(", "error");
      setServeInCity(false);
    } else {
      setServeInCity(true);
    }

   

  }, [selectedAddress]);


  useEffect(() => {
    if(step === 0){
      setExtraTimeCharges(0);
    }
  }, [cart]);


  const handleCartBelow150Mins = async (callfromStepButtonFlag) => {
    let updateFlag = callfromStepButtonFlag ? true : false
    if (!localStorage.getItem('startTime')) {
      snackbar.showMessage("Start time not defined. Please Select Start Time to Move Forward", "error", "filled")
      return
    }
    if (!Above150Minutes && extra_time_charges === 0) {
      if (cart.length) handleClickOpen();
      // else snackbar.showMessage(`Psst. Dish(es) you've chosen can be cooked in a jiffy, but you need to book the chef for a minimum of ${settings.min_order_time} mins(${timeConvert(parseInt(settings.min_order_time), true)}) . Add another portion or increase your time?`, "error", "filled");
      else snackbar.showMessage(`Cart is empty. Please add dish(es) to proceed`, "error", "filled");
      return
    }
    // const chef_availability = await getChefAvailability(localStorage.getItem('chef_id'))

    // if (!chef_availability.data) {
    //   snackbar.showMessage("Please book the appointment according to the time slots made available by the Chef :)", "error", "filled");
    //   return
    // }

    // if (!START_END_TIME_ARRAY || START_END_TIME_ARRAY?.length === 0 ) {
    //   snackbar.showMessage("Sorry, the chef is not available in the selected time window. Please book the appointment according to the time slots made available by the Chef. :(", "error", "filled");
    //   return
    // }

    // let start_time = localStorage.getItem('startTime');
    // let end_time = localStorage.getItem('endTime');

    // if (start_time && end_time) {
    //   start_time = new Date(start_time);
    //   end_time = new Date(end_time);

    //   for (let i = 0; i < START_END_TIME_ARRAY.length; i++) {
    //     const element = START_END_TIME_ARRAY[i];
    //     const routine_start_time = element?.start_time;
    //     const routine_end_time = element?.end_time;

    //     const routine_start_time_js = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${routine_start_time}`);
    //     const routine_end_time_js = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${routine_end_time}`);

    //     const routine_start_time_js_hours = routine_start_time_js.getHours();
    //     const routine_start_time_js_minutes = routine_start_time_js.getMinutes();

    //     const routine_end_time_js_hours = routine_end_time_js.getHours();
    //     const routine_end_time_js_minutes = routine_end_time_js.getMinutes();

    //     const start_time_hours = start_time.getHours();
    //     const start_time_minutes = start_time.getMinutes();

    //     const end_time_hours = end_time.getHours();
    //     const end_time_minutes = end_time.getMinutes();

    //     // stitch the time together
    //     const start_time_stitch = `${start_time_hours}:${start_time_minutes}`;
    //     const end_time_stitch = `${end_time_hours}:${end_time_minutes}`;

    //     const routine_start_time_stitch = `${routine_start_time_js_hours}:${routine_start_time_js_minutes}`;
    //     const routine_end_time_stitch = `${routine_end_time_js_hours}:${routine_end_time_js_minutes}`;

    //     if (start_time_stitch >= routine_start_time_stitch && end_time_stitch <= routine_end_time_stitch) {

    //       break;
    //   }

    //     else if ((start_time_stitch < routine_start_time_stitch || end_time_stitch > routine_end_time_stitch) && (i === START_END_TIME_ARRAY.length - 1)) {
    //       snackbar.showMessage("Please book the appointment according to the time slots made available by the Chef :)", "error", "filled");
    //       return
    //     }

    //   }
    // }

    updateFlag ? updateStep(1) : updateStep(step + 1)
  }

  const addAddress = async () => {
    try {
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAddress = (addressId) => {
    var addArr = addresses.data;
    var index = -1;
    index = addArr.findIndex((el) => el._id == addressId);
    addArr.splice(index, 1);
    this.setState({ addresses: addresses });
    deleteUserAddress(addressId)
  };

  const handlePayment = async () => {
    setBtnLoading(true);
    const dishes = cart?.map(item => {
      return {
        serve: item.count,
        // dish_Id: item._id,
        dish_name: item.name,
        dish_Id: item.dish_Id,
        cuisine_Id: item.cuisineId
      }
    })

    const date = JSON.parse(localStorage.getItem('search'))
    const data = {
      stripeCustomerId: selectedPayment.customer,
      paymentMethodId: selectedPayment.id,
      dishes: dishes,
      chef_id: chef.id,
      addressId: selectedAddress,
      bookingStartTime: localStorage.getItem('startTime'),
      bookingEndTime: localStorage.getItem('endTime'),
      grocery: isPickupGrocery,
      // totalTime: getTotalMinutes(cart).totalTime ,
      totalTime: differenceInMinutes(new Date(localStorage.getItem('endTime')), new Date(localStorage.getItem("startTime"))),
      tax_rate: tax_rate,
      is_grocery_picked_up: isPickupGrocery,
      extra_time_charges: extra_time_charges,
      zipcode:selectedZipcode,
      dish_charges: dish_charges,
      total_amount: final_amount,
      platform_fee: platform_fee,
      total_tax: taxes,
      grocery_amount: grocery_charges
    }
    try {
      const response = await makePayment(data)

      if (response?.success && response?.code === 200) {

        const getOrderDetailsForImage = await fetchOrderDetails(response?.data?._id)
        if(getOrderDetailsForImage){
          setAllDetails(getOrderDetailsForImage)
        }

        const { paymentStatus } = response.data
        if (paymentStatus === 'succeeded') {
          snackbar.showMessage(
            response.message,
            "success",
            "filled"
          );
          dispatch({type:"CART_COUNT", payload:0})
          localStorage.removeItem('chef_id')
          setOrderDetails(response.data);
          for (let i = 0; i < cart.length; i++) {
            const element = cart[i];
            const cuisine_id = element.cuisineId;
            updateCartCount({ cuisine_id: cuisine_id, count: 0 }).then(__ => {
              fetchCart().then(res => {
                localStorage.setItem("cart", JSON.stringify(res.data));
              }
              )
              // update cart here
            })
            // localStorage.setItem('cart', JSON.stringify(localStorage.getItem('cart').filter(item => item._id !== element._id)))
          }
          updateStep(step + 1)
        }
      }
    }
    // catch(ex){
    //   //handle exception
    // }
    finally {
      setBtnLoading(false);
    }
  }

  const [settings, setSettings] = useState({
    platform_fee: 0,
    pick_up_charges: 0,
    tax_rate: 0,
    min_order_time: 0,
  })

  const canProceed = () => {
    if (bookingDateEntered) {
      if (step === 0) {
        return cart.length ? true : false;
      }

      if (step === 1) {
        return selectedAddress !== ""
      }

      if (step === 2) {
        return selectedPayment ?
          true : false;
      }
    }
    return false;
  };

  const handleYes = () => {
    setIsHandleYesCalled(true)
    const extra_time = parseInt(settings.min_order_time) - (parseInt(getTotalMinutes(cart).totalTime))
    const extra_amount = parseFloat(extra_time * parseFloat(hourlyCookingCharges) / 60)
    setExtraTimeCharges(extra_amount)
    let endTime = localStorage.getItem("endTime")
    localStorage.setItem("endTime", addMinutes(new Date(endTime), extra_time));
    updateStep(step + 1)
    handleClose()
  }

  useEffect(()=>{
    if(step === 1 || step === 2){
    if(!isHandleYesCalled){
      const extra_time = parseInt(settings.min_order_time) - (parseInt(getTotalMinutes(cart).totalTime))
      const extra_amount = parseFloat(extra_time * parseFloat(hourlyCookingCharges) / 60)
      if(extra_amount > 0){
        setExtraTimeCharges(extra_amount)
      }
      let endTime = localStorage.getItem("endTime")
      let startTimes =  localStorage.getItem("startTime")
      let differenceMinutes = differenceInMinutes(new Date(endTime), new Date(startTimes))
if(Number(differenceMinutes)==Number(settings.min_order_time) ){
  console.log("no update in end time");
}else{
  if(Number(extra_time)>0 || Number(extra_time) == 0){
    localStorage.setItem("endTime", addMinutes(new Date(endTime), extra_time));
  }
}
    }
    }

    if(step == 0){
      const extra_time = parseInt(settings.min_order_time) - (parseInt(getTotalMinutes(cart).totalTime))
      const extra_amount = parseFloat(extra_time * parseFloat(hourlyCookingCharges) / 60)
      if(extra_amount > 0){
        setExtraTimeCharges(0)
      }
      console.log('extra-time', extra_time);
      let endTime = localStorage.getItem("endTime")
      let startTimes =  localStorage.getItem("startTime")
      let differenceMinutes = differenceInMinutes(new Date(endTime), new Date(startTimes))
        if(Number(differenceMinutes)==Number(settings.min_order_time) ){
            if(extra_time > 0){
              localStorage.setItem("endTime", subMinutes(new Date(endTime), extra_time));
            }
        }
    }
  },[step])

  if (step === 3) {
    return (
      <div>
        <OrderSuccess orderDetail={orderDetails} allDetails={allDetails} />
      </div>
    );
  }

  const handleTotalAmount = (amount)=>{
    setFinalAmount(amount)
  }
  const handleGroceryCharges = (groceryAmount)=>{
    setGroceryCharges(groceryAmount)
  }
  const handleTaxes = (tax)=>{
    setTaxes(tax)
  }
  const handlePlatformFee = (platformFee)=>{
    setPlatformFee(platformFee)
  }

// console.log('platformFee', platform_fee);
// console.log('final_amount', final_amount);
// console.log('grocery_charges', grocery_charges);
// console.log('taxes', taxes);
  return (
    <div className="wrapper pt-20 md:pt-28 pb-10">
      <div className="md:w-7/12 w-11/12 mx-auto">
        <OrderProgress
          step={step}
          updateStep={updateStep}
          hasCompletedStep={hasCompletedStep}
          handleCartBelow150Mins={handleCartBelow150Mins}
        />
      </div>

      <div className="flex md:flex-row flex-col lg:gap-8 md:gap-8">
        <div className="lg:basis-8/12 md:basis-6/12	">
          {step === 0 && (
            <OrderContents
              cart={cart}
              chef={chef}
              // START_END_TIME_ARRAY={START_END_TIME_ARRAY}
              // WeekDays={WeekDays}
              // IndexDate={IndexDate}
              handleCart={(actionType, dishId, cuisineId) =>
                cartHandler(actionType, dishId, cuisineId, cart, mutateCart, localStorage.getItem('chef_id'))
              }
            />
          )}

          {step === 1 && (
            <OrderAddress
              addresses={addresses}
              addAddress={addAddress}
              deleteAddress={deleteAddress}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              setSelectedZipCode={setSelectedZipCode}
            />
          )}

          {step === 2 && <OrderPayment paymentSelected={setSelectedPayment} />}
        </div>

        <div className="lg:basis-4/12 md:basis-6/12	 lg:mt-0 mt-12">
          <h4 className="h4">Summary</h4>

          <OrderSummary chef_time={timeConvert(parseInt(settings.min_order_time), true)} extra_time_charges={extra_time_charges} hourlyCookingCharges={hourlyCookingCharges} setHourlyCookingCharges={setHourlyCookingCharges} settings={settings} setSettings={setSettings} step={step} cart={cart} chef={chef} cartCount={cartCount} bookingDateChange={setBookingDateEntered} Above150Minutes={Above150Minutes} setAbove150Minutes={setAbove150Minutes} isPickupGrocery={isPickupGrocery} setIsPickupGrocery={setIsPickupGrocery} setTax_rate={setTax_rate} setIsChecked={setIsChecked} isChecked={isChecked} handleTotalAmount={handleTotalAmount} handleGroceryCharges={handleGroceryCharges} handlePlatformFee={handlePlatformFee} handleTaxes={handleTaxes} />

          <ChButton
            style={{
              cursor: step == 0 ? "pointer" : (!canProceed() || btnLoading || (step == 1 ? !serveInCity : false)) ? "default" : "pointer",
            }}
            className={`w-full ${(step == 0 ? true : (canProceed() && (step == 1 ? serveInCity : true)))
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }  flex justify-center py-3 mt-7 font-medium ld-over ${btnLoading ? 'running' : ''}`
            }
            disabled={step == 0 ? false : ( !canProceed() || btnLoading || (step == 1 ? !serveInCity : false))}
            hasIcon={canProceed() || (step == 1 ? serveInCity : true)}
            onClick={() => {
              return step == 2 ? handlePayment() : step == 0 ? handleCartBelow150Mins(false) : updateStep(step + 1)
            }}
          >
            <div className="ld ld-ring ld-spin-fast"></div>
            Proceed
          </ChButton>
        </div>
      </div>
      <Dialog
        open={open && extra_time_charges === 0}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ 
          borderRadius: "30px", 
          '& .MuiPaper-root': {
            border: "2px solid rgb(226, 54, 68) !important"
          },
       }}
        // PaperProps={{ style: { border: "2px solid rgb(226, 54, 68) !important" } }}

      >
        <DialogTitle id="alert-dialog-title" className="font-medium">
          {`The order doesn't meet the minimum time requirement.`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="font-medium">
          Psst. Dish(es) you have chosen can be cooked in a jiffy, but we take a minimum order worth of {timeConvert(parseInt(settings.min_order_time), true)} of cooking time. 
          <br /> <br />
          Pick another dish or we can charge the minimum time required to complete an order.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#E23644" }} onClick={handleClose}>Add Dishes</Button>
          <Button sx={{ color: "#E23644" }} onClick={handleYes} autoFocus>
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
}

// const OrderSummaryWrapper = styled.div`
//   width: 100%;

//   @media screen and (min-width: 768px) {
//     width: 28%;
//   }
// `;

Order.getLayout = LayoutTwo;

export default Order;
