import React, { useEffect, useContext } from "react";
import "../css/info.css";

import Footer from "../layout/Footer";
import Info1 from "./infos/Info1";
import Info2 from "./infos/Info2";
import Info3 from "./infos/Info3";
import Info4 from "./infos/Info4";
import Info5 from "./infos/Info5";
import InfoContext from "./../InfoContext";
import "./../css/anima.css";
import $ from "jquery";
window.$ = $;

const Home = () => {
  const scrollPosition = useContext(InfoContext);
  useEffect(() => {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#" + scrollPosition.position).offset().top - 30
      },
      500
    );
  });

  return (
    <>
      <Info1 />
      <Info2 />
      <Info3 />
      <Info4 />
      <Info5 />
      <Footer />
    </>
  );
};

export default Home;
