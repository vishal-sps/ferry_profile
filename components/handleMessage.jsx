    import Button from '@mui/material/Button';
    import Dialog from '@mui/material/Dialog';
    import DialogActions from '@mui/material/DialogActions';
    import DialogContent from '@mui/material/DialogContent';
    import DialogContentText from '@mui/material/DialogContentText';
    import DialogTitle from '@mui/material/DialogTitle';
    import useMediaQuery from '@mui/material/useMediaQuery';
    import { useTheme } from '@mui/material/styles';
   import { useEffect, useState } from 'react';
   import { isMobileOrTablet } from '../utils/detectDevice';
   import isBrowser from '../utils/is-browser';
import { orderStatusApi } from '../services/ordeStatus-api';
import { isMobile } from 'react-device-detect';
   

const HandleMessage = ({openMsgModal, orderId, handleModalClose, apiOrderStatus, chefMobile }) => {  
  // let isMobile = isMobileOrTablet();

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  useEffect(()=>{
    if(openMsgModal){
      handleClickOpen()
    }
   },[openMsgModal])
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClickOpen = () => {
   setOpen(true);
 };

//  useEffect(async()=>{
//   let payload = {
//     _id : orderId
//   }
//  let res =  await orderStatusApi(payload)
//  if(res.code == 200 && res?.data.length >0) {
//     setApiOrderStatus(res?.data[0].status)
//     setChefMobile(res?.data[0]?.chef_id?.mobile)
//  }
//  },[])


    let orderStatus = {
        state_1 : "assigned",
        state_2 : "not assigned",
        state_3: "cancelled"
    }
  //  let status =  Object.keys(orderStatus).find(key => orderStatus[key] === apiOrderStatus)

   let message_list = {
    state_1: "No messaging service available on this device.",
    state_2: "The chat will be enabled once chef confirms.",
    state_3: "This order was cancelled.",
    state_4: "Couldn't load please and try again."
   }
   let message = "";
 
   const handleClose = () => {
     setOpen(false);
     handleModalClose()
   };


   function redirectToSMS (){
    if(isBrowser() ){
      handleModalClose()
      window.location.href=`sms:${chefMobile}?body=Hello Chef`;
    }
  }


   if(apiOrderStatus == orderStatus.state_1){
    if(isMobile){
      redirectToSMS()
      return null;
     }else{
      message = message_list.state_1
     }
   }else if(apiOrderStatus == orderStatus.state_2){
    message = message_list.state_2
   }else if(apiOrderStatus == orderStatus.state_3) {
    message = message_list.state_3
   }else{
    message = message_list.state_4
   }
  return (
     
        <div>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: isMobile ? "50%" : "30%",
                maxHeight: 300
              }
            }}
            aria-labelledby="responsive-dialog-title"
            sx={{ 
              borderRadius: "30px", 
              '& .MuiPaper-root': {
                border: "2px solid rgb(226, 54, 68) !important"
              },
            }}
          >
            <DialogTitle id="responsive-dialog-title">
              {"Unable to connect"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" className="font-medium">
               {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <Button autoFocus variant="outlined" color='error' style={{color:"#e23744"}} onClick={handleClose}>
                CLOSE
              </Button> */}
              <Button onClick={handleClose} variant="outlined" color='error' style={{color:"#e23744"}} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
  )
}

export default HandleMessage