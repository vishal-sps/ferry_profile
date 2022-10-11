import Head from "next/head";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SnackbarProvider } from "nextjs-toast";

import { wrapper } from "../store";
import Layout from "../components/layouts";
import ProtectedRoute from "../components/ProtectedRoute";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { useEffect } from "react";
import { initApp } from '../utils/firebase'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  html { scroll-behavior: smooth; }
`;

const theme = {
  colors: {
    primary: "#E23744",
  },
};

function MyApp({ Component, pageProps, router }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
   
  useEffect(() => {
    initApp()
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <meta name="description" content="Order a chef from anywhere." />
        <meta name="author" content="" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Head>

      <GlobalStyle />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
            <ProtectedRoute router={router}>
              {getLayout(<Component {...pageProps} />)}
            </ProtectedRoute>
          </SnackbarProvider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
