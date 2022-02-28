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
import '../../index.css';
const styles = theme =>({
    hidden: {
        display: 'none'
    },
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 120,
      },
    selectEmpty: {
    marginTop: theme.spacing(2),
    },  
    box: {
        width:'95%',
        margin:"0 auto",
        marginTop:'20px'
    },
    btn:{
        margin:10,
    },
});


class AdminUpdate extends React.Component {

    constructor(props) {    
        super(props);
        this.state = {  
            session_id : this.props.session_id,  
            open: false,
            fileName: '',
            file: this.props.image,  
            name : this.props.name,
            birthday : this.props.birthday,
            gender : this.props.gender,
            job : this.props.job,
            passwd : '',
            passwd2 : '',
        }
        
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.updateAdmin = this.updateAdmin.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)    
        this.handleClose = this.handleClose.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault()
        if(this.state.name === '')
          alert('이름은 필수입니다.')
        else{
          if(this.state.passwd === this.state.passwd2){
              this.updateAdmin()
              .then((response) => {
                  console.log(response.data);
                  this.props.stateRefresh();
              })   
          }  
          else{
              alert('비밀번호를 다시 확인해주세요')
              this.setState({
                  passwd : '',
                  passwd2 : ''
              });
          }   
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

    handleClickOpen() {    
        this.setState({
            open: true    
        });
    }
    
    handleClose() {
        this.setState({
            open: false
        })
    }
    
    updateAdmin(){
        const url = '/api/admins/' + this.props.id;    
        const formData = new FormData();
        formData.append('image', this.state.file)
        formData.append('name', this.state.name)
        formData.append('birthday', this.state.birthday)
        formData.append('gender', this.state.gender)
        formData.append('job', this.state.job)
        formData.append('passwd', this.state.passwd)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        
        }
        
        return post(url, formData, config)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                
                { this.state.session_id === this.props.id || 1 ? (
                
                    <Button variant="contained" color="primary" className={classes.btn} onClick={this.handleClickOpen}>
                        수정 & 보기
                    </Button> 
                ) : (
                    <div></div>
                )}
                
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>직원 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === ''? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField className={classes.formControl} label="이름*" type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br/>
                        <TextField className={classes.formControl} label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br/>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">성별</InputLabel>
                            <Select labelId="demo-simple-select-label"id="demo-simple-select" label="성별" name="gender" value={this.state.gender} onChange={this.handleValueChange}>
                                <MenuItem value={'남'}>남</MenuItem>
                                <MenuItem value={'여'}>여</MenuItem>
                            </Select>
                        </FormControl><br/>
                        <TextField className={classes.formControl} label="직업(직급)" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br/>
                        <TextField className={classes.formControl} label="비밀번호" type="password" name="passwd" value={this.state.passwd} onChange={this.handleValueChange} /><br/>
                        <TextField className={classes.formControl} label="비밀번호 확인" type="password" name="passwd2" value={this.state.passwd2} onChange={this.handleValueChange} /><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
     
export default withStyles(styles)(AdminUpdate)