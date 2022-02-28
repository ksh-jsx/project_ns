import React from "react";
import { post } from "axios";
import "date-fns";
import { withStyles } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import $ from "jquery";
window.$ = $;

const styles = (theme) => ({
  hidden: {
    display: "none"
  },
  formControl: {
    marginTop: 10,
    minWidth: 120,
    width: "45%"
  },
  selectEmpty: {
    marginTop: 20
  },
  box_fullWidth: {
    width: "100%",
    margin: "0 auto",
    marginTop: "20px"
  },

  btn: {
    fontSize: "15px"
  }
});

class BoardAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      open: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.addBoard = this.addBoard.bind(this);
    this.selectedDate = this.selectedDate.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.title === "" || this.state.content === "")
      alert("항목을 모두 채워주세요");
    else {
      this.addBoard().then((response) => {
        this.props.stateRefresh();
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

  addBoard() {
    const url = "/api/board";
    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("content", this.state.content);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  }

  handleClickOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      title: "",
      content: "",
      open: false
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
          className={classes.btn}
        >
          추가
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>게시글 추가</DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-basic"
              label="제목"
              name="title"
              value={this.state.title}
              onChange={this.handleValueChange}
              variant="outlined"
              className={classes.box_fullWidth}
              autoComplete="off"
            />
            <TextField
              id="outlined-basic"
              label="내용"
              name="content"
              value={this.state.content}
              multiline
              rows={5}
              onChange={this.handleValueChange}
              variant="outlined"
              className={classes.box_fullWidth}
              autoComplete="off"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
            >
              추가
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClose}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(BoardAdd);
