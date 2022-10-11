import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const signupSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  first_name: yup.string().required("First name is required"),
});
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const contactFormSchema = yup.object({
  email: yup
  .string()
  .email("Invalid email address")
  .required("Email is required"),
  name: yup.string().required("Name is required"),
  contact: yup.string().matches(phoneRegExp, 'Contact number is not valid').min(10,"Contact Number cannot be less than 10 digits").max(10,"Contact Number cannot exceed 10 digits").required("Contact Number is required"),
  message: yup.string().required(" Message is required")

})

export const changePasswordSchema = 

yup.object({

  currentpassword: yup
  .string()
  .required('Please enter your current password.'),

  password: yup
  .string()
  .required('Please enter your password.'),
  // .min(8, 'Your password is too short.'),
confirmPassword: yup
  .string()
  .required('Please retype your password.')
  .oneOf([yup.ref('password')], 'Your passwords do not match.')
 
});

export const ForgotPasswordSchemaForEmail = yup.object({

  email: yup
  .string()
  .email("Invalid email address")
  .required("Email is required"),
})

export const resetPasswordSchema = yup.object({

  password: yup
  .string()
  .required('Please enter your password.'),
  // .min(8, 'Your password is too short.'),
  confirmPassword: yup
  .string()
  .required('Please retype your password.')
  .oneOf([yup.ref('password')], 'Your passwords do not match.')
 
})