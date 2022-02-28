import React from "react";
import "date-fns";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  btn: {
    margin: 10
  },
  box_fullWidth: {
    width: "100%",
    margin: "0 auto",
    marginTop: "20px"
  },
  margin: {
    marginTop: "80px"
  }
});

class BoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.c.title,
      content: this.props.c.content,
      open: false
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({
      title: this.props.c.title,
      content: this.props.c.content,
      open: false
    });
  }

  handleClickOpen() {
    this.setState({
      open: true
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div
          variant="contained"
          color="default"
          className={classes.btn}
          id="update_btn"
          onClick={this.handleClickOpen}
        >
          {this.state.title}
        </div>
        <Dialog
          onClose={this.handleClose}
          open={this.state.open}
          className={classes.margin}
        >
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
              readOnly
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
              readOnly
            />
          </DialogContent>
          <DialogActions>
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

export default withStyles(styles)(BoardView);
