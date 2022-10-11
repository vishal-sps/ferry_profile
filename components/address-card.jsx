import React from "react";
import { Icon, Radio, Box, Typography } from '@material-ui/core'
import ActiveRadio from "./base/ch-radio";

function AddressCard({ address, ...rest }) {
  return (
    <div
      className="p-[10px] lg:p-5 flex justify-between items-center border border-gray-200 rounded-lg mb-4"
      {...rest}
    >
      <div className="flex items-center justify-start flex-grow">
        <ActiveRadio color="primary" />
        <div className="grid ml-5">
          <Box className="font-bold lg:text-lg text-sm mb-1"> { address?.address } </Box>
          <Typography variant="caption" className="text-gray-500 text-sm"> { address?.address }</Typography>
        </div>
      </div>
      <Icon className="hidden lg:block">
        more_vert
      </Icon>
    </div >
  );
}

export default AddressCard;
