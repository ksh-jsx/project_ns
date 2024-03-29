import React from 'react';
import 'date-fns';
import { post } from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
    box_fullWidth: {
        width:'100%',
        margin:"0 auto",
        marginTop:'20px'
    },
    box_halfWidth_right: {
        width:'48%',
        float:'right',
        margin:"0 auto",
        marginTop:'20px'
    },
    box_halfWidth_left: {
        width:'48%',
        float:'left',
        margin:"0 auto",
        marginTop:'20px'
    },
    checkbox : {
      width:'150px',
      float:'left',
      height:'50px',
      margin:"0 auto",
      marginTop:'26px'
    },
    select1 : {
      width:'48%',
      float:'right',
      margin:"0 auto",
      marginTop:'28px'
    },
    select2 : {
      width:'48%',
      float:'left',
      margin:"0 auto",
      marginTop:'28px'
    },
});


class ManagerUpdate extends React.Component {

    constructor(props) {            
        super(props);
        this.state = {
          cust_name_list : this.props.cust_name_list,  
          cust_name : this.props.c.cust_name,
          name : this.props.c.name,
          department : this.props.c.department,
          position : this.props.c.position,
          task : this.props.c.task,
          tel1 : this.props.c.tel1,
          tel2 : this.props.c.tel2,
          email : this.props.c.email,
          subemail : this.props.c.subemail,
          birthday : this.props.c.birthday,
          decision_power : this.props.c.decision_power,
          edm_type : this.props.c.edm_type,
          reference : this.props.c.reference,
          open:false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.modifyManager = this.modifyManager.bind(this)
        this.selectedDate = this.selectedDate.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }
  
    handleFormSubmit(e) {
        e.preventDefault()
        if(this.state.cust_name === "" || this.state.name === "" )
          alert('고객사 명, 담당자는 필수입력 항목입니다')
        else{
          this.modifyManager()
          .then((response) => {
            this.props.stateRefresh();
          })
        }         
    }
  
    selectedDate(e) {
        this.setState({
            date : new Date(e)
        })    
    }
  
    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
  
    modifyManager(){
        const url = '/api/managers/' + this.props.c.id;    
        const formData = new FormData();
        formData.append('cust_name', this.state.cust_name)
        formData.append('name', this.state.name)
        formData.append('department', this.state.department)
        formData.append('position', this.state.position)
        formData.append('task', this.state.task)
        formData.append('tel1', this.state.tel1)
        formData.append('tel2', this.state.tel2)
        formData.append('email', this.state.email)
        formData.append('subemail', this.state.subemail)
        formData.append('birthday', this.state.birthday)
        formData.append('decision_power', this.state.decision_power)
        formData.append('edm_type', this.state.edm_type)
        formData.append('reference', this.state.reference)
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        return post(url, formData, config)
    }
  
    handleClickOpen() {
        this.setState({        
          open: true
        });
    }
          
    handleClose() { 
        this.setState({
            cust_name_list : this.props.cust_name_list,  
            cust_name : this.props.c.cust_name,
            name : this.props.c.name,
            department : this.props.c.department,
            position : this.props.c.position,
            task : this.props.c.task,
            tel1 : this.props.c.tel1,
            tel2 : this.props.c.tel2,
            email : this.props.c.email,
            subemail : this.props.c.subemail,
            birthday : this.props.c.birthday,
            decision_power : this.props.c.decision_power,
            edm_type : this.props.c.edm_type,
            referenece : this.props.c.referenece,
            open:false
        })
    }

    render() {
        const { classes } = this.props;
        var is_checked = this.state.decision_power === 1 ? true : false
        const makeList = (data) => {          
          return Object.values(data).map((c,i) => {
            return <MenuItem value={c.cust_name} key={i}>{c.cust_name}</MenuItem>
          });
        }
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    수정
                    
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                  <DialogTitle>담당자 수정</DialogTitle>
                  <DialogContent id="manager">
                    <FormControl className={classes.select2}>
                      <InputLabel htmlFor="age-native-simple">고객사 명</InputLabel>
                      <Select labelId="demo-simple-select-label"id="demo-simple-select" label="고객사 명" name="cust_name" value={this.state.cust_name} onChange={this.handleValueChange}>
                        {makeList(this.state.cust_name_list)}
                      </Select>
                    </FormControl>
                    <TextField 
                      id="outlined-basic" 
                      label="담당자 이메일" 
                      name="email"
                      value={this.state.email}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_right}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="고객사 담당자" 
                      name="name"
                      value={this.state.name}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_left}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="담당자 Sub 이메일" 
                      name="subemail"
                      value={this.state.subemail}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_right}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="담당자 부서명" 
                      name="department"
                      value={this.state.department}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_left}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="생년월일" 
                      name="birthday"
                      value={this.state.birthday}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_right}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="담당자 직책" 
                      name="position"
                      value={this.state.position}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_left}
                      autoComplete="off"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Checkbox color="primary" />}
                      label="결정권 여부"
                      name="decision_power"
                      onChange={this.handleValueChange}
                      className={classes.checkbox}
                      labelPlacement="start"
                      checked = {is_checked}
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="담당자 담당업무" 
                      name="task"
                      value={this.state.task}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_left}
                      autoComplete="off"
                    />
                    <FormControl className={classes.select1}>
                      <InputLabel htmlFor="age-native-simple">EDM 형태</InputLabel>
                      <Select labelId="demo-simple-select-label"id="demo-simple-select" label="EDM 형태" name="edm_type" value={this.state.edm_type} onChange={this.handleValueChange}>
                          <MenuItem value={'가상화'} >가상화</MenuItem>
                          <MenuItem value={'유지보수'}>유지보수</MenuItem>
                          <MenuItem value={'유상수리'}>유상수리</MenuItem>
                          <MenuItem value={'장비'}>장비</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField 
                      id="outlined-basic" 
                      label="담당자 일반전화" 
                      name="tel1"
                      value={this.state.tel1}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_left}
                      autoComplete="off"
                    />
                    <TextField
                      id="outlined-multiline-static"
                      label="참고 사항(특징)"
                      name="reference"
                      multiline
                      rows={5}
                      value={this.state.reference}
                      onChange={this.handleValueChange}
                      placeholder="참고 사항"
                      variant="outlined"
                      className={classes.box_halfWidth_right}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="담당자 휴대전화" 
                      name="tel2"
                      value={this.state.tel2}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_left}
                      autoComplete="off"
                    />
                  </DialogContent>
                  <DialogActions>
                      <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>수정</Button>
                      <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                  </DialogActions>
                </Dialog>
            </div>
        )
    }
}
     
export default withStyles(styles)(ManagerUpdate)