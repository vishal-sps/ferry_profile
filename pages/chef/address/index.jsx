import LayoutTwo from "../../../components/layouts/layout-two";
import AddressCard from '../../../components/address-card';
import AddAddress from '../../../components/add-address';
import { Button, Icon } from '@material-ui/core'
import { useState, useEffect } from 'react';
import {
  fetchUserAddresses,
} from "../../../services/address-api/user";

function Address() {

  const [ showAddress, setShowAddress ] = useState(false)
  const [ addressList, setAddressList ] = useState([])

  useEffect(() => {
    fetchAddresses()
  }, [])

  const handleShowAddress = () => setShowAddress(!showAddress)

  const fetchAddresses = async () => {
    const response = await fetchUserAddresses()
    if (response?.success && response?.code === 200) {
      setAddressList(response.data)
    }
  }

  const handleCallBack = () => {
    fetchAddresses()
    handleShowAddress()
  }

  return (
    <div className="lg:w-3/5 mx-auto pt-28 lg:pt-32 lg:pb-10 p-4">
      <h1 className="text-2xl font-semibold mb-4 lg:mb-8">Address</h1>
      <div className="mb-5">
        {
          addressList.map(item => <AddressCard address={item} key={item._id + 'address'} />)
        }
      </div>
      <div className="p-8 flex items-center justify-center mb-4">
        <Button classes={{ colorInherit: 'black-btn' }} variant="contained" color="inherit" onClick={handleShowAddress}>
          <Icon className="mr-3">
            add
          </Icon>
          Add New Address
        </Button>
      </div>
      {
        showAddress && <AddAddress callBack={handleCallBack} />
      }
    </div>
  );
}

Address.getLayout = LayoutTwo;

export default Address;
