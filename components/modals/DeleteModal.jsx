import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteModal({ open, handleClose, title, message, secondaryTxt, confirmTxt, handleConfirm, handleReject, yesButtonLoading }) {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <span className="text-2xl font-medium">
          {title}
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" >
          <div className="text-gray-500">{ message }</div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={yesButtonLoading} onClick={() => {
          if (handleReject) handleReject()
        }}>
          { secondaryTxt }
        </Button>
        <Button color="primary" disabled={yesButtonLoading} autoFocus onClick={() => {
          if (handleConfirm) handleConfirm()
        }}>
          { yesButtonLoading ? "Deleting...": confirmTxt }
        </Button>
      </DialogActions>
    </Dialog>
  );
}