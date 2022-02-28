import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const LayoutDefault = ({ children }) => (
  <>
    <Header navPosition="right" />
    <main className="site-content">{children}</main>
    <Footer />
  </>
);

export default LayoutDefault;
