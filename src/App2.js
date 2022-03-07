import React from "react";
import { HashRouter as Router, Route,Routes  } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Navigate  } from "react-router-dom";

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
      <>
        
      </>   
    );
  }
}

export default withStyles(styles)(App2);
