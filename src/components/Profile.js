/*global kakao */
import React from 'react';
import 'date-fns';
import { post } from 'axios';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Navigation from './NavigationBar';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import RoomIcon from '@material-ui/icons/Room';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import '../css/profile.css';

import $ from 'jquery';
window.$ = $;

const sideBarWidth = 315;
const clientWidth = $( window ).width();
const article_view = clientWidth > 600 ? `calc(100% - ${sideBarWidth}px)` : '95%'

function sleep(ms) { //sleep 함수
  return new Promise(resolve=>setTimeout(resolve, ms));
}

const styles = theme =>({
  paper: {
    marginTop: 80,
    width : article_view,
    marginLeft: '2.5%',
    marginRight: '2.5%',
    float: 'right'
  },
  progress: {
    position:'absolute',
    top:'50%',
    left:'50%',
    transform:'translate(-50%)',
    border:0
  },
  icon_wrap1: {
    position:"absolute",
    right:30,
    width:50
  },
  icon_wrap2: {
    position:"absolute",
    right:100,
    width:50,
    color:'#ffffff',
    textDecoration:'none'
  },
  txt_deco_none:{
    color:'#000000',
    textDecoration:'none'
  },
  box: {
    width:'95%',
    margin:"0 auto",
    marginTop:'20px'
  },
  formControl: {
      marginTop: theme.spacing(1),
      minWidth: 120,
    },
  selectEmpty: {
      marginTop: theme.spacing(2),
  },  
  map: {
      width:'95%',
      height:200
  },
  hidden: {
        display: 'none'
  },
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
  }
});

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      admin:'',
      session_id : '',
      completed:0,
    }
    this.callApi = this.callApi.bind(this);
  }
  
  callApi = async () => {
    await sleep(1000)
    const response = await fetch('/api/profile');        
    const body = await response.json();
    return body;
  }


  callSession = async() => {
      const response = await fetch('/api/get_session');        
      const body = await response.json();
      return body;
    }
  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({admin: res}))
      .catch(err => console.log(err));
	 this.callSession()
      .then(res => this.setState({session_id: res.user_id}))
      .catch(err => console.log(err));
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  

  render() {
    //alert(this.state.admin)
    const filteredComponents = (data) => {
      return data.map((c) => {
        return <Data box={classes.box} hidden={classes.hidden} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
      });
    }
    const { classes } = this.props;
    return (
      <div id="admin_container">
        <Navigation session_id ={this.state.session_id}/>
        <Paper className={classes.paper}>
          {this.state.admin ?
            filteredComponents(this.state.admin) :
            <Table>
              <TableHead></TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan="6" align="center" className={classes.progress}>
                      <CircularProgress  variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          }
        </Paper>
      </div>
    )

  }
}
    
class Data extends React.Component {
  constructor(props) {            
    super(props);
    this.state = {
      title: '',  
      date : new Date(),
      content : ''
    }
    this.display_tab1 = this.display_tab1.bind(this)
    this.display_tab2 = this.display_tab2.bind(this)
    this.display_tab3 = this.display_tab3.bind(this)
      
  }

  display_tab1(){
    for(var i=1;i<=3;i++)
      $('#tab'+i).hide()
      $('#tab1').show()
      this.scroll(1)
  };
  display_tab2(){
    for(var i=1;i<=3;i++)
      $('#tab'+i).hide()
    $('#tab2').show()
    this.scroll(2)
  };
  display_tab3(){
    for(var i=1;i<=3;i++)
      $('#tab'+i).hide()
    $('#tab3').show()
    this.scroll(3)
  };

  scroll(n){
    if(n === 1)
      $('.tabs').css('height','560px')
    else if(n === 2)
      $('.tabs').css('height','1030px')
    else
      $('.tabs').css('height','1030px')
  }

  render() {  
    return (
      <div className="data_wrap">
        <div className="top_view">
          <div className="circle_view">
            <img src={process.env.PUBLIC_URL+'/upload/'+this.props.image.split('/')[2]} alt="profile"  className="profile_img"/>
          </div>
          <div className="name">{this.props.name}</div>
        </div>
        <div className="bot_view">
          <div onClick={this.display_tab1} name="tab1">
            <CreateIcon/>
            <div className="cursor">개인정보 수정</div>
          </div>
          <div onClick={this.display_tab2} name="tab2">
            <MenuBookIcon/>
            <div className="cursor">업무일지 관리</div>
          </div>
          <div onClick={this.display_tab3} name="tab3">
            <RoomIcon/>
            <div className="cursor">출퇴근 관리</div>
          </div>
        </div>
        <Divider />
        <div className="tabs">
          <div className="tab" id="tab1">
            <Data1 box={this.props.box} id={this.props.id} hidden={this.props.hidden} image={this.props.image} name={this.props.name} birthday={this.props.birthday} gender={this.props.gender} job={this.props.job}/>
          </div>
          <div className="tab" id="tab2">
            <Data2 box={this.props.box}/>
          </div>
          <div className="tab" id="tab3">
            <Data3 box={this.props.box}/>          
          </div>
        </div>
      </div>
    )
  }
}     

class Data1 extends React.Component{
  constructor(props) {    
      super(props);
      this.state = {  
          session_id : '',  
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
        if(this.state.name === "")
          alert('이름을 입력해주세요')
        else{
          if(this.state.passwd === this.state.passwd2){
              this.updateAdmin()
              .then((response) => {
                  window.location.reload()
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

    callSession = async() => {
        const response = await fetch('/api/get_session');        
        const body = await response.json();        
        return body;
    }
      
    componentDidMount(){
        this.callSession()
            .then(res => this.setState({session_id: res.user_id.replace('admin','')}))
            .catch(err => console.log(err));
        
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
        return (
            <div>    
              <input className={this.props.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
              <label htmlFor="raised-button-file">
                  <Button variant="contained" color="primary" component="span" name="file">
                      {this.state.fileName === ''? "프로필 이미지 선택" : this.state.fileName}
                  </Button>
              </label>
              <br/>
              <TextField className={this.props.box} label="이름*" type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br/>
              <TextField className={this.props.box} label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br/>
              <FormControl className={this.props.box}>
                  <InputLabel htmlFor="age-native-simple">성별</InputLabel>
                  <Select labelId="demo-simple-select-label"id="demo-simple-select" label="성별" name="gender" value={this.state.gender} onChange={this.handleValueChange}>
                      <MenuItem value={'남'}>남</MenuItem>
                      <MenuItem value={'여'}>여</MenuItem>
                  </Select>
              </FormControl><br/>
              <TextField className={this.props.box} label="직업(직급)" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br/>
              <TextField className={this.props.box} label="비밀번호" type="password" name="passwd" value={this.state.passwd} onChange={this.handleValueChange} /><br/>
              <TextField className={this.props.box} label="비밀번호 확인" type="password" name="passwd2" value={this.state.passwd2} onChange={this.handleValueChange} /><br/>
              <div className={this.props.box}>
                <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>등록</Button>
              </div>
            </div>
        )
    }
}

class Data2 extends React.Component {
  constructor(props) {            
      super(props);
      this.state = {
        cust_name_list : '',
        manager_name_list : '',
        classification: '기술업무일지',  
        date : new Date(),
        cust_name : '',
        cust_manager :'',
        serial_no : '',
        case_id : '',
        approach : '',
        contact : '',
        content : '',
        model : '',
        part : '',
        reference : '',
        open:false
      }
      this.handleFormSubmit = this.handleFormSubmit.bind(this)
      this.handleValueChange = this.handleValueChange.bind(this)
      this.addJournal = this.addJournal.bind(this)
      this.selectedDate = this.selectedDate.bind(this)
      this.handleClickOpen = this.handleClickOpen.bind(this)
      this.handleClose = this.handleClose.bind(this);
    }

    handleFormSubmit(e) {
      e.preventDefault()
      if(this.state.cust_name === "" || this.state.date === "" || this.state.cust_manager === "" )
        alert('고객사 명, 담당자는 필수입력 항목입니다')
      else{
        this.addJournal()
        .then((response) => {
          window.location.reload()
        })
        this.setState({
          cust_name_list : '',
          manager_name_list : '',
          classification: '기술업무일지',  
          date : new Date(),
          cust_name : '',
          cust_manager :'',
          serial_no : '',
          case_id : '',
          approach : '',
          contact : '',
          content : '',
          model : '',
          part : '',
          reference : '',
          open:false
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

      if(e.target.name === 'classification')
        this.change_view(e.target.value)
    }

    change_view(val){      
      if(val === '기술업무일지'){
        $('label:contains("영업 내용")').text('업무 내용')
        $('.type2').hide()
        $('.type1').show()
      }
      else{
        $('label:contains("업무 내용")').text('영업 내용')
        $('.type1').hide()
        $('.type2').show()
      }  
    }
    
    componentDidMount(){
        
        this.callCustomer()
            .then(res => this.setState({cust_name_list: res}))
            .catch(err => console.log(err));
        this.callManager()
            .then(res => this.setState({manager_name_list: res}))
            .catch(err => console.log(err));
        
    }
    
    callCustomer = async () => {
      const response = await fetch('/api/cust_name');        
      const body = await response.json();
      return body;
    }

    callManager = async () => {
      const response = await fetch('/api/manager_name');        
      const body = await response.json();
      return body;
    }
    addJournal(){
      const url = '/api/journal';
      const formData = new FormData();
      formData.append('classification', this.state.classification)
      formData.append('date', this.state.date)
      formData.append('cust_name', this.state.cust_name)
      formData.append('cust_manager', this.state.cust_manager)
      formData.append('serial_no', this.state.serial_no)
      formData.append('case_id', this.state.case_id)
      formData.append('approach', this.state.approach)
      formData.append('contact', this.state.contact)
      formData.append('content', this.state.content)
      formData.append('model', this.state.model)
      formData.append('part', this.state.part)
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
        manager_name_list : this.props.manager_name_list,
        classification: '기술업무일지',  
        date : new Date(),
        cust_name : '',
        cust_manager :'',
        serial_no : '',
        case_id : '',
        approach : '',
        contact : '',
        content : '',
        model : '',
        part : '',
        reference : '',
        open:false
      })
    }
 
    render() {
        const makeList1 = (data) => {          
          return Object.values(data).map((c) => {
            return <MenuItem value={c.cust_name}>{c.cust_name}</MenuItem>
          });
        }
        const makeList2 = (data) => {          
          return Object.values(data).map((c) => {
            return <MenuItem value={c.name}>{c.name}</MenuItem>
          });
        }
        return (
            <div>
                    <FormControl className={this.props.box}>
                      <InputLabel htmlFor="age-native-simple">분류</InputLabel>
                      <Select labelId="demo-simple-select-label"id="demo-simple-select" label="분류" name="classification" value={this.state.classification} onChange={this.handleValueChange}>
                          <MenuItem value={'기술업무일지'} >기술업무일지</MenuItem>
                          <MenuItem value={'영업업무일지'}>영업업무일지</MenuItem>
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
                        'aria-label': 'change date',
                        }}
                        className={this.props.box}
                      />
                    </MuiPickersUtilsProvider>
                    <FormControl className={this.props.box}>
                      <InputLabel htmlFor="age-native-simple">고객사 명</InputLabel>
                      <Select labelId="demo-simple-select-label"id="demo-simple-select" label="고객사 명" name="cust_name" value={this.state.cust_name} onChange={this.handleValueChange}>
                        {makeList1(this.state.cust_name_list)}
                      </Select>
                    </FormControl>
                    <FormControl className={this.props.box}>
                      <InputLabel htmlFor="age-native-simple">고객사 담당자</InputLabel>
                      <Select labelId="demo-simple-select-label"id="demo-simple-select" label="고객사 담당자" name="cust_manager" value={this.state.cust_manager} onChange={this.handleValueChange}>
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
                        className={this.props.box}
                        autoComplete="off"
                      />
                      <TextField 
                        id="outlined-basic" 
                        label="Case ID / Ser No" 
                        name="case_id"
                        value={this.state.case_id}
                        onChange={this.handleValueChange}
                        variant="outlined"
                        className={this.props.box}
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
                        className={this.props.box}
                        autoComplete="off"
                      />
                      <TextField 
                        id="outlined-basic" 
                        label="컨택 방법" 
                        name="contact"
                        value={this.state.contact}
                        onChange={this.handleValueChange}
                        variant="outlined"
                        className={this.props.box}
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
                      className={this.props.box}
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
                        className={this.props.box}
                        autoComplete="off"
                      />
                      <TextField 
                        id="outlined-basic" 
                        label="part" 
                        name="part"
                        value={this.state.part}
                        onChange={this.handleValueChange}
                        variant="outlined"
                        className={this.props.box}
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
                     className={this.props.box}
                      autoComplete="off"
                    />
                  <div className={this.props.box}>
                    <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>등록</Button>
                  </div>
            </div>
        )
    }
}     

class Data3 extends React.Component {
  constructor(props) {            
    super(props);
    this.state = {
        attendace_type: '',  
        date : new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString(),
        latitude : '',
        longitude : '',
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.addAttendance = this.addAttendance.bind(this)    
    this.getMap = this.getMap.bind(this)    
  } 

  getMap(){
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=c32c1763e65921610b0b14021a17138f&autoload=false";
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {                
        let container = document.getElementById('Mymap');
        let options = {
          center: new kakao.maps.LatLng(this.state.latitude, this.state.longitude),
          level: 4
        };

        const map = new window.kakao.maps.Map(container, options);
        var markerPosition  = new kakao.maps.LatLng(this.state.latitude, this.state.longitude); 

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      });
    };
  }

  componentDidMount(){
    
    if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.getCurrentPosition((position) => { 
            this.setState({
                latitude: position.coords.latitude,  
                longitude : position.coords.longitude,
            })   
          }, (error) => {
            console.error(error);
          }, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity
        });        
            
    } 
    else {
        alert('GPS를 지원하지 않습니다');
    }

  }

  handleFormSubmit(e) {
      e.preventDefault()
      if(this.state.attendace_type === "")
        alert('출퇴근타입을 선택해주세요')
      else{
        this.addAttendance()
        .then((response) => {
          window.location.reload()
        })
        this.setState({
            attendace_type: '',  
            date : new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString(),
            latitude : '',
            longitude : '',
        })  
      }          
  }

  handleValueChange(e) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
  }

  addAttendance(){
      const url = '/api/attendance';
      const formData = new FormData();
      formData.append('attendace_type', this.state.attendace_type)
      formData.append('date', this.state.date)
      formData.append('latitude', this.state.latitude)
      formData.append('longitude', this.state.longitude)
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      return post(url, formData, config)
  }

  render() {  
    return (
      
          <div>
            <FormControl className={this.props.box}>
                <InputLabel htmlFor="age-native-simple">출퇴근 타입*</InputLabel>
                <Select labelId="demo-simple-select-label"id="demo-simple-select" label="타입" name="attendace_type" value={this.state.attendace_type} onChange={this.handleValueChange}>
                    <MenuItem value={'출근'}>출근</MenuItem>
                    <MenuItem value={'퇴근'}>퇴근</MenuItem>
                </Select>
            </FormControl>
            <TextField 
                id="outlined-basic" 
                label="날짜" 
                name="date"
                value={this.state.date}
                variant="outlined"
                className={this.props.box}
                readOnly
            />
            <div className={this.props.box}>
              <Button variant="contained" color="primary" onClick={this.getMap}>지도 불러오기</Button>
            </div>
            <div id="Mymap"></div>
            <div className={this.props.box}>
              <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>등록</Button>
            </div>
          </div>
          
    )
  }
}     

export default withStyles(styles)(Profile);