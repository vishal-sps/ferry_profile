import React from "react";
import NavigationBar from "./navigation-bar";
import Footer from "./footer";

function index({ children }) {
  return (
    <div>
      <NavigationBar />
      {children}
      <Footer />
    </div>
  );
}

export default index;
