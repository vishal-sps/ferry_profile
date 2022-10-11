import ChTextField from "../../components/base/ch-text-field";
import ActiveRadio from "../../components/base/ch-radio";
import { Box, FormControlLabel, FormControl, RadioGroup, Button } from '@material-ui/core'
import useUser from "../../custom-hooks/use-user";
import { useState, useEffect } from "react";
import { UpdateUser } from '../../services/user-api';
import { useSnackbar } from "nextjs-toast";
import UploadImagesField from "../../components/base/ch-uploadImage"
import { uploadUserSingleImage } from "../../services/image-api/user";
import { data } from "autoprefixer";
import { IMAGE_URL } from "../../constants/enviroment-vars";

const MyProfile = () => {
  const [ form, setFormData ] = useState({})
  let [ errors, setErrors ] = useState({})
  const [profileImg, setProfileImg] = useState({
    name: '',
    src:'',
    alldata:''
  })
  const { user, mutate } = useUser();
  const snackbar = useSnackbar();

  useEffect(() => {
    if (user?.data && user?.success) {
      let data = user.data
      setFormData({
        fname: data.first_name,
        gender: data.gender,
        email: data.email, 
        mobile: data.mobile,
        profile_pic: data.profile_pic
      })
      setProfileImg({...profileImg,name:'', alldata:data.profile_pic, src: data?.profile_pic ? `${IMAGE_URL}${data.profile_pic}` : ""}, )
    }
  }, [user])

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    if(e.target.type == "file"){
      const file  = e.target.files[0]
      if(file == undefined){
      return  console.log('no file selected');
      // return setProfileImg({name:"", src:""})
      }
      setProfileImg({name: file?.name, src: URL.createObjectURL(file), alldata:file}) 
      return 
    }
    setFormData({
      ...form,
      [ name ]: value
    })
    
  }
  const handleSubmit = async () => {
    let imgData = data.profile_pic;
    console.log("profileImg", profileImg.name);
      if(profileImg.name){
        const formData = new FormData();
        formData.append('profile_pic',profileImg.alldata);
        const uploadedImg = await uploadUserSingleImage(formData)
         imgData = uploadedImg?.data?.profile_pic
      }

    const { fname, gender, mobile } = form
    errors = {}
    if (!fname) {
      errors.fname = true
    }
    setErrors(errors)
    if (Object.keys(errors)?.length === 0) {
      const response = await UpdateUser({
        first_name: fname,
        gender,
        mobile,
        profile_pic: imgData
      })
      if (response?.success) {
        snackbar.showMessage("Profile is successfully updated", "success", "filled");
        mutate({...user, profile_pic: imgData,  first_name: fname,
          gender,
          mobile,  })
      }
    }

  }
  return (
    // <div className="p-4 lg:w-3/5 mx-auto pt-32 pb-10">
    <div className="p-4 lg:w-5/5 mx-auto pt-16 pb-10">

    <>
      <h1 className="text-2xl font-semibold mb-8"> My Profile </h1>
    
      
     
      <Box className="lg:border border-gray-200 rounded-lg lg:p-5">
        <Box className="grid grid-cols-2 gap-4">
          <Box className="col-span-2 lg:col-span-1">
            <ChTextField
              placeholder="Full Name"
              type="text"
              name="fname"
              className="px-3 focus:outline-none text-sm"
              value={form.fname || ''}
              errorMessage={ errors?.fname ? 'This field is required' : ''}
              onChange={ handleChange }
            />
          </Box>
          <Box className="col-span-2 lg:col-span-1">
            <ChTextField
              placeholder="Mobile"
              type="text"
              className="px-3 focus:outline-none text-sm"
              value={form.mobile || ''}
              name='mobile'
              onChange={ handleChange }
            />
          </Box>
          <Box className="col-span-2 lg:col-span-1">
            <ChTextField
              placeholder="Email"
              type="text"
              disabled
              className="px-3 focus:outline-none text-sm"
              value={form.email || ''}
              name="email"
              onChange={ handleChange }
            />
          </Box>
          <Box className="col-span-2 lg:col-span-1">
            <FormControl component="fieldset">
              <RadioGroup row aria-label="position" name="gender" onChange={ handleChange } defaultValue="top" value={form.gender|| 'male'}>
                <FormControlLabel
                  control={<ActiveRadio color="primary" value='male' />}
                  label="Male"
                />
                <FormControlLabel
                  control={<ActiveRadio color="primary" value='female' />}
                  label="Female"
                />
                <FormControlLabel
                  control={<ActiveRadio color="primary" value='other' />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box className="col-span-2 lg:col-span-1">
              <UploadImagesField 
              placeholder="upload file"
              type="file"
              className="px-3 focus:outline-none text-sm"
              onChange={ handleChange }
              fileName={profileImg}
              />
          </Box>
          <Box className="col-span-2" style={{margin:"auto"}}>
            <Button classes={{ colorInherit: 'black-btn w-full lg:w-[120px]' }} variant="contained" color="inherit" onClick= { handleSubmit }>
              Update
            </Button>
          </Box>
        </Box>
      </Box>
      </>
  
    </div>
   
    
  )
}

export default MyProfile