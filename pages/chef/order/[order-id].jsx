import React, { useState, useEffect } from "react";
import Link from "next/link";
import LayoutTwo from "../../../components/layouts/layout-two";
import LocationPin from "../../../components/order/location-pin.svg";
import { roundTill2Decimals } from "../../../utils/cart-calculations";

import Message from "../../../components/order/message.svg";
import OrderIcon from "../../../components/order/order.svg";
import Scheduling from "../../../components/order/scheduling.svg";
import Dollar from "../../../components/order/dollar.svg";
import {
  fetchOrderDetails
} from "../../../services/booking";
import { useRouter } from 'next/router'
import BookingCard from "../../../components/bookingItem";
import { Avatar } from "@material-ui/core";
import AddPayment from '../../../components/modals/add-payment';
import { IMAGE_URL } from "../../../constants/enviroment-vars";
import { parseBookingStartTime, parseBookingEndTime } from '../../../utils/get-time'
import { formatDuration, minutesToHours, set } from "date-fns";
// import handleMessage from "../../../components/handleMessage";
import HandleMessage from "../../../components/handleMessage";
import { orderStatusApi } from "../../../services/ordeStatus-api";
function OrderDetails({orderId}) {

  const [ data, setData ] = useState(null)
  const [ openModal, setOpenModal ] = useState(false)
  const [openMsgModal, setOpenMsgModal] = useState(false)

  const [orderStatus, setOrderStatus] = useState("PLS_REFESH")
  const [chefMobile, setChefMobile] = useState("97845788885")

  const router = useRouter()

  useEffect(() => {
    fetchOrdersData()
     fetchOrderStatus(orderId)
  }, [orderId])

  const fetchOrdersData = async () => {
    // const orderId = router.query['order-id']
    try {
      if (orderId) {
        const response = await fetchOrderDetails(orderId)
        if (response?.success && response?.code === 200) {
          let dataToSave = {
            ...response.data,
            chef_dish: response.data?.chef_dish?.map(item => [item])
          }
          setData(dataToSave)
        }
      }
    } catch (error) {
      console.log('error', error);
    }
    
  }

  const fetchOrderStatus = async ()=>{
    try {
      if (orderId) {
        let payload = {
              _id : orderId
            }
        const response = await orderStatusApi(payload)
        if(response.code == 200 && response?.data.length >0) {
            setOrderStatus(response?.data[0].status)
            setChefMobile(response?.data[0]?.chef_id?.mobile)
         }
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  const handleSetModal = () => setOpenModal(!openModal)
  const handleMsgModalClose = ()=> setOpenMsgModal(!openMsgModal) 
  // const priceFormatter = (amount)=> {
  //   if(amount){
  //     console.log('amount', amount);
  //     return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  //   }
  // };
  function priceFormatter(n) {
    if(n){
      const price = roundTill2Decimals(n)
      // return "$ " + Number(n)?.toFixed(2)?.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      return price
    }
  }
let hours = minutesToHours(data?.total_time)
let minutes = parseInt(Number(data?.total_time)%60)

// console.log('total-time', hours>0 ? hours + " hrs " + (minutes > 0 ?  minutes + " min" : "") : minutes + " min");
const callHandleMsg = ()=>{
  setOpenMsgModal(!openMsgModal)
}
  return (
    <div className="w-11/12 mx-auto pb-10">
    {/* <div className="md:w-7/12 w-11/12 mx-auto pt-32 pb-10"> */}
      {/* <div className="mb-8 text-sm">
      <Link href={`/`}>
        Home
      </Link>
      /
      <Link href={`/chef/bookings`}>
        Booking
      </Link>/ <span className="text-gray-400"> { data?.uniqueOrderId }</span>
      </div> */}

      <div className="flex items-center justify-between border rounded-lg px-4 py-5 w-full mb-5">
        <div className="flex items-center">
          <div className="relative bg-gray-300 rounded-full">
            <Avatar className="md:!h-12 h-10 md:!w-12 w-10" src={IMAGE_URL+data?.chef?.profile_pic}> {data?.chef?.first_name[0]} </Avatar>
          </div>

          <div className="ml-3 flex-col">
            <span className="md:text-xl text-sm font-semibold">{ `${data?.chef?.first_name || ''} ${data?.chef?.last_name || ''}`}</span>
            {
              data?.chefLocation?.length && <div className="md:text-sm text-xs text-gray-500 flex items-center">
              <LocationPin />
              <span className="ml-1">{ data?.chefLocation[0]?.name }</span>
            </div>
            }
          </div>
        </div>

        <button className="flex items-center md:border border-black rounded-lg md:px-4 md:py-2 text-sm font-medium"
         onClick={() => {
            callHandleMsg()
          // router.push(`/chef/messages/${data._id}?cu=${data.consumer_id}&cf=${data?.chef?._id}`)
         }
          }>
          <Message className="mr-2" />
          Message
        </button>
      </div>

      {
        data && <BookingCard className="mb-10 p-5" data={data} waiting={false}/>
      }

      <div className="border rounded-lg px-4 py-5 w-full mt-5">
        <div className="flex md:flex-row flex-col items-center justify-between border-b-2 border-dashed pb-4 mb-5">
          <div className="flex md:items-center">
            <div className="w-1/2 md:w-auto">
              <div className="flex items-center md:text-sm text-xs text-gray-500 md:mb-3 mb-2">
                <OrderIcon className="mr-1" />
                Order ID
              </div>

              <div className="font-medium md:text-base text-sm">{ `${data?.uniqueOrderId || ''}`}</div>
            </div>

            <div className="md:ml-10 w-1/2 md:w-auto">
              <div className="flex items-center md:text-sm text-xs text-gray-500 md:mb-3 mb-2">
                <Scheduling className="mr-1" />
                Booked For
              </div>

              <div className="font-medium md:text-base text-sm">
                {/* { `${data?.bookingStartTime || ''} ${data?.bookingEndTime || ''}`}  */}
                {parseBookingStartTime(data?.bookingStartTime)} to {parseBookingEndTime(data?.bookingEndTime)}
              </div>
            </div>
          </div>

          <div className="flex items-center md:mt-0 mt-5">
            <button className="flex items-center border border-black text-sm font-medium py-2 px-4 rounded-lg" onClick={ handleSetModal }>
              <Dollar className="mr-2" />
              Add Payment
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-3 mb-2">
          <div className="font-medium">Total Time</div>
          {/* <div className="font-medium">{data?.total_time * 60} Mins</div> */}
          <div className="font-medium">{data?.total_time} Mins</div>
        </div>

        <div className="flex justify-between mb-2">
          <div className="flex items-center text-sm">Pick Up Grocery</div>
          {/* <span className="text-sm">$ {data?.grocery_amount}</span> */}
          <span className="text-sm">${priceFormatter(data?.grocery_amount)}</span>


        </div>

        <div className="text-gray-500 mb-6" style={{ fontSize: 10 }}>
          Pickup Charge Does Not Include Cost Of Grocery
        </div>

        <div className="flex justify-between mb-6">
          <div className="flex flex-col">
            <span className="font-medium">Cooking Charges</span>
            <span className="text-sm text-gray-500">(Goes To Chef)</span>
          </div>

          {/* <div>${data?.hourly_cooking_charges * data?.total_time}</div> */}
          {/* <div>${data?.hourly_cooking_charges * data?.total_time/60}</div> */}
          <div>${priceFormatter(data?.hourly_cooking_charges * data?.total_time/60)}</div>

        </div>

        <div className="flex justify-between mb-6">
          <div className="flex flex-col">
            <span className="font-medium">Platform Fee</span>
            <span className="text-sm text-gray-500">(Goes To Chef Joy)</span>
          </div>

          <div>${priceFormatter(data?.platform_fee)}</div>
        </div>

        <div className="flex justify-between border-b pb-3">
          <div className="font-medium">Taxes</div>

          {/* <div>${data?.total_tax}</div> */}
          <div>${priceFormatter(data?.total_tax)}</div>

        </div>

        <div className="flex justify-between mt-3">
          <div className="font-semibold">Total</div>


          {/* <div className="font-semibold">${data?.total_amount}</div> */}
          <div className="font-semibold">${priceFormatter(data?.total_amount)}</div>
        </div>
      </div>
      <AddPayment openModal={openModal} handleModalClose={handleSetModal} />
     {openMsgModal  && <HandleMessage openMsgModal={openMsgModal} apiOrderStatus={orderStatus} chefMobile={chefMobile} handleModalClose={handleMsgModalClose} orderId={orderId} />}
    </div>
  );
}

OrderDetails.getLayout = LayoutTwo;

export default OrderDetails;
