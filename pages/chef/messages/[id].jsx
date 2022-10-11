import { Icon, Avatar, Box, TextareaAutosize, Button, Typography } from "@material-ui/core";
import MessageDetailItem from '../../../components/messageDetailItem';
import Image from "next/image";
import router from "next/router";
import { AddMessage, getRealTimeConversations } from '../../../utils/firebase'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { onSnapshot } from 'firebase/firestore'
import {
  fetchOrderDetails
} from "../../../services/booking";
import useUser from "../../../custom-hooks/use-user";
import { IMAGE_URL } from "../../../constants/enviroment-vars";
import { myLoader } from "../../../services/custom_loader";

const MessageDetail = () => {
  const router = useRouter();
  const [ message, setMessage ] = useState('')
  const [ messagesArray, setMessagesArray ] = useState([])
  const [ orderDetail, setOrderDetail ] = useState({})
  const { user } = useUser();
  const orderId = router.query['id']
  const chefId = router.query['cf']
  const consumerId = user?.data?._id || router.query['cu']

  useEffect(() => {
    fetchOrdersData()
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await getRealTimeConversations(orderId)
    if (data.data?.length) {
      setMessagesArray(data.data)
    }
    onSnapshot(data.query, (querySnapshot) => {
      let snapData = querySnapshot.docs.map(doc => {
        return {
          ...doc.data(),
          timeStamp: doc.id
        }
      })
      setMessagesArray(snapData)
    })
  }

  const fetchOrdersData = async () => {
    if (orderId) {
      const response = await fetchOrderDetails(orderId)
      if (response?.success && response?.code === 200) {
        setOrderDetail(response.data)
      }
    }
  }

  const sendMessage = () => {
    console.log(consumerId, chefId)
    let data = {
      id: orderId,
      orderId: orderId,
      senderId:consumerId,
      receiver: chefId,
      message
    }
    if (message) {
      const sendmsg = AddMessage(data)
      if (sendmsg) setMessage('')
    }
  }

  const getSenderInfo = (msg) => {
    let dictV = {}
    if (msg?.senderId === user?.data?._id) {
      dictV.name = user.data.first_name
      dictV.img = user.data.profile_pic
    } else {
      dictV.name = `${orderDetail?.chef?.first_name} ${orderDetail?.chef?.last_name}`
      dictV.img = orderDetail.chef.profile_pic
    }
    return dictV
  }

  return (
    <div className="w-11/12 mx-auto pt-32 pb-10">
      <div className="grid grid-cols-6 gap-10">
        <div className="lg:col-span-4 col-span-6">
          <div className="flex items-center mb-10" onClick={() => router.push('/chef/messages')}>
            <div className="bg-gray-300 rounded-full p-1 h-8 w-8 flex items-center">
              <Icon>
                chevron_left
              </Icon>
            </div>
            <h1 className="text-2xl font-semibold ml-4">Messages</h1>
          </div>
          {
            messagesArray?.length ? messagesArray.map((item, index) => <MessageDetailItem info={ getSenderInfo(item) } data={item} key={item.timeStamp + index} />) :
            <div className="h-12 flex items-center justify-center my-[48px]">
              <h1 className="text-4xl font-bold"> No messages yet </h1>
            </div>
          }
          <h1 className="text-2xl font-semibold mb-5">Your Message</h1>
          <TextareaAutosize
            aria-label="text-area"
            placeholder="Enter your message here..."
            maxRows={4}
            value={ message }
            onChange={(e) => setMessage(e.target.value)}
            className="outline-none border border-gray-200 p-4 rounded w-full mb-16"
          />
          <Button
            variant="contained"
            classes={{ colorInherit: 'black-btn', root: 'big-btn' }}
            color="inherit"
            onClick={ sendMessage }
          >
            Send Message
          </Button>
        </div>
        <div className="col-span-6 lg:col-span-2">
          <Box className=" border border-gray-200 p-4 rounded-lg sticky top-20">
            <Box className="flex items-center justify-between mb-5">
              <h1 className="text-2xl font-semibold">Order</h1>
              <span className="px-4 py-2 rounded-lg bg-gray-200 text-gray-500 text-sm">Waiting For Confirmation</span>
            </Box>
            <Box className="flex items-center justify-start mb-6">
              <Avatar className="big-avtar">M</Avatar>
              <Box className="grid ml-5">
                <h2 className="text-lg font-bold mb-2">
                  { `${orderDetail?.chef?.first_name} ${orderDetail?.chef?.last_name}` }
                </h2>
                {
                  orderDetail?.chefLocation?.length && <span className="text-sm font-light flex items-center justify-start">
                  <Icon className="mr-1 text-base">
                    location_on_outline
                  </Icon>
                  { orderDetail?.chefLocation[0]?.name }
                </span>
                }
              </Box>
            </Box>
            <Box className="mb-8">
              <Box className="flex items-center text-gray-400 mb-2 text-xs">
                <Icon className="mr-2 text-base">
                  calendar_today_on_outline
                </Icon>
                Date
              </Box>
              <Box className="font-medium">
                { `${orderDetail?.bookingStartTime} to ${orderDetail?.bookingEndTime}` }
              </Box>
            </Box>
            <Box>
              <Box className="font-semibold mb-2"> Dishes ({ orderDetail?.chef_dish?.length }) </Box>
              {
                orderDetail?.chef_dish?.length && 
                <div className="flex items-center">
                  <Box className="rounded h-16 w-16 relative">
                    <Image
                      src={`${IMAGE_URL}${orderDetail?.chef_dish[0]?.images[0]}`}
                      alt="dish-image"
                      layout="fill"
                      className="rounded"
                      objectFit="cover"
                      loader={myLoader}

                    />
                  </Box>
                  <Box className="ml-4">
                    <h3 className="text-lg font-bold mb-2"> { orderDetail?.chef_dish[0].name } </h3>
                    <span className="text-sm"> { orderDetail?.chef_dish[0].serve } Servings </span>
                  </Box>
                </div>
              }
              {
                orderDetail?.chef_dish?.length > 1 && <Box className="text-red-600 font-semibold text-center text-base w-full mt-3 cursor-pointer">
                +{orderDetail?.chef_dish?.length - 1} More Dishes
              </Box>
              }
              <Box className="flex items-center justify-between mb-3 mt-8">
                <Box>
                  Total Hours
                </Box>
                <Box className="text-red-600 font-medium">
                  { orderDetail?.total_time } Hours
                </Box>
              </Box>
              <Box className="flex items-center justify-between text-2xl font-bold mb-8">
                <Box>
                  Total
                </Box>
                <Box className="text-red-600">
                  $ { orderDetail?.total_amount }
                </Box>
              </Box>
              <Button
                variant="contained"
                classes={{ colorInherit: 'black-btn', root: 'big-btn w-full' }}
                color="inherit"
                onClick={() => router.push(`/chef/order/${orderDetail?._id}`)}
              >
                View Order
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default MessageDetail;