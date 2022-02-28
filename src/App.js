import React, { useState, useRef, useEffect } from "react";
import { useLocation} from "react-router-dom";
import { HashRouter as Router, Route,Routes  } from "react-router-dom";
import ScrollReveal from "./utils/ScrollReveal";
import InfoContext from "./InfoContext";
// Layouts
import LayoutDefault from "./layout/LayoutDefault";

// Views
import Home from "./views/Home";
import Info1 from "./views/infos/Info1";
import Info2 from "./views/infos/Info2";
import Info3 from "./views/infos/Info3";
import Info4 from "./views/infos/Info4";

import Virtualization1 from "./views/virtualizations/Virtualization1";
import Virtualization2 from "./views/virtualizations/Virtualization2";
import Virtualization3 from "./views/virtualizations/Virtualization3";
import Virtualization4 from "./views/virtualizations/Virtualization4";

import Hardware1 from "./views/hardwares/Hardware1";
import Hardware2 from "./views/hardwares/Hardware2";
import Hardware3 from "./views/hardwares/Hardware3";
import Hardware4 from "./views/hardwares/Hardware4";

import Support1 from "./views/support/Support1";
import Support2 from "./views/support/Support2";
import Support3 from "./views/support/Support3";
import Support4 from "./views/support/Support4";
import App2 from "./App2";
import Remote from "./views/q&r/Remote";
import Survey from "./views/q&r/survey";

import $ from "jquery";
window.$ = $;
const App = () => {
  const childRef = useRef();

  const [position, setPosition] = useState("header0");

  useEffect(() => {
    document.body.classList.add("is-loaded");
    childRef.current.init();
  }, []);

  return (
    <InfoContext.Provider value={{ position, setPosition }}>
      <ScrollReveal
        ref={childRef}
        children={() => (
          <Router>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/info/introduce" element={<Info1/>}/>
              <Route exact path="/info/greeting" element={<Info2/>}/>
              <Route exact path="/info/history"element={<Info3/>}/>
              <Route exact path="/info/location" element={<Info4/>} />
              <Route exact path="/vm/server" element={<Virtualization1/>}/>
              <Route exact path="/vm/desktop" element={<Virtualization2/>}/>
              <Route exact path="/vm/storage" element={<Virtualization3/>}/>
              <Route exact path="/vm/DR" element={<Virtualization4/>}/>
              <Route exact path="/hw/server" element={<Hardware1/>}/>
              <Route exact path="/hw/storage" element={<Hardware2/>}/>
              <Route exact path="/hw/network" element={<Hardware3/>}/>
              <Route exact path="/hw/security" element={<Hardware4/>}/>
              <Route exact path="/mt/engineer" element={<Support1/>}/>
              <Route exact path="/mt/maintenance" element={<Support2/>}/>
              <Route exact path="/mt/question" element={<Support3/>}/>
              <Route exact path="/mt/reference" element={<Support4/>}/>
              <Route exact path="/remote" element={<Remote/>}/>
              <Route exact path="/survey" element={<Survey/>}/>
            </Routes>
          </Router>
        )}
      />
    </InfoContext.Provider>
  );
};

export default App;
