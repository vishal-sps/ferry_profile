import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OrderDetails from '../../pages/chef/order/[order-id]';

export default function ScrollDialog({openModal, orderId}) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
  
    React.useEffect(()=>{
      if(openModal){
        setOpen(true);
        setScroll('paper');
      }
    },[openModal])
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);
  
    return (
      <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Order Details</DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <OrderDetails orderId={orderId} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color='error' style={{color:"#e23744"}}>Close</Button>
        {/* <Button onClick={handleClose}>Subscribe</Button> */}
      </DialogActions>
    </Dialog>
  
    )
}
