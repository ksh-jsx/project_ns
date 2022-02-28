import React from "react";
import { withStyles } from "@material-ui/core/styles";
import $ from "jquery";
window.$ = $;

function sleep(ms) {
  //sleep 함수
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const styles = (theme) => ({
  state: {
    textAlign: "center",
    paddingTop: 10
  }
});
class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: "",
      completed: 0,
      path: document.location.pathname,
      cookiedata: document.cookie
    };
    this.stateRefresh = this.stateRefresh.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  stateRefresh() {
    this.setState({
      popup: "",
      completed: 0
    });

    this.callApi()
      .then((res) => this.setState({ popup: res }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => this.setState({ popup: res }))
      .catch((err) => console.log(err));
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  callApi = async () => {
    await sleep(500);

    const response = await fetch("/api/popup");
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    const filteredComponents = (data) => {
      return data.map((c, i) => {
        return (
          <PopUpList
            stateRefresh={this.stateRefresh}
            key={i}
            c={c}
            state={this.state}
            popup={classes.popup}
            popup_text={classes.popup_text}
          />
        );
      });
    };
    return (
      <div>
        {this.state.popup &&
        this.state.path === "/" &&
        !this.state.cookiedata ? (
          filteredComponents(this.state.popup)
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

class PopUpList extends React.Component {
  render() {
    $("#te").text().replace("\n", "<br/>");

    $("#div_laypopup >span").click(function () {
      var checked = $("input:checkbox[id='close']").is(":checked");
      if (checked) setCookieMobile("todayCookies", "done", 1);
        $("#div_laypopup").hide();
    });

    $("#div_laypopup >img").click(function () {
      window.location.href="/survey"
    });

    const setCookieMobile = (name, value, expiredays) => {
      var todayDate = new Date();
      todayDate.setDate(todayDate.getDate() + expiredays);
      document.cookie =
        name +
        "=" +
        escape(value) +
        "; path=/; expires=" +
        todayDate.toGMTString() +
        ";";
    };
    return (
      <div>
        <div id="div_laypopup" align="center" className="popup">
          <span>x</span>
		
          <img src={process.env.PUBLIC_URL+'/upload/'+this.props.c.img.split('/')[2]} alt="popup"/>
          <input type="checkbox" id="close" value="OK" />
          하루동안 이 창을 열지 않음
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PopUp);
