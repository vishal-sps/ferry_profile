import styled from "styled-components";
import Link from "next/link";
import { Formik } from "formik";
import { useSnackbar } from "nextjs-toast";

import LayoutTwo from "../components/layouts/layout-two";
import ChTextField from "../components/base/ch-text-field";
import { signupSchema } from "../utils/validate-schema";
import { signUpUser } from "../services/auth-api/user";

import AuthChef from "../components/svg/auth-chef.svg";
import router from "next/router";
import hasError from "../utils/has-error";

function Signup() {
  const snackbar = useSnackbar();
  const initialValues = { first_name: "", email: "", password: "" };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { first_name, email, password } = values;
      await signUpUser({
        first_name: first_name.trim(),
        password: password.trim(),
        email: email.toLowerCase().trim(),
      });

      snackbar.showMessage(
        "Successfully registered your account check your mail to verify your account",
        "success",
        "filled"
      );
      setTimeout(() => {
        router.replace("/login");
      }, 4000);
    } catch (err) {
      if (err.message.includes(409)) {
        snackbar.showMessage(
          "Email already exist please login",
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
    <div className="w-11/12 mx-auto md:pb-10">
      <div className="flex flex-col md:flex-row justify-between pt-32">
        <section className="md:w-7/12 flex justify-center">
          <StyledAuthChef />
        </section>

        <section className="md:w-4/12">
          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form
                className="md:p-7 py-5 flex flex-col"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-3xl font-bold md:text-left text-center mb-2">
                  Get Started
                </h1>
                <p className="text-gray-500 md:text-left text-center mb-4">
                  Let&apos;s create your account
                </p>

                <div className="mb-4">
                  <ChTextField
                    label="Name"
                    className="px-3 focus:outline-none"
                    {...formik.getFieldProps("first_name")}
                    hasError={hasError(formik, "first_name")}
                    errorMessage={
                      hasError(formik, "first_name") && formik.errors.first_name
                    }
                  />
                </div>

                <div className="mb-4">
                  <ChTextField
                    label="Email"
                    className="px-3 focus:outline-none"
                    {...formik.getFieldProps("email")}
                    hasError={hasError(formik, "email")}
                    errorMessage={
                      hasError(formik, "email") && formik.errors.email
                    }
                  />
                </div>

                <ChTextField
                  label="Password"
                  type="password"
                  className="px-3 focus:outline-none"
                  {...formik.getFieldProps("password")}
                  hasError={hasError(formik, "password")}
                  errorMessage={
                    hasError(formik, "password") && formik.errors.password
                  }
                />

                <div className="flex items-center justify-between text-sm mt-5 mb-5">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Keep me signed in
                  </div>

                  <Link href="/forgot-password">
                    <a className="text-red-600">forgot password?</a>
                  </Link>
                </div>

                <button
                  className={`${
                    formik.isSubmitting
                      ? "bg-gray-200 text-gray-400"
                      : "bg-black text-white"
                  } py-4 mb-5`}
                  style={{ borderRadius: 8 }}
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Submitting" : "Sign up"}
                </button>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login">
                    <a className="text-red-600">Login</a>
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

Signup.getLayout = LayoutTwo;

export default Signup;
