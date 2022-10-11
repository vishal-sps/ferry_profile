import React, { useState } from "react";
import Image from "next/image";
import { Icon, Menu, MenuItem } from '@material-ui/core'
import { IMAGE_URL } from "../constants/enviroment-vars";
import { useRouter } from "next/router";
import { parseBookingStartTime, parseBookingEndTime } from '../utils/get-time'
import { myLoader } from "../services/custom_loader";
import OrderModal from '../components/modal/orderModal'

function BookingItem({ data, handleCancelModal, waiting, ...rest  }) {
  const [menuOpen, setOpenMenu] = useState(null);
  const [ openModal, setOpenModal ] = useState(false)

  const handleOpen = (e) => {
    setOpenMenu(e.currentTarget)
  }

  let waitingShow = (waiting==false) ? waiting : true
  const getStatus = () => {
    if (data.status === 'assigned') {
      return {
        text: 'Waiting For Confirmation',
        class: 'bg-gray-100 text-gray-400'
      }
    } else if (data.status === 'cooking') {
      return {
        class: 'text-yellow-500 bg-yellow-100'
      }
    }
    else if (data.status === 'cancelled') {
      return {
        class: 'text-red-500 bg-red-100',
        text: 'Booking Cancelled'
      }
    }
    return null
  }

  const handleCancel = () => {
    if (handleCancelModal) handleCancelModal({
      status: true,
      orderId: data._id
    })
  }

  const router = useRouter();

  return (
    <div
      className="border border-1 rounded-xl p-6 w-full"
    >
      {waitingShow && 
      <div className="flex items-start lg:items-center justify-between mb-5 border-b pb-4 border-dashed">
        <div className="flex flex-col lg:flex-row items-center justify-start">
          <div className="grid w-full lg:w-auto">
            <div className="flex items-center text-gray-500 mb-3">
              <Icon className="material-icons-outlined">
                description_outline
              </Icon>
              <span className="text-xs ml-2"> Order ID</span>
            </div>
            <span className="text-base font-medium"> { data?.uniqueOrderId || '' } </span>
          </div>
          <div className="grid lg:ml-12 mt-5 lg:mt-0">
            <div className="flex items-center text-gray-500 mb-3">
              <Icon className="material-icons-outlined">
                calendar_today
              </Icon>
              <span className="text-xs ml-2">{'Booked for'}</span>
            </div>
            <span className="text-base font-medium whitespace-nowrap">
              { parseBookingStartTime(data?.bookingStartTime) } to { parseBookingEndTime(data?.bookingEndTime) }
            </span>
          </div>
        </div>
        <div className="flex items-center relative">
          <div className={`p-2 rounded text-center text-sm mr-2 ${getStatus()?.class}`}>
            {getStatus()?.text}
          </div>
          <Icon onClick={handleOpen}>
            more_vert
          </Icon>
          <Menu
            id="simple-menu"
            anchorEl={menuOpen}
            keepMounted
            open={Boolean(menuOpen)}
            onClose={() => setOpenMenu(!menuOpen)}
          >
            {/* <MenuItem onClick={() => router.push(`/chef/order/${data?._id}`)}> */}
            <MenuItem onClick={() => setOpenModal(prev=>prev+1)}>
              <Icon className="mr-4">
                view_in_ar
              </Icon>
              Order Detail
            </MenuItem>
            <MenuItem>
              <Icon className="mr-4">
                help_outline
              </Icon>
              Support / Help
            </MenuItem>
            {
              data.status !== 'cancelled' && <MenuItem
                classes={{
                  root: 'red-text'
                }}
                onClick={handleCancel}
              >
                <Icon className="mr-4 text-red-500">
                  highlight_off
                </Icon>
                Cancel
              </MenuItem>
            }
          </Menu>
        </div>
      </div>
      }
      <div className="flex items-start justify-between lg:flex-row flex-col">
        <div>
          {
            data?.chef_dish?.map((item, index) => (
              <div className="flex flex-col lg:flex-row items-start justify-between mb-5" key={item[0]?._id}>
                <div className="flex items-center" style={{cursor:"pointer"}} onClick={()=> {
                  waitingShow && setOpenModal(prev=>prev+1)
                } }>
                  <div className="rounded h-16 w-16 relative">
                    <Image
                      src={`${IMAGE_URL}${item[0]?.images[0]}`}
                      alt="dish-image"
                      layout="fill"
                      className="rounded"
                      objectFit="cover"
                      loader={myLoader}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h3 className="text-xl font-bold mb-2"> {item[0]?.name} </h3>
                      {/* {
                        index === 0 && <div className="ml-8 items-center hidden lg:flex" onClick={ () => router.push(`/chef/messages/${data._id}?cu=${data.consumer_id}&cf=${item[0]._id}`)}>
                          <Icon className="material-icons-outlined sm:text-base">
                            maps_ugc
                          </Icon>
                          <span className="underline text-sm ml-2"> View Conversation </span>
                        </div>
                      } */}
                    </div>
                    <span className="text-sm"> {item[0]?.serve} Servings </span>
                  </div>
                </div>
                
                {/* {
                  /////// remove the view-conversation in ticket c/TeGlP1WK ////////////////
                        index === 0 && <div className="ml-8 items-center hidden lg:flex" onClick={ () => router.push(`/chef/messages/${data._id}?cu=${data.consumer_id}&cf=${item[0]._id}`)}>
                          <Icon className="material-icons-outlined sm:text-base">
                            maps_ugc
                          </Icon>
                          <span className="underline text-sm ml-2"> View Conversation </span>
                        </div>
                      } */}
              </div>
            ))
          }
        </div>
        {waitingShow ? <div className="text-lg font-medium my-5 w-full text-center lg:my-0 lg:w-auto">
          Total <span className="text-red-500 font-bold"> $ {data?.total_amount} </span>
        </div> : ""}
      </div>
      {/*
       /////// remove the view-conversation in ticket c/TeGlP1WK ////////////////
      <div className="items-center flex w-full text-center lg:hidden justify-center">
        <Icon className="material-icons-outlined sm:text-base">
          maps_ugc
        </Icon>
        <span className="underline text-sm ml-2"> View Conversation </span>
      </div> */}
      {
        !waitingShow &&
         <div className="text-lg font-medium my-5 w-full text-center lg:my-0 lg:w-auto">
         Total <span className="text-red-500 font-bold"> $ {data?.total_amount} </span>
       </div>
      }
     
      {<OrderModal openModal={openModal} orderId={data?._id}/>}
    </div>
  );
}

export default BookingItem;
