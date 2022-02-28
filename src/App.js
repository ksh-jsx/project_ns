import React from "react";
import { HashRouter as Router, Route,Routes  } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Navigate  } from "react-router-dom";
import SignIn from "./auth/SignIn";
import Admin from "./components/admin/Admins";
import Customer from "./components/customer/Customers";
import Manager from "./components/manager/Managers";
import PopUp from "./components/popUp/PopUp";
import Board from "./components/board/Boards";
import Survey from "./components/survey/Survey";
import Question from "./components/question/Questions";
import Journal from "./components/journal/Journals";
import Contract from "./components/contract/Contracts";
import Contract2 from "./components/contract2/Contracts2";
import DrawSign from "./components/contract/DrawSign";
import Attendance from "./components/attendance/Attendance";
import profile from "./components/Profile";

import $ from "jquery";
window.$ = $;

const window_size = $(window).width();
const agt = navigator.userAgent.toLowerCase();
const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: 0,
    overflowX: "auto"
  }
});

class App2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session_data: "",
      browser : agt
    };
    this.callSession = this.callSession.bind(this);
  }

  callSession = async () => {
    const response = await fetch("/api/get_session");
    const body = await response.json();
    return body;
  };

  componentDidMount() {
    this.callSession()
      .then((res) => this.setState({ session_data: res }))
      .catch((err) => console.log(err));
  }
  
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Admin/>} />
            <Route exact path="/login" element={<SignIn/>} />
            <Route exact path="/customer" element={<Customer/>} />
            <Route exact path="/manager" element={<Manager/>} />
            <Route exact path="/admin/journal" element={<Journal/>} />
            <Route exact path="/attendance" element={<Attendance/>} />
            <Route exact path="/profile" element={<profile/>} />
            <Route exact path="/popUp" element={<PopUp/>} />
            <Route exact path="/admin/board" element={<Board/>} />
            <Route exact path="/survey" element={<Survey/>} />
            <Route exact path="/question" element={<Question/>} />
            <Route exact path="/contract" element={<Contract/>} />
            <Route exact path="/contract2" element={<Contract2/>} />
            <Route exact path="/drawsign" element={<DrawSign/>} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(App2);
