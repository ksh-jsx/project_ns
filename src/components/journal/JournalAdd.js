import React from "react";
import { post } from "axios";
import "date-fns";
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
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

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
  box_halfWidth_right: {
    width: "48%",
    float: "right",
    margin: "0 auto",
    marginTop: "20px"
  },
  box_halfWidth_left: {
    width: "48%",
    float: "left",
    margin: "0 auto",
    marginTop: "20px"
  },
  btn: {
    fontSize: "15px"
  }
});

class JournalAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cust_name_list: this.props.cust_name_list,
      manager_name_list: this.props.manager_name_list,
      classification: "기술업무일지",
      date: new Date(),
      cust_name: "",
      cust_manager: "",
      serial_no: "",
      case_id: "",
      approach: "",
      contact: "",
      content: "",
      model: "",
      part: "",
      reference: "",
      open: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.addJournal = this.addJournal.bind(this);
    this.selectedDate = this.selectedDate.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (
      this.state.cust_name === "" ||
      this.state.date === "" ||
      this.state.cust_manager === ""
    )
      alert("고객사 명, 담당자는 필수입력 항목입니다");
    else {
      this.addJournal().then((response) => {
        this.props.stateRefresh();
      });
      this.setState({
        cust_name_list: this.props.cust_name_list,
        manager_name_list: this.props.manager_name_list,
        classification: "기술업무일지",
        date: new Date(),
        cust_name: "",
        cust_manager: "",
        serial_no: "",
        case_id: "",
        approach: "",
        contact: "",
        content: "",
        model: "",
        part: "",
        reference: "",
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

    if (e.target.name === "classification") this.change_view(e.target.value);
  }

  change_view(val) {
    if (val === "기술업무일지") {
      $('label:contains("영업 내용")').text("업무 내용");
      $(".type2").hide();
      $(".type1").show();
    } else {
      $('label:contains("업무 내용")').text("영업 내용");
      $(".type1").hide();
      $(".type2").show();
    }
  }

  addJournal() {
    const url = "/api/journal";
    const formData = new FormData();
    formData.append("classification", this.state.classification);
    formData.append("date", this.state.date);
    formData.append("cust_name", this.state.cust_name);
    formData.append("cust_manager", this.state.cust_manager);
    formData.append("serial_no", this.state.serial_no);
    formData.append("case_id", this.state.case_id);
    formData.append("approach", this.state.approach);
    formData.append("contact", this.state.contact);
    formData.append("content", this.state.content);
    formData.append("model", this.state.model);
    formData.append("part", this.state.part);
    formData.append("reference", this.state.reference);
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
      cust_name_list: this.props.cust_name_list,
      manager_name_list: this.props.manager_name_list,
      classification: "기술업무일지",
      date: new Date(),
      cust_name: "",
      cust_manager: "",
      serial_no: "",
      case_id: "",
      approach: "",
      contact: "",
      content: "",
      model: "",
      part: "",
      reference: "",
      open: false
    });
  }

  render() {
    const { classes } = this.props;
    const makeList1 = (data) => {
      return Object.values(data).map((c) => {
        return <MenuItem value={c.cust_name}>{c.cust_name}</MenuItem>;
      });
    };
    const makeList2 = (data) => {
      return Object.values(data).map((c) => {
        return <MenuItem value={c.name}>{c.name}</MenuItem>;
      });
    };
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
          <DialogTitle>일지 추가</DialogTitle>
          <DialogContent>
            <FormControl className={classes.box_halfWidth_left}>
              <InputLabel htmlFor="age-native-simple">분류</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="분류"
                name="classification"
                value={this.state.classification}
                onChange={this.handleValueChange}
              >
                <MenuItem value={"기술업무일지"}>기술업무일지</MenuItem>
                <MenuItem value={"영업업무일지"}>영업업무일지</MenuItem>
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="날짜"
                format="MM/dd/yyyy"
                name="date"
                value={this.state.date}
                onChange={this.selectedDate}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                className={classes.box_halfWidth_right}
              />
            </MuiPickersUtilsProvider>
            <FormControl className={classes.box_halfWidth_left}>
              <InputLabel htmlFor="age-native-simple">고객사 명</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="고객사 명"
                name="cust_name"
                value={this.state.cust_name}
                onChange={this.handleValueChange}
              >
                {makeList1(this.state.cust_name_list)}
              </Select>
            </FormControl>
            <FormControl className={classes.box_halfWidth_right}>
              <InputLabel htmlFor="age-native-simple">고객사 담당자</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="고객사 담당자"
                name="cust_manager"
                value={this.state.cust_manager}
                onChange={this.handleValueChange}
              >
                {makeList2(this.state.manager_name_list)}
              </Select>
            </FormControl>
            <div className="type1">
              <TextField
                id="outlined-basic"
                label="Serial No / Service Tag"
                name="serial_no"
                value={this.state.serial_no}
                onChange={this.handleValueChange}
                variant="outlined"
                className={classes.box_halfWidth_left}
                autoComplete="off"
              />
              <TextField
                id="outlined-basic"
                label="Case ID / Ser No"
                name="case_id"
                value={this.state.case_id}
                onChange={this.handleValueChange}
                variant="outlined"
                className={classes.box_halfWidth_right}
                autoComplete="off"
              />
            </div>
            <div className="type2">
              <TextField
                id="outlined-basic"
                label="접근 분류"
                name="approach"
                value={this.state.approach}
                onChange={this.handleValueChange}
                variant="outlined"
                className={classes.box_halfWidth_left}
                autoComplete="off"
              />
              <TextField
                id="outlined-basic"
                label="컨택 방법"
                name="contact"
                value={this.state.contact}
                onChange={this.handleValueChange}
                variant="outlined"
                className={classes.box_halfWidth_right}
                autoComplete="off"
              />
            </div>
            <TextField
              id="outlined-multiline-static"
              label="업무 내용"
              name="content"
              multiline
              rows={5}
              value={this.state.content}
              onChange={this.handleValueChange}
              placeholder="업무 내용"
              variant="outlined"
              className={classes.box_fullWidth}
              autoComplete="off"
            />
            <div className="type1">
              <TextField
                id="outlined-basic"
                label="모델 명"
                name="model"
                value={this.state.model}
                onChange={this.handleValueChange}
                variant="outlined"
                className={classes.box_halfWidth_left}
                autoComplete="off"
              />
              <TextField
                id="outlined-basic"
                label="part"
                name="part"
                value={this.state.part}
                onChange={this.handleValueChange}
                variant="outlined"
                className={classes.box_halfWidth_right}
                autoComplete="off"
              />
            </div>
            <TextField
              id="outlined-multiline-static"
              label="참고 사항"
              name="reference"
              multiline
              rows={5}
              value={this.state.reference}
              onChange={this.handleValueChange}
              placeholder="참고 사항"
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

export default withStyles(styles)(JournalAdd);
