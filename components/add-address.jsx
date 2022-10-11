
import { TextField } from '@material-ui/core'
import { useState, useEffect } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  fetchCities
} from "../services/chef-api";
import {
  addUserAddress,
} from "../services/address-api/user";
import { useForm } from "react-hook-form";

const AddAddress = ({ cityOptions, setCityOptions, callBack }) => {

  const [cityObj, setAddress] = useState({
    isDefault: false
  })
  // const [cityOptions, setCityOptions] = useState([])
  const [isLoading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // const handleChange = (e) => {
  //   const name = e.target.name
  //   let value = e.target.value
  //   if (name === 'isDefault') value = e.target.checked
  //   setAddress({
  //     ...address,
  //     [name]: value
  //   })
  // }

  const handleCitySearch = async (e) => {
    const value = e.target.value
    if (value) {
      const response = await fetchCities({ name: value })
      if (response?.success && response?.code === 200) {
        setCityOptions(response.data)
      }
    }
  }


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (addressData) => {
    setFormSubmitted(true);
    if (cityObj.cityId != null) {
      addressData['cityId'] = cityObj.cityId
      addressData['lat'] = cityObj.lat
      addressData['long'] = cityObj.long
      addressData['isDefault'] = cityObj.isDefault

      setLoading(true);
      try {
        const response = await addUserAddress(addressData)
        if (response?.success && response?.code === 200) {
          setLoading(false);
          if (callBack) callBack()
        }
      }
      // catch(ex){
      //   //handle exception
      // }
      finally {
        setLoading(false);
      }
    }
  }

  const handleClose = () => {
    if (callBack) callBack(true)
  }


  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="h4">Add Address</h4>

        <button className="link" onClick={() => handleClose()}>Close</button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <textarea
              name="address"
              placeholder="Address"
              rows={4}
              type="text"
              className="form-textarea"
              //onChange={handleChange}
              {...(register('address', { required: true }))}
            ></textarea>
            {errors.address && <p className="text-sm text-red-400">Address is required.</p>}
          </div>
          <div className="col-span-2 mt-3">
            <Autocomplete
              className="form-select p-0 h-full"
              id="combo-box-demo"
              options={cityOptions}
              getOptionLabel={(option) => `${option.name}, ${option.state_code}`}
              onChange={(event, value) => setAddress({
                ...cityObj,
                cityId: value?._id || '',
                lat: value?.location?.coordinates[0] || '',
                long: value?.location?.coordinates[1] || ''
              })}
              // {...(register('city', { required: true }))}
              renderInput={(params) =>
                <TextField
                  {...params}
                  onChange={handleCitySearch}
                  placeholder="State / City"
                  variant="outlined"
                  margin="dense"
                  className="h-full d-flex"
                  classes={{ root: '!my-0 !text-sm' }}
                />}
            />
            {formSubmitted && !cityObj.cityId && <p className="text-sm text-red-400">City is required.</p>}
          </div>
          <div className="mt-3">
            <input type="number"
              placeholder="Zipcode"
              className="form-input"
              {...(register('pincode', { required: true, minLength: 5, maxLength: 5, pattern: /^[0-9]*$/ }))}
            />
            {errors.pincode && <p className="text-sm text-red-400">{errors.pincode.type == "required" ? "Zip Code is required." : errors.pincode.type == "pattern" ? "Zip Code must be numbers only." : errors.pincode.type == "minLength" ? "Zip Code must be of 5 digits." : errors.pincode.type == "maxLength" ? "Zip Code must be of 5 digits." : ""}</p>}
          </div>
          <div className="mt-3">
            <input type="number"
              placeholder="Mobile"
              className="form-input"
              {...(register('mobile', { required: true, minLength: 10, maxLength: 10, pattern: /^[0-9]*$/ }))}
            />
            {errors.mobile && <p className="text-sm text-red-400">{errors.mobile.type == "required" ? "Mobile Number is required." : errors.mobile.type == "pattern" ? "Mobile number must be numbers only." : errors.mobile.type == "minLength" ? "Mobile number must be of 10 digits." : errors.mobile.type == "maxLength" ? "Mobile number must be of 10 digits." : ""}</p>}
          </div>

        </div>
        <div className="mt-4 md:w-1/3">
          <button type="submit" disabled={isLoading} className={`btn btn-black w-full ld-over ${isLoading ? 'running' : ''}`}>
            <div className={`ld ld-ring ld-spin-fast`}></div>
            Save</button>
        </div>
      </form>
    </>

  )
}

export default AddAddress

{/* <Box className="col-span-2">
          <ChTextField
            placeholder="Address Name"
            type="text"
            onChange={handleChange}
            name="address_name"
            className="px-3 focus:outline-none text-sm"
          />
        </Box> */}
{/* <Box className="col-span-2 lg:col-span-1 flex items-center">
          <FormControlLabel
            control={<Switch checked={address.isDefault} onChange={handleChange} name="isDefault" />}
            label="Default"
          />
        </Box> */}


{/* <Box className="col-span-4 lg:col-span-5 flex items-center flex-col lg:flex-row">
          <Box className="lg:w-1/2 w-full lg:mr-4 mb-4 lg:mb-0">
            <ChTextField
              placeholder="Locality"
              type="text"
              name="locality"
              className="px-3 focus:outline-none text-sm"
              onChange={handleChange}
            />
          </Box>
          <Box className="lg:w-1/2 w-full">
            <ChTextField
              placeholder="Landmark"
              type="text"
              onChange={handleChange}
              name="landmark"
              className="px-3 focus:outline-none text-sm lg:w-1/2 w-full"
            />
          </Box>
        </Box> */}