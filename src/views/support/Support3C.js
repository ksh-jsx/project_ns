import React from "react";
import { post } from "axios";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import $ from "jquery";
window.$ = $;
const styles = (theme) => ({
  btn: {
    background: "#6bbf24",
    color: "#ffffff",
    "&:hover": {
      background: "#64A538"
    }
  },
  btn_close: {
    margin: "10px 15px"
  },
  box_fullWidth: {
    width: "100%",
    margin: "0 auto",
    marginTop: "20px"
  }
});

class QuestionAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title : '',
      content : '',
      contact : '',
      open: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleClickOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.title === "" || this.state.content === "")
      alert("항목을 모두 채워주세요");
    else {
      this.addQuestion()
      .then((response) => {
        alert('전송되었습니다.')
      });
      this.setState({
        title: "",
        content: "",
        open: false
      });
    }
  }

  selectedDate(e) {
    this.setState({
      date: new Date(e)
    });
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  addQuestion() {
    const url = "/api/question";
    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("content", this.state.content);
    formData.append("contact", this.state.contact);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          variant="contained"
          className={classes.btn}
          onClick={this.handleClickOpen}
        >
          문의하기
        </Button>
        <Dialog
          onClose={this.handleClose}
          open={this.state.open}
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle onClose={this.handleClose}>문의하기</DialogTitle>
          <DialogContent>
              <fieldset className="mail_container">
                <TextField
                  id="title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleValueChange}
                  variant="outlined"
                  label="제목"
                  className={classes.box_fullWidth}
                  autoComplete="off"
                />
              </fieldset>
              <fieldset className="mail_container">
                <TextField
                  id="content"
                  name="content"
                  label="내용을 입력해주세요."
                  value={this.state.content}
                  onChange={this.handleValueChange}
                  variant="outlined"
                  multiline
                  rows={10}
                  className={classes.box_fullWidth}
                  autoComplete="off"
                />
              </fieldset>
              <fieldset className="mail_container">
                <TextField
                  id="contact"
                  name="contact"   
                  value={this.state.contact}
                  onChange={this.handleValueChange}               
                  variant="outlined"
                  label="답변받을 연락처"
                  className={classes.box_fullWidth}
                  autoComplete="off"
                />
              </fieldset>            
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
              className={classes.btn}
            >
              제출하기
            </Button>
            <Button
              variant="outlined"
              onClick={this.handleClose}
              className={classes.btn_close}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(QuestionAdd);
