import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {IconButton} from "@material-ui/core";
import { IMAGE_URL } from "../../constants/enviroment-vars";
import CheckMark from "./check-mark.svg";
import More from "./more.svg";
import Message from "./message.svg";
import OrderIcon from "./order.svg";
import Scheduling from "./scheduling.svg";
import FakeCalender from "./fake-calender.svg";
import LocationPin from "./location-pin.svg";
import { Avatar } from "@material-ui/core";
import { parseBookingStartTime, parseBookingEndTime } from '../../utils/get-time'
import { myLoader } from "../../services/custom_loader";
import Button from "@material-ui/core/Button";
import OrderModal from "../../components/modal/orderModal"
import HandleMessage from "../handleMessage";
import { orderStatusApi } from "../../services/ordeStatus-api";
function Order({ orderDetail, allDetails }) {

  let [ openModal, setOpenModal ] = useState(0)
  useEffect(() => {
    // localStorage.removeItem("cart");
    localStorage.removeItem("completedSteps");
    localStorage.removeItem("currentStep");
    localStorage.removeItem("chef");
    fetchOrderStatus(orderDetail._id)
  }, []);

  const [orderStatus, setOrderStatus] = useState("PLS_REFESH")
  const [chefMobile, setChefMobile] = useState("97845788885")

  const [openMsgModal, setOpenMsgModal] = useState(false)
  const callHandleMsg = ()=>{
    setOpenMsgModal(!openMsgModal)
  }


  const fetchOrderStatus = async (orderId)=>{
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

  const handleMsgModalClose = ()=> setOpenMsgModal(!openMsgModal) 
  return (
    <div className="md:w-7/12 w-11/12 mx-auto pt-20 pb-10 flex flex-col items-center">
      <CheckMark className="md:w-24 w-16" />

      <h1 className="h4 my-4">
        Chef Booked
      </h1>

      <div className="flex flex-col items-center md:items-stretch justify-between border-2 rounded-lg px-2 py-4 w-full mb-5">
        <div className="flex gap-2 items-center mb-2 w-full">
          <div className="relative bg-gray-300 rounded-full">
            <Avatar className="md:!h-12 h-10 md:!w-12 w-10" src={IMAGE_URL + orderDetail?.chef?.profile_pic}> { orderDetail?.chef?.first_name[0]} </Avatar>
          </div>

          <div className="flex flex-col gap-1 basis-full">
            <div className="flex justify-between items-center">
            <h6 className="h6"> {`${orderDetail?.chef?.first_name} ${orderDetail?.chef?.last_name}`} </h6>
            {/* <p className="text-xs font-medium">457984561259</p> */}
            {/* <Link href={`/chef/messages/${orderDetail?._id}`}> */}
          <button className="flex items-center relative top-3"  onClick={() => {
            callHandleMsg(true)
         }} >
            <Message className="scale-150" />
            <span className="text-black font-semibold underline ml-2">Message</span>
          </button>
          {/* </Link> */}
            </div>

            <div className="flex justify-between items-center">
            <p className="text-xs flex items-center">
              <LocationPin className="scale-75 -ml-1" />
              <span>{orderDetail?.chef?.chefLocation?.name}</span>
            </p>
            {/* <p className="text-xs font-medium text-gray-500">89, Sula Street, CA-94601</p> */}

            </div>
          </div>
        </div>


{/* <div className="border-t-2 pt-3 text-center w-full">
<Link href={`/chef/messages/${orderDetail?._id}`}>
          <button className="flex items-center mx-auto">
            <Message className="scale-150" />
            <span className="text-black font-semibold underline ml-2">Message</span>
          </button>
        </Link>
</div> */}
      </div>

     

      <div className="relative border-2 rounded-lg px-3 md:py-5 md:px-5 pt-4 pb-6 w-full mb-5">
        <div className="flex flex-col md:items-stretch md:justify-between border-b-2 border-dashed pb-4 mb-5">
          <div className="flex flex-col md:items-stretch">
            <div className="mb-4">
              <div className="flex justify-between items-start gap-1">
                <div className="order-text">
                <div className="flex items-center md:text-sm text-xs font-medium text-gray-500  md:mb-3 mb-2">
                <OrderIcon className="mr-1" />
                Order ID
              </div>

              <p className="p font-semibold">{orderDetail?.uniqueOrderId}
            </p>
                </div>
                <div className="flex items-center">
            <div className="bg-gray-100 text-gray-500 md:text-sm text-xs font-medium py-2 px-3 rounded-lg -mr-2">
              Waiting for Confirmation
            </div>
            <IconButton className="-mr-3">
            <More />
            </IconButton>
                </div>
              </div>
              
            </div>

            <div className="mt-4">
              <div className="flex items-center md:text-sm text-xs font-medium text-gray-500 md:mb-3 mb-2">
                <Scheduling className="mr-1" />
                Booked For
              </div>

              <p className="p font-semibold">
                { parseBookingStartTime(orderDetail?.bookingStartTime) } to { parseBookingEndTime(orderDetail.bookingEndTime) }
              </p>
            </div>
          </div>

        
        </div>
   <div className="flex items-center">

      <div className="flex-1">
        {allDetails?.data?.chef_dish
          // orderDetail?.dishes?.
          .map((item, index) => (
            <div className="flex md:flex-row flex-col md:justify-between mb-3" key={'dish' + index}>
              {/* {console.log("******", item)} */}
              <div className="flex items-center gap-4 md:basis-2/4">
                <div className="relative bg-gray-200 rounded-lg basis-1/3 h-24 overflow-hidden">
                  <Image
                    src={`${IMAGE_URL}${item.images[0]}`}
                    alt="cart-dish"
                    layout="fill"
                    loader={myLoader}
                  />
                </div>

                <div className="w-full basis-2/3">
                    <h6 className="h6 mb-1 font-semibold">
                      {item.name}
                    </h6>
                    <p className="text-gray-500 md:text-base text-sm">
                      {item.serve} Servings
                    </p>
                  </div>

              </div>
            </div>
          ))
        }
      </div>
        
          <div className="flex justify-center md:mt-0 mt-10">
                    <h5 className="h5 font-medium">
                    Total
                    <span className="text-red-500 font-bold ml-1">${allDetails?.data?.total_amount}</span>
                    </h5>
          </div>

      </div>
       
        <div className="flex justify-center md:mt-10 mt-2">
          {/* <Link href={`/chef/order/${orderDetail._id}`}>
            <a className="link">View Order</a>
          </Link> */}
          <a className="link" onClick={()=>setOpenModal(prev=>prev + 1)}>View Order</a>
          {/* <Button onClick={()=>setOpenModal(prev=>prev + 1)}>scroll=paper</Button> */}
        </div>
      </div>
      {<OrderModal openModal={openModal} orderId={orderDetail._id}/>}
      {openMsgModal  && <HandleMessage openMsgModal={openMsgModal} apiOrderStatus={orderStatus} chefMobile={chefMobile} handleModalClose={handleMsgModalClose} orderId={orderDetail._id} />}
      {/* <div className="md:border w-full rounded-lg md:py-5 md:px-5 md:mt-0 mt-5">
        <h4 className="h4">
          Add Recurring Meal
        </h4>
        <div className="flex md:flex-row flex-col">
          <div className="md:w-1/2 md:pr-8">
            <FakeCalender />
          </div>

          <div className="md:w-1/2 md:mt-0 mt-5 flex flex-col justify-between">
            <div>
            <h6 className="h6 mb-2">
              Select multiple dates from calendar & select time for booking.
            </h6>

            <p className="mb-4 text-gray-500 p">Available time for <span className="text-black font-medium">March 14, 2021 </span> </p>

            <div className="flex items-center">
              <span className="mr-2 text-gray-500">FROM</span>
              <input type="time" className="border rounded-lg px-3 py-1" />
            </div>
            </div>

            <button className="btn btn-black btn-icon w-full mt-8">
            <span className="material-icons-outlined">
               search
            </span>
              Search
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Order;
