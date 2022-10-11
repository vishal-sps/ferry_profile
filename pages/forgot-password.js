import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Formik } from "formik";
import { useSnackbar } from "nextjs-toast";

import { emailSubmitForFogotPassword } from "../services/forgotPasswordApi";
import ChTextField from "../components/base/ch-text-field";
import { ForgotPasswordSchemaForEmail } from "../utils/validate-schema";
import { setToken } from "../utils/token-manager";

import LayoutTwo from "../components/layouts/layout-two";
import AuthChef from "../components/svg/auth-chef.svg";
import hasError from "../utils/has-error";

function ForgotPassword() {
  const snackbar = useSnackbar();
  const initialValues = { email: "" };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await emailSubmitForFogotPassword(values)
      if(res?.message?.includes("not Registered")){
       let message = res?.message ? res?.message : "User Not Registered"
        snackbar.showMessage(
          message,
          "error",
          "filled"
        );
          resetForm()
      }
      if(res?.message?.includes("Email sent")){
        let message = res?.message ? res?.message : "Verification Email Sent. Check Your Inbox."
        snackbar.showMessage(message, "success", "filled");
        resetForm()
      }
      // snackbar.showMessage("User successfully logged in", "success", "filled");
    } catch (err) {
      if (err.message.includes(403)) {
        snackbar.showMessage(
          "User may not exist or is not verified",
          "error",
          "filled"
        );
        return;
      }
      snackbar.showMessage("An error occured", "error", "filled");
      console.log(err.message);
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
            initialValues={initialValues}
            validationSchema={ForgotPasswordSchemaForEmail}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {(formik) => (
              <Form
                className="md:p-7 py-5 flex flex-col"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-3xl font-bold md:text-left text-center mb-2">
                  Forgot Password
                </h1>

                <p className="text-gray-500 md:text-left text-center mb-4">
                  Enter your email.
                </p>

                <ChTextField
                  label="Email"
                  className="px-3 focus:outline-none"
                  {...formik.getFieldProps("email")}
                  hasError={hasError(formik, "email")}
                  errorMessage={
                    hasError(formik, "email") && formik.errors.email
                  }
                />

                <div className="flex justify-between items-center mt-5">
                  <button
                    className={`${
                      formik.isSubmitting
                        ? "bg-gray-200 text-gray-400"
                        : "bg-black text-white"
                    } py-4 px-7 rounded-lg`}
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Submitting" : "Send Mail"}
                  </button>

                  <Link href="/login">
                    <a className="text-red-600">Log in</a>
                  </Link>
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

ForgotPassword.getLayout = LayoutTwo;

export default ForgotPassword;
