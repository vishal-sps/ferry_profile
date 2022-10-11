import React, { useState, useRef, useCallback } from "react";
import { Input, TextField, Button } from "@material-ui/core";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { Formik } from "formik";
import { useSnackbar } from "nextjs-toast";
import { contactFormSchema } from "../utils/validate-schema";
import styled from "styled-components";
import {submitContactForm} from "../services/contactform-api"

const Contact_us = () => {
    const initialValues = { email: "", name: "", contact:"",message:"" };

  const [isHuman, setIsHuman] = useState(false)
  const [sToken, setStoken] = useState("")
  const [name, setName] = useState("")
  const recaptchaRef = useRef();
  const [submitResponse, setSubmitResponse] = useState("")
  const snackbar = useSnackbar();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const handleSubmit =async (value, resetForm)=>{
    value.gRecaptchaResponse = sToken
    value['contact_no'] = value['contact'] 
    delete value['contact']
    // value.message = value.message.replace(/[\r\n]+/g, '\n\n')
    value.message = value.message.replace(/\n/g, "<br />");
    try {
      const submittingResult = await submitContactForm(value)
      setSubmitResponse(submittingResult)
      setRefreshReCaptcha(r => !r);
      console.log('submitting', submittingResult?.success);
      if(submittingResult?.success){
        resetForm();
        recaptchaRef.current?.reset();
        setIsHuman(false)
        snackbar.showMessage(
          `Dear ${name?.split(' ')[0]}, 
          Thank you for contacting us. We will get in touch with you shortly.
           `, "success", "filled");
          // const recaptchaValue = recaptchaRef.current.getValue();
      }else if(submittingResult?.success == false){
        resetForm();
        recaptchaRef.current?.reset();
        setIsHuman(false)
        snackbar.showMessage(
          'Something went wrong. Please try again.',
          'error',
          'filled'
        );
      }
    } catch (error) {
      resetForm();
      recaptchaRef.current?.reset();
      setIsHuman(false)
      snackbar.showMessage(
        'Something went wrong. Please try again.',
        'error',
        'filled'
      );
    }
   
    
  }
  const onVerify = useCallback((token) => {
    setStoken(token);
  }, []);
  return (

    <>
     
    
    <div className="w-11/12 mx-auto">
      <div className="flex flex-col md:flex-row justify-between pt-32">
     
        <section className="md:w-7/12  justify-center" >
        <StyledContactChef>
        <h1 className="content-name">Contact Us </h1>
        <MiddleContent>
        <div>
         {/* <p>Have feedback, suggestion or any thought about our website? </p> */}
        <p> Learn more about our cooking services or get support on your order </p>
         <p style={{marginTop:'15px'}}>Feel free to contact us anytime, we will get back you in 24 Hours.</p>
        </div>
        <div style={{fontSize:"14px", margin:'15px'}}>Phone: (415) 226-9697 <span style={{fontSize: "16px"}}> |</span> Email: hello@getchefjoy.com</div>
        </MiddleContent>
       {/* { <div >
        <div>
         <p> Dear {name} </p> 
         <p>
        Thank you for contacting us. We will get in touch with you shortly<br/>
        Regards<br/>
        Chef Joy.</p>
        </div>
        </div>} */}
    
        </StyledContactChef>
        </section>

        <section className="md:w-5/12">
        <GoogleReCaptchaProvider
         reCaptchaKey="6Lcrp7sUAAAAAFWsZsdN7VtkKOs_g69sq9TYJu_V"
        
    >
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={contactFormSchema}
            onSubmit={(value, {resetForm })=>{handleSubmit(value, resetForm)}}
          >
            {(formik) => (
              <Form
                className="md:p-7 py-5 flex flex-col"
                onSubmit={formik.handleSubmit}
              >
               
           <TextField
                   label="Name*"
                   variant="outlined"
                   name="name"
                   value={formik.values.name}
                   type="text"
                   size="small"
                  onChange={(e)=> { setName(e.target.value) ;formik.handleChange(e)}}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                />

            <div className="mt-4">
                <TextField
                   label="Email*"
                   variant="outlined"
                   name="email"
                   value={formik.values.email}
                   type="email"
                   size="small"
                   onChange={formik.handleChange}
                   fullWidth
                   error={formik.touched.email && Boolean(formik.errors.email)}
                   helperText={formik.touched.email && formik.errors.email}
                />
            </div>
                <div className="mt-4">
                  <TextField
                   label="Contact No.*"
                   variant="outlined"
                   name="contact"
                   value={formik.values.contact}
                   type="text"
                   size="small"
                   fullWidth
                   onChange={formik.handleChange}
                   error={formik.touched.contact && Boolean(formik.errors.contact)}
                   helperText={formik.touched.contact && formik.errors.contact}
                  />
                </div>

                <div  className="mt-4">
                <TextField
            label="Message"
            variant="outlined"
            name="message"
            value={formik.values.message}
            type="text"
            multiline
            onChange={formik.handleChange}
            minRows={3}
            fullWidth
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
                </div>

         <Captcha 
         style={{transform:"scale(0.85)", transformOrigin:"0 0"}}
         >
     
        <GoogleReCaptcha onVerify={onVerify} refreshReCaptcha={refreshReCaptcha} />
        
        </Captcha>      

                <button
                  className={`${
                    formik.isSubmitting
                      ? "bg-gray-200 text-gray-400"
                      : "bg-black text-white"
                  }
                   py-3 mb-4`}
                  style={{ borderRadius: 8, background:"#f50057" }}
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Submitting..." : "Message"}
                </button>
                {/* <Button disabled={!isHuman} type="submit" variant="contained" color="secondary" size="large" > Message</Button> */}
              </Form>
            )}
          </Formik>
          </GoogleReCaptchaProvider>
        </section>
      </div>
    </div>
    </>
  );
};

const StyledContactChef = styled.div`
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

const MiddleContent = styled.div`
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    margin-top: 100px;
  }
`;

const Captcha = styled.div`
margin: 1rem 0;
width: 65%;
@media screen and (max-width: 480px) {
  width: 80%;
}
@media screen and (max-width: 425px) {
  width: 73%;
}
@media screen and (max-width: 375px) {
  width: 93%;
}
`;

export default Contact_us;