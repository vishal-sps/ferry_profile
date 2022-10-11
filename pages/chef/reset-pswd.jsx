import ChTextField from "../../components/base/ch-text-field";
import ChPasswordTextField from "../../components/base/ch-passwordTextField";
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
import { Formik } from "formik";
import styled from "styled-components";
import AuthChef from "../../components/svg/auth-chef.svg"
import {changePasswordSchema} from "../../utils/validate-schema"
import hasError from "../../utils/has-error";
import { changePaswordApi } from "../../services/ChangePassword-api";

const ResetPswd = () => {
  const snackbar = useSnackbar();
  const initialValues = { currentpassword:"", password: "", confirmPassword: "" };

  const handleSubmit = async (values, resetForm ) => {
    try {
     const data = {
      password: values.currentpassword,
      new_password: values.password,
      confirm_new_password: values.confirmPassword
     }
     const response = await changePaswordApi(data)
     console.log('response', response);
     if(response?.code == 200){
      snackbar.showMessage(`${response?.message ? response?.message : "Password Changed Successfully !"}`, "success", "filled");
      resetForm()
     }
     if(response?.code == 203){
      snackbar.showMessage(
        `${response?.message}`,
        "error",
        "filled"
      );
      resetForm()
     }
    } catch (err) {
      if (err.code == 403) {
        snackbar.showMessage(
          "User may not exist or is not verified",
          "error",
          "filled"
        );
        resetForm()
        return;
      }
      snackbar.showMessage("An error occured", "error", "filled");
      resetForm()
      console.log("err",err);
    } 
    // finally {
    //   setSubmitting(false);
    // }
  }
  
  return (
   
      <div className="w-11/12 mx-auto" >
      <div className="flex flex-col md:flex-row justify-between pt-8">
        <section className="md:w-5/12 flex justify-center">
          <StyledAuthChef />
        </section>

        <section className="md:w-6/12">
          <Formik
          enableReinitialize
            initialValues={initialValues}
            validationSchema={changePasswordSchema}
            onSubmit={(value, {resetForm })=>{handleSubmit(value, resetForm)}}
          >
            {(formik) => (
              <Form
                className="md:p-7 py-5 flex flex-col"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-3xl font-bold md:text-left text-center mb-2">
                  Change Password
                </h1>

                <p className="text-gray-500 md:text-left text-center mb-4">
                  Enter your new password.
                </p>

                <ChPasswordTextField
                  label="Current Password"
                  className="px-3 focus:outline-none"
                  {...formik.getFieldProps("currentpassword")}
                  hasError={hasError(formik, "currentpassword")}
                  errorMessage={
                    hasError(formik, "currentpassword") && formik.errors.currentpassword
                  }
                />

            <div className="mt-5">
                <ChPasswordTextField
                  label="New Password"
                  className="px-3 focus:outline-none"
                  {...formik.getFieldProps("password")}
                  hasError={hasError(formik, "password")}
                  errorMessage={
                    hasError(formik, "password") && formik.errors.password
                  }
                />
                </div>

                <div className="mt-5">
                  <ChPasswordTextField
                    label="Re-Type New Password"
                    className="px-3 focus:outline-none"
                    {...formik.getFieldProps("confirmPassword")}
                    hasError={hasError(formik, "confirmPassword")}
                    errorMessage={
                      hasError(formik, "confirmPassword") && formik.errors.confirmPassword
                    }
                  />
                </div>

                <div className="flex justify-between items-center mt-8">
                  <button
                    className={`${
                      formik.isSubmitting
                        ? "bg-gray-200 text-gray-400"
                        : "bg-black text-white"
                    } py-4 px-7 rounded-lg`}
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Submitting" : "Reset Password"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </div>
   
  )
}
const StyledAuthChef = styled(AuthChef)`
  height: 250px;

  @media screen and (min-width: 768px) {
    height: 500px;
  }
`;

const Form = styled.form`
  @media screen and (min-width: 768px) {
    box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
`;


export default ResetPswd