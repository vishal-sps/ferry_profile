import React from 'react';
import { Button, Box, Icon, Checkbox, TextareaAutosize } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CancelBookingAPI } from '../../services/booking'
import { useSnackbar } from "nextjs-toast";

export default function CancelBooking({ openModal = false, handleCancel, orderId, fetchBookings }) {
  const snackbar = useSnackbar();
  const [open, setOpen] = React.useState(openModal);
  const [cancelled, setCancelled] = React.useState(false)
  const [ checkBoxes, setCheckBox ] = React.useState({})

  React.useEffect(() => {
    setOpen(openModal)
  }, [openModal])

  const handleClose = () => {
    setCancelled(false)
    setOpen(false);
    if (handleCancel) {
      handleCancel({
        status: false,
        orderId: null
      })
    }
  };

  const handleCancelBooking = async () => {
    const reason = Object.values(checkBoxes)?.join(' ,')
    const response = await CancelBookingAPI(orderId, {reason: reason})
    if (response?.success && response.code === 200) {
      snackbar.showMessage(
        "Order Cancellation Is Successfull",
        "success",
        "filled"
      );
      console.log('outside...')
      if (fetchBookings !== undefined) {
        console.log('inside...')
        fetchBookings()
      }
      setCheckBox({})
      handleClose()
    } else {
      console.log('in ealseee')
      setCancelled(true)
      snackbar.showMessage(
        response.message || 'You cant cancel the order',
        "error",
        "filled"
      );
    }
  }

  const handleChange = (e) => {
    let value = e.target.value
    const isChecked  = e.target.checked
    const name = e.target.name
    if (!isChecked) value = ''
    setCheckBox({
      ...checkBoxes,
      [name]: value
    })
  }

  return (
    <React.Fragment>
      <Dialog
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          <Box className="flex items-center justify-end">
            <Box className="bg-gray-300 rounded-full p-1.5 h-8 w-8 flex items-center justify-center">
              <Icon className="font-bold cross-icon">
                close
              </Icon>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent classes={{ root: '!px-10 mb-10' }}>
          <Box>
            <Icon className="canel-big-icon mb-4">
              event_busy_outline
            </Icon>
          </Box>
          <Box className="mb-10 text-black">
            <h4 className="text-2xl font-semibold mb-2"> Cancel Booking. </h4>
            {
              cancelled ? <Box className="text-2xl"> Sorry! You cannot Cancel the booking. </Box> : <p> Are you sure you want cancel the booking? </p>
            }
          </Box>
          {
            cancelled ? <Box>
              <Box className="text-gray-400 mb-16"> Booking can be cancelled only before 12 hours from the start time. </Box>
              <Box className="flex items-center justify-start"> <Icon> help_outline </Icon> <Box className="text-red-500 ml-2 font-medium"> Support/Help </Box></Box>
            </Box> :
              <>
                <Box className="grid grid-cols-2 gap-4 mb-4">
                  <Box className="col-span-1 border border-gray-200 rounded-lg px-4 py-1 flex items-center justify-between">
                    <Box className="text-sm"> Not feeling well </Box>
                    <Checkbox
                      checked={checkBoxes?.notWell?.length > 0}
                      onChange={ handleChange }
                      name="notWell"
                      value="Not feeling well"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Box>
                  <Box className="col-span-1 border border-gray-200 rounded-lg px-4 py-1 flex items-center justify-between">
                    <Box className="text-sm"> Got commitments </Box>
                    <Checkbox
                      checked={checkBoxes?.commitments?.length > 0}
                      onChange={ handleChange }
                      name="commitments"
                      value="Got commitments"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Box>
                  <Box className="col-span-1 border border-gray-200 rounded-lg px-4 py-1 flex items-center justify-between">
                    <Box className="text-sm"> Medical Emergency </Box>
                    <Checkbox
                      checked={checkBoxes?.medical?.length > 0}
                      onChange={ handleChange }
                      name="medical"
                      value="Medical Emergency"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Box>
                  <Box className="col-span-1 border border-gray-200 rounded-lg px-4 py-1 flex items-center justify-between">
                    <Box className="text-sm">Other</Box>
                    <Checkbox
                      checked={checkBoxes?.other?.length > 0}
                      onChange={ handleChange }
                      name="other"
                      value="Other"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Box>
                </Box>
                <Box className="mb-10">
                  <Box className="mb-2 text-black"> Reason for cancellation </Box>
                  <Box>
                    <TextareaAutosize maxRows={4} className="p-4 text-sm w-full border border-gray-200 outline-none rounded-lg h-20"
                    onChange={
                        (e) => setCheckBox({
                          ...checkBoxes,
                          'reason': e.target.value
                        })
                      }
                    />
                  </Box>
                </Box>
                <Box className="flex items-center justify-center">
                  <Button variant="contained"
                    classes={{ colorInherit: 'black-btn', root: 'big-btn w-1/2' }}
                    color="inherit"
                    onClick={() => handleCancelBooking()}
                  >
                    Confirm Cancel
                  </Button>
                </Box>
              </>
          }
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
