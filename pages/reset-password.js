import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Formik } from "formik";
import { useSnackbar } from "nextjs-toast";

import { resetPasswordApi } from "../services/forgotPasswordApi";
// import ChTextField from "../components/base/ch-text-field";
import ChPasswordInput  from "../components/base/ch-passwordTextField";

import { resetPasswordSchema } from "../utils/validate-schema";
import LayoutTwo from "../components/layouts/layout-two";
import AuthChef from "../components/svg/auth-chef.svg";
import hasError from "../utils/has-error";
import {useRouter} from "next/router"

function ResetPassword() {
  const snackbar = useSnackbar();
  const initialValues = { password: "", confirmPassword: "" };
  const router = useRouter()
  console.log('useRouter', Object.keys(router.query)[0]);
  const {query}  = router;

  const handleSubmit = async (values, { setSubmitting, resetForm}) => {
    try {
      let token  = Object.keys(query)?.length && Object.keys(query)[0]
      values.token = token;
      values.confirmpassword = values.confirmPassword
      delete values.confirmPassword
      const res = await resetPasswordApi(values)
      if(res?.code == 200  && res?.message?.includes("success")){
          let message = res?.message ? res?.message : "Password reset successfully"
        snackbar.showMessage(message, "success", "filled");
        resetForm()
        router.push("/login")
      }
    } catch (err) {
      if (err?.message.includes(401)) {
        let errorMessage = 'Your verification link may have expired.'
        snackbar.showMessage(
          errorMessage,
          "error",
          "filled"
        );
        resetForm()
        router.push("/forgot-password")
        return;
      }
      snackbar.showMessage("An error occured", "error", "filled");
    } finally {
      setSubmitting(false);
    }
  };

 
  return (
    <div className="w-11/12 mx-auto">
      <div className="flex flex-col md:flex-row justify-between pt-32">
        <section className="md:w-7/12 flex justify-center">
          <StyledAuthChef />
        </section>

        <section className="md:w-4/12">
          <Formik
          enableReinitialize
            initialValues={initialValues}
            validationSchema={resetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form
                className="md:p-7 py-5 flex flex-col"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-3xl font-bold md:text-left text-center mb-2">
                  Reset Password
                </h1>

                <p className="text-gray-500 md:text-left text-center mb-4">
                  Enter your new password.
                </p>

                <ChPasswordInput
                  label="New Password"
                  className="px-3 focus:outline-none"
                  {...formik.getFieldProps("password")}
                  hasError={hasError(formik, "password")}
                  errorMessage={
                    hasError(formik, "password") && formik.errors.password
                  }
                />

                <div className="mt-5">
                  <ChPasswordInput
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
  );
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

ResetPassword.getLayout = LayoutTwo;

export default ResetPassword;
