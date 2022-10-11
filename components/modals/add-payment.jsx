import React, { useEffect } from 'react';
import { Button, Box, Icon, TextareaAutosize } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ChTextField from "../base/ch-text-field";
import OrderPayment from '../order/order-payment';

export default function AddPayment({ openModal = false, handleModalClose }) {

  const [open, setOpen] = React.useState(openModal);
  const [showPayment, setShowPayment] = React.useState(false)
  const [selectedPayment, selectedPaymentMethod] = React.useState(null)
  let [ errors, setErrors ] = React.useState({})
  const [ form, setForm ] = React.useState({})

  useEffect(() => {
    setOpen(openModal)
  }, [openModal])

  const handleClose = () => {
    setOpen(false);
    if (handleModalClose) handleModalClose()
  };

  const handleShowPayment = () => setShowPayment(!showPayment)

  const handleSelectedPayment = (arg) => {
    selectedPaymentMethod(arg)
    handleShowPayment()
  }

  const handleConfirm = () => {
    if (selectedPayment) {
      errors = {}
      if (!form?.amount) {
        errors.amount = 'This Field is required.'
      }
      setErrors(errors)
      console.log('hit the api')
    } else {
      handleShowPayment()
    }
  }

  return (
    <React.Fragment>
      <Dialog
        maxWidth={'sm'}
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        classes={{
          paper: '!p-4'
        }}
      >
        <DialogTitle id="max-width-dialog-title">
          <Box className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold"> Add Payment </h1>
            <Box className="bg-gray-300 rounded-full p-1.5 h-8 w-8 flex items-center justify-center" onClick={handleClose}>
              <Icon className="font-bold cross-icon">
                close
              </Icon>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {
            showPayment ? <OrderPayment paymentSelected={handleSelectedPayment} /> : <>
              <ChTextField
                placeholder="Enter Amount"
                type="text"
                hasError={ errors?.amount?.length }
                errorMessage={ errors?.amount }
                className="px-3 focus:outline-none text-sm mb-4 mt-1"
              />
              <TextareaAutosize
                placeholder="comments"
                maxRows={4}
                className="p-4 text-sm w-full border border-gray-200 outline-none rounded-lg h-20 mb-10"
              />
              <Box className="flex items-center justify-start">
                <Button variant="contained"
                  classes={{ colorInherit: 'black-btn', root: 'big-btn w-1/2' }}
                  color="inherit"
                  onClick={() => handleConfirm()}
                >
                  {selectedPayment ? 'Confirm Payment' : 'Select Card'}
                </Button>
              </Box>
            </>
          }
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
