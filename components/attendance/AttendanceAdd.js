/*global kakao */
import React from 'react'
import { post } from 'axios';
import 'date-fns';
import { withStyles } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import '../../css/profile.css';
import Geoloc from './Geoloc'
import $ from 'jquery';
window.$ = $;

const styles = theme => ({
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
    map: {
        width:'95%',
        height:200
    },
    btn:{
        fontSize:'15px',
    },
    btn2:{
        marginTop:20
    }
});

class AttendanceAdd extends React.Component {
    constructor(props) {            
        super(props);
        this.state = {
            attendace_type: '',  
            date : new Date().toLocaleString(),
            latitude : '',
            longitude : '',
            open:false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addAttendance = this.addAttendance.bind(this)    
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        
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
                enableHighAccuracy: false,
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
          alert('출결타입을 선택해주세요')
        else{
          this.addAttendance()
          .then((response) => {
              this.props.stateRefresh();
          })
          this.setState({
              attendace_type: '',  
              date : new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString(),
              latitude : '',
              longitude : '',
              open:false
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
    getMap(){
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=c32c1763e65921610b0b14021a17138f&autoload=false";
        var lat = $('#lat').text()
        var lng = $('#lng').text()
        document.head.appendChild(script);
        script.onload = () => {
            kakao.maps.load(() => {                
                let container = document.getElementById('Mymap');
                let options = {
                  center: new kakao.maps.LatLng(lat, lng),
                  level: 4
                };
        
                const map = new window.kakao.maps.Map(container, options);
                var markerPosition  = new kakao.maps.LatLng(lat, lng); 

                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    position: markerPosition
                });

                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(map);
            });
        };
    }
    handleClickOpen() {        
        
        
        this.setState({        
            open: true
        });
    }
        
    handleClose() { 
        this.setState({
            title: '',  
            date : new Date().toLocaleDateString()+' '+new Date().toLocaleTimeString(),
            content : '',
            open: false
        })
    }
 
    render() {
        const { classes } = this.props;
        
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} className={classes.btn}>
                    추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>출퇴근 추가</DialogTitle>
                    <Geoloc {...this.props}/>
                    <DialogContent>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">출결 타입*</InputLabel>
                            <Select labelId="demo-simple-select-label"id="demo-simple-select" label="타입" name="attendace_type" value={this.state.attendace_type} onChange={this.handleValueChange}>
                                <MenuItem value={'출근'}>출근</MenuItem>
                                <MenuItem value={'퇴근'}>퇴근</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField 
                            id="outlined-basic" 
                            label="date" 
                            name="date"
                            value={this.state.date}
                            variant="outlined"
                            className={classes.box}
                            readOnly
                        />
                        <Button  variant="contained" color="primary"  onClick={this.getMap} className={classes.btn2}>지도 불러오기</Button>
                        <div id="Mymap" style={{height:'300px',marginTop:'20px'}}></div>
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

export default withStyles(styles)(AttendanceAdd)

