import React from "react";
import { post } from "axios";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import "../../index.css";
const styles = (theme) => ({
  hidden: {
    display: "none"
  },
  formControl: {
    marginTop: 20,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  text: {
    color: "#313131",
    opacity: 0.7
  },
  btn: {
    fontSize: "15px"
  }
});

class AdminAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleFormSubmit(e) {
    e.preventDefault();
	var name_list = this.props.name
	var bl = true;
    for(var i=0;i<name_list.length;i++){
		if(name_list[i] === this.state.userName){
			bl = false;
			alert("중복된 이름입니다.")
		}
    }
	
    if (this.state.userName === "") alert("이름은 필수항목입니다.");
    
    else if(bl) {
      this.addCustomer().then((response) => {
        this.props.stateRefresh();
      });
      this.setState({
        file: null,
        userName: "",
        birthday: "",
        gender: "",
        job: "",
        fileName: "",
        open: false
      });
    }
  }

  handleFileChange(e) {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value
    });
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  addCustomer() {
    const url = "/api/admins";
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("name", this.state.userName);
    formData.append("birthday", this.state.birthday);
    formData.append("gender", this.state.gender);
    formData.append("job", this.state.job);
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
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
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
          <DialogTitle>직원 추가</DialogTitle>
          <DialogContent>
            <input
              className={classes.hidden}
              accept="image/*"
              id="raised-button-file"
              type="file"
              file={this.state.file}
              value={this.state.fileName}
              onChange={this.handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                name="file"
              >
                {this.state.fileName === ""
                  ? "프로필 이미지 선택"
                  : this.state.fileName}
              </Button>
            </label>
            <br />
            <TextField
              className={classes.formControl}
              label="이름*"
              type="text"
              name="userName"
              value={this.state.userName}
              onChange={this.handleValueChange}
              autoComplete="off"
            />
            <br />
            <TextField
              className={classes.formControl}
              label="생년월일"
              type="text"
              name="birthday"
              value={this.state.birthday}
              onChange={this.handleValueChange}
              autoComplete="off"
            />
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">성별</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="성별"
                name="gender"
                value={this.state.gender}
                onChange={this.handleValueChange}
              >
                <MenuItem value={"남"}>남</MenuItem>
                <MenuItem value={"여"}>여</MenuItem>
              </Select>
            </FormControl>
            <br />
            <TextField
              className={classes.formControl}
              label="직업(직급)"
              type="text"
              name="job"
              value={this.state.job}
              onChange={this.handleValueChange}
              autoComplete="off"
            />
            <br />
            <br />
            <div className={classes.text}>
              *초기 비밀번호는 1111입니다.
              <br /> 로그인 후 수정할 수 있습니다.
            </div>
            <br />
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

export default withStyles(styles)(AdminAdd);
