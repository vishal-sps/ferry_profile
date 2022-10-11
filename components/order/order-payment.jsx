import { useState, useRef, useEffect } from "react";
import OrderCard from "./order-card";
import { GetCardAPI, AddCardAPI, DeleteCardAPI } from '../../services/cards'
import PaymentCardItem from './stripe-card'
import DeleteModal from "../modals/DeleteModal";
import PaypalIcon from "../../public/assets/images/paypal.png";
import { IconButton } from "@material-ui/core";
import { useSnackbar } from "nextjs-toast";

function OrderPayment(props) {
  const snackbar = useSnackbar();

  const cardRef = useRef()

  const [cards, setCards] = useState([]);

  const [selectedPayment, setSelectedPayment] = useState();

  const [showNewPayment, setShowNewPayment] = useState(false);
  const [showCardInput, setCardInput] = useState(false);
  const [showApplePayInput, setApplePayInput] = useState(false);
  const [showPayPalInput, setPayPalInput] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [last4, setLast4] = useState([]);
  
  const [openDelete, setOpenDelete] = useState({
    open: false,
    data: null
  });

  const [yesButtonLoading, setYesButtonLoading] = useState(false);

  const handleClose = () => {
    setOpenDelete({
      ...openDelete,
      open: false
    })
  }


  useEffect(() => {
    getCardsFromAPI()
  }, [])

  const handleModal = (data) => {
    if (data) setOpenDelete({
      open: true,
      data: data
    })
  }

  const getCardsFromAPI = async () => {
    const response = await GetCardAPI()
    if (response?.code === 200 && response?.data?.data) {
      let last4New = [];
      for (let i = 0; i < response.data.data.length; i++) {
        const element = response.data.data[i];
        last4New.push(element.card.last4)
      }
      setLast4(last4New)
      setCards(response.data.data)
    }
  }

  const handleAddCard = async () => {
    setBtnLoading(true);
    try{
    const data = await cardRef.current.handleSubmit();
    if (data?.id) {
      let last4New = [];
      for (let i = 0; i < cards.length; i++) {
        const element = cards[i];
        last4New.push(element.card.last4)
      }
      if (last4New.includes(data.card.last4)) {
        snackbar.showMessage("Card already added.", "error", "filled")
      } else {
      const response = await AddCardAPI({ cardHashToken: data.id })
      if (response?.code === 200 && response.success) {
        cards.push(response.data)
        setCards(cards)
        setShowNewPayment(false)
      }
    }
    }
  }
    // catch(ex){
    //   //handle exception
    // }
    finally{
      setBtnLoading(false);
    }
  }

  const handleSelectPayment = async (item) => {
    setSelectedPayment(item.id)
    props?.paymentSelected({
      customer: item.customer,
      id: item.id
    })
  }

  const handleDelete = async () => {
    setYesButtonLoading(true)
    await DeleteCardAPI({cardId: openDelete.data.id})
    await getCardsFromAPI()
    setYesButtonLoading(false)
    setOpenDelete({ open: false, data: null })
  }

  const toggleHide = (paymentType) => {
    
    if (paymentType === 'card')
      setCardInput(!showCardInput)
    if (paymentType === 'applepay')
      setApplePayInput(!showApplePayInput)
    if (paymentType === 'paypal')
      setPayPalInput(!showPayPalInput)
  }

  return (
    <div>
      <h4 className="h4 border-b pb-2 border-gray-300">Added Payment Methods </h4>

      <h6 className="h6 mb-2">
        Cards
      </h6>

      {cards.length ? (
        <>
          {cards.map((card, index) => (
            <OrderCard
              data={card}
              key={index}
              selected={selectedPayment}
              handleModal={handleModal}
              setSelected={() => handleSelectPayment(card)}
            />
          ))}
        </>
      ) : (
        <div>No cards</div>
      )}

      {!showNewPayment && (
        <div className="flex justify-center md:mt-10">
          <button
            className="btn btn-black btn-lg"
            onClick={() => setShowNewPayment(true)}
          >
            New Payment Method
          </button>
        </div>
      )}

      {showNewPayment && (
        <div className="mt-8">
          <h4 className="h4 mb-4">
            Add Payment Method</h4>
          <div className="payment-method mt-4 border rounded-lg grid grid-cols-12 gap-x-4 gap-y-5 p-4">
            <div className="col-span-12">
              <div className="flex justify-between items-center">
                <p className="font-semibold flex gap-2 items-center">
                  <span className="material-icons-outlined text-gray-600">payment</span>Cards</p>

                  <IconButton className='h-10 w-10'>
                  <span className="material-icons-outlined" onClick={() => toggleHide('card')}>
                    {showCardInput ? 'remove' : 'add'}
                  </span>
                </IconButton>

               
              </div>
            </div>

            {showCardInput ? <div className="col-span-12">
              <PaymentCardItem ref={cardRef} />

              <div className="flex justify-end mt-3">
                <button disabled={btnLoading} className={`btn btn-black ld-over ${btnLoading ? "running":""}`} onClick={handleAddCard}>
                <div className="ld ld-ring ld-spin-fast"></div>
                  Add Card
                </button>
              </div>

            </div> : null
            }

          </div>

          <div className="payment-method mt-4 border rounded-lg grid grid-cols-12 gap-x-4 gap-y-5 p-4">
            <div className="col-span-12">
              <div className="flex justify-between items-center">
                <p className="font-semibold flex gap-2 items-center">
                  <span className="material-icons-outlined text-gray-600">payment</span>Apple Pay</p>

                <IconButton className='h-10 w-10'>
                  <span className="material-icons-outlined" onClick={() => toggleHide('applepay')}>
                    {showApplePayInput ? 'remove' : 'add'}
                  </span>
                </IconButton>
              </div>
            </div>

            {showApplePayInput ? <div className="col-span-12">
              <p>
                Section for adding Apple payment method
              </p>

              <div className="flex justify-end mt-3">
                <button className="btn btn-black">
                  Add
                </button>
              </div>

            </div> : null
            }

          </div>


          <div className="payment-method mt-4 border rounded-lg grid grid-cols-12 gap-x-4 gap-y-5 p-4">
            <div className="col-span-12">
              <div className="flex justify-between items-center">
                <p className="font-semibold flex gap-2 items-center">

                <span className="material-icons-outlined text-gray-600">payment</span>
                  PayPal</p>


                  <IconButton className='h-10 w-10'>
                  <span className="material-icons-outlined" onClick={() => toggleHide('paypal')}>
                    {showPayPalInput ? 'remove' : 'add'}
                  </span>
                </IconButton>

                
              </div>
            </div>

            {showPayPalInput ? <div className="col-span-12">
              <p>
                Section for adding Paypal payment method
              </p>

              <div className="flex justify-end mt-3">
                <button className="btn btn-black">
                  Add
                </button>
              </div>

            </div> : null
            }

          </div>

        </div>


      )}
      <DeleteModal
        open={openDelete.open}
        title={"Delete Card"}
        message={"Are you sure you want to delete "}
        handleClose={handleClose}
        confirmTxt={'Yes'}
        secondaryTxt={'No'}
        handleConfirm={handleDelete}
        handleReject={handleClose}
        yesButtonLoading={yesButtonLoading}
      />
    </div>
  );
}

export default OrderPayment;
