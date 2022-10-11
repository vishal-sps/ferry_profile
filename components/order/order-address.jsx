import { useState, useEffect } from "react";
import ActiveRadio from '../base/ch-radio'
import AddAddress from '../add-address';
import { IconButton } from '@material-ui/core'
import { deleteUserAddress } from "../../services/address-api/user";
import { fetchAllCities, fetchCities } from "../../services/chef-api";
import useSWR from "swr";


const AddressCard = ({ data, selected, setSelected, deleteAddressSingle }) => {

  return (
    <div className="flex items-center border px-2 py-3 rounded-lg mb-3">
      <div className="flex items-stretch w-full">
        <ActiveRadio
          checked={selected === data._id}
          onChange={() => setSelected(data._id)}
          value={data._id}
          name="orderAddress"
          id={`orderAddress-${data._id}`}
          inputProps={{ 'aria-label': 'A' }}
        />
        <label htmlFor={`orderAddress-${data._id}`} className="flex flex-col justify-center w-full cursor-pointer">
          {/* <p className="font-semibold">
          { data.address_name }
          </p>  */}
  <div className="flex items-center gap-2">
  <p className="text-base text-gray-500 flex-1">
          { data.address}, {data.cityId?.name} {data.state}, {data.pincode}, {data.mobile} 
            </p>
            <IconButton aria-label="delete" className='h-12 w-12'>
           <span className="material-icons-outlined text-3xl text-primary" onClick={deleteAddressSingle}>
              delete_outline
            </span>
           </IconButton>
  </div>
          
        </label>
      </div>
    </div>
    
  )
}

function OrderAddress({
  addresses,
  addAddress,
  deleteAddress,
  selectedAddress,
  setSelectedAddress,
  setSelectedZipCode,
  ...rest
}) {
  const [newAddress, setNewAddress] = useState({
    address_name: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    mobile: "",
  });

  const [cityOptions, setCityOptions] = useState([{location: {
    type: "Point",
    coordinates: [0,0]
  }, _id: '0', name: 'Loading', state_code: '--'}]);

  const [showNewAddress, setShowNewAddress] = useState(false);

  useEffect(() => {
    if (addresses && formatAddresses(addresses).length) {
      const firstAddress = formatAddresses(addresses)[0];
      setSelectedAddress(firstAddress._id);
      setSelectedZipCode(firstAddress.pincode)
    }
  }, [addresses, setSelectedAddress]);

  const formatAddresses = (response) => {
    if (!response) return [];
    if (!Object.keys(response.data).length) return [];
    return response.data
  };

  const handleCallBack = (isClose = false) => {
    if (!isClose) {
      addAddress()
    }
    setShowNewAddress(false)
  }

  const handleDelete = (addressId) => {
    console.log("id in child - ",addressId);
    deleteAddress(addressId);
  }

  const deleteAddress1 = (addressId) => {
    var addArr = addresses.data;
    var index = -1;
    index = addArr.findIndex((el) => el._id == addressId);
    console.log("id index --- ", addressId, index);
    console.log("address before - ", addArr);
    addArr.splice(index,1);
    console.log("address after - ", addresses);
    setSelectedAddress(addresses.data[index])
    deleteUserAddress(addressId)
  };

  const { data: citiesData, error: citieserror } = useSWR("get_cities", fetchAllCities);

  useEffect(async () => {
    if (citiesData) {
      setCityOptions(citiesData.data);
    }
  }, [citiesData])
  return (
    <div {...rest}>
      <h4 className="h4">Address</h4>

      {formatAddresses(addresses).map((address, index) => (
        <AddressCard
          data={address}
          key={index}
          selected={selectedAddress}
          setSelected={setSelectedAddress}
          deleteAddressSingle={() => deleteAddress1(address._id)} 
        />
      ))}

      {!showNewAddress && (
        <div className="flex justify-center md:mt-10">
          <button
            className="btn btn-black btn-icon"
            onClick={() => setShowNewAddress(true)}
          >
            <span className="material-icons-outlined">
add
</span>
            Add New Address
          </button>
        </div>
      )}

      {showNewAddress && (
        <div className="mt-10">
          <AddAddress cityOptions={cityOptions} setCityOptions={setCityOptions} callBack={handleCallBack}/>
          {/* <h2 className="md:text-xl text-lg font-semibold mb-3">
            Add New Address
          </h2>
          <form
            className="md:border rounded-lg grid grid-cols-12 gap-x-4 gap-y-5 md:p-4"
            onSubmit={async (e) => {
              e.preventDefault();
              await addAddress(newAddress);
              setShowNewAddress(false);
            }}
          >
            <input
              type="text"
              className="col-span-12 border rounded-lg py-2 px-3 appearance-none"
              placeholder="Address Nick Name"
              onChange={({ target }) =>
                setNewAddress({ ...newAddress, address_name: target.value })
              }
            />
            <input
              type="text"
              className="col-span-12 border rounded-lg py-2 px-3 appearance-none"
              placeholder="Address"
              onChange={({ target }) =>
                setNewAddress({ ...newAddress, address: target.value })
              }
            />

            <input
              type="text"
              className="col-span-6 border rounded-lg py-2 px-3 appearance-none"
              placeholder="State"
              onChange={({ target }) =>
                setNewAddress({ ...newAddress, state: target.value })
              }
            />

            <input
              type="text"
              className="col-span-6 border rounded-lg py-2 px-3 appearance-none"
              placeholder="City"
              onChange={({ target }) =>
                setNewAddress({ ...newAddress, city: target.value })
              }
            />

            <input
              type="text"
              className="col-span-6 border rounded-lg py-2 px-3 appearance-none"
              placeholder="Zip Code"
              onChange={({ target }) =>
                setNewAddress({ ...newAddress, pincode: target.value })
              }
            />

            <input
              type="text"
              className="col-span-6 border rounded-lg py-2 px-3 appearance-none"
              placeholder="Mobile"
              onChange={({ target }) =>
                setNewAddress({ ...newAddress, mobile: target.value })
              }
            />

            <div className="col-span-12">
              <button
                className="bg-black text-white px-5 py-3 rounded-lg w-full md:w-auto"
                type="submit"
              >
                Add Address
              </button>
            </div>
          </form> */}
        </div>
      )}
    </div>
  );
}

export default OrderAddress;
