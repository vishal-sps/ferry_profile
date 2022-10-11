import Image from "next/image";
import { IMAGE_URL } from "../../../constants/enviroment-vars";
import trimString from "../../../utils/trim-string";
import getDishMinutes from "../../../utils/get-dish-minutes";
import CartButton from "../../cart-button";
import { myLoader } from "../../../services/custom_loader";
import { useSnackbar } from "nextjs-toast";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import React from "react";
import Router from "next/router";

const DishDetails = ({ dishDetail, handleCart }) => {
  const [open, setOpen] = React.useState(false);


  const handleYes = () => {
    // go to cart page
    Router.push("/chef/order/")
    setOpen(false);
  }

   const handleClose = () => {
     setOpen(false);
   };
const snackbar = useSnackbar();

  const callHandleCart = async (actionType, dishId) => {
    const response = await handleCart(actionType, dishId);
    if (response === false) {

      setOpen(true);

      // snackbar.showMessage(
      //   "You can't add dish from another chef's kitchen while you have a pending order in your cart from another chef.",
      //   "error",
      //   "filled"
      //   );
      }

  };
  return (
    <div>
      <div
        className="mb-4 relative rounded-lg"
        style={{ height: 180, background: "#eee" }}
      >
        <Image
          src={`${IMAGE_URL}${dishDetail.images[0]}`}
          alt={dishDetail.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          loader={myLoader}
        />
      </div>

      <div>
        <div className="text-lg font-semibold mb-1">{dishDetail.name}</div>

        <div className="text-sm mb-2">
          {dishDetail.count > 0
            ? `Serves ${dishDetail.count} - ${getDishMinutes(
                dishDetail.cookingInfo,
                dishDetail.count
              )} mins`
            : `Serves 2 - ${getDishMinutes(
              dishDetail.cookingInfo,
              2
            )} mins`}
        </div>

        <div className="border-b pb-5 pt-1 text-gray-500">
          {dishDetail.description && trimString(dishDetail.description, 40)}
        </div>

        <div className="mt-6 text-gray-700">
          <CartButton
            count={dishDetail.count}
            onClick={(actionType) => callHandleCart(actionType, dishDetail.id)}
            hasExceeded={
              dishDetail.price.consumer_max_guest == dishDetail.count
            }
          />
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ 
          borderRadius: "30px", 
          '& .MuiPaper-root': {
            border: "2px solid rgb(226, 54, 68) !important"
          },
       }}
      >
        <DialogTitle id="alert-dialog-title" className="font-medium" sx={{ fontSize: "1.1rem" }}>
        You can&#39;t add dish from this chef&#39;s kitchen while you have a pending order in your cart from another chef.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="font-medium">
          Please proceed to cart in order to remove the existing dish(es) from your cart to add a new dish from this chef&#39;s kitchen.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button sx={{ color: "#E23644" }} onClick={handleYes}>Go to Cart</Button>
          <Button sx={{ color: "#E23644" }} onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DishDetails;
