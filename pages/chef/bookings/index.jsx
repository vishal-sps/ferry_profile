import { useEffect, useState } from "react";

import BookingCard from "../../../components/bookingItem";
import LayoutTwo from "../../../components/layouts/layout-two";
import { fetchChefBookings } from "../../../services/booking";
import CancelBooking from '../../../components/modals/cancelBooking';
import AddPayment from '../../../components/modals/add-payment';

function Booking() {

  const [bookings, setBookings] = useState([]);
  const [ openModal, setOpenModal ] = useState(false)
  const [ openCancelModal, setOpenCancelModal ] = useState({
    status: false,
    orderId: null
  })

  const [activeTab, setActiveTab] = useState([
    {
      name: 'All',
      code: 'all',
      active: true
    },
    {
      name: 'Ongoing',
      code: 'ongoing',
      active: false
    },
    {
      name: 'Pending',
      code: 'pending',
      active: false
    },
    {
      name: 'Completed',
      code: 'completed',
      active: false
    }
  ])

  useEffect(() => {
    fetchBookings()
  }, [activeTab])


  const fetchBookings = async () => {
    const activetab = activeTab.find(item => item.active)
    let response = await fetchChefBookings(`status=${activetab.code}`)
    if (response?.success && response.code === 200) {
      setBookings(response.data)
    }
  }

  const handleActiveTab = (item, index) => {
    activeTab.forEach((tab, indx) => {
      if (index === indx) {
        tab.active = true
      } else {
        tab.active = false
      }
    })
    setActiveTab([ ...activeTab ])
  }

  const handleCancelModal = (arg) => {
    setOpenCancelModal({
      ...openCancelModal,
      ...arg
    })
  }

  return (
    <div className="w-11/12 lg:w-3/5 mx-auto pt-32 pb-10">

      <div className="flex flex-col lg:flex-row lg:items-center items-start justify-between mb-8">
        <h1 className="text-2xl font-semibold mb-2">My Bookings</h1>
        <div className="my-5 lg:my-0">
          {
            activeTab.map((item, index) => <span className={`${item.active ? 'text-red-500 border-red-200' : 'border-gray-200' } ${index !== 0 && 'ml-2'} cursor-pointer border lg:border-none p-2 rounded`} onClick={() => handleActiveTab(item, index)} key={index + 'tabs'}> {item.name} </span>)
          }
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {
          bookings
          ?.sort((a,b)=>(new Date(b.bookingStartTime)-new Date(a.bookingStartTime)))
          .map((item, index) =>  <BookingCard className="mb-10 p-5" key={'card'+ index} handleCancelModal={handleCancelModal} data={ item } fetchBookings={ fetchBookings } />)

          // bookings?.map((item, index) =>  <BookingCard className="mb-10 p-5" key={'card'+ index} handleCancelModal={handleCancelModal} data={ item } fetchBookings={ fetchBookings } />)
        }
      </div>
      <CancelBooking openModal={openCancelModal.status} handleCancel={ handleCancelModal } orderId={ openCancelModal.orderId } fetchBookings={ fetchBookings } />
    </div>
  );
}

Booking.getLayout = LayoutTwo;

export default Booking;
