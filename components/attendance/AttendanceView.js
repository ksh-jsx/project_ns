/*global kakao */
import React from 'react'
import { withStyles } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

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
        margin:10,        
    },
});

class AttendanceView extends React.Component {
    constructor(props) {            
        super(props);
        this.state = {
            attendance_type: this.props.type,  
            date : this.props.date,
            latitude : this.props.latitude,
            longitude : this.props.longitude,
            open: this.props.open
        }               
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
    

    handleClickOpen() {        
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
        
        this.setState({        
            open: true
        });
    }
        
    handleClose() { 
        this.setState({
            attendance_type: this.props.type,  
            date : this.props.date,
            latitude : this.props.latitude,
            longitude : this.props.longitude,
            open: false
        })
    }
 

    render() {
        const { classes } = this.props;
        
        return (
            <div>
                <Button variant="contained" className={classes.btn} color="primary" onClick={this.handleClickOpen}>
                    보기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>출결 추가</DialogTitle>
                    <DialogContent>
                        <FormControl className={classes.formControl}>
                            <TextField 
                                id="outlined-basic" 
                                label="attendace_type" 
                                name="attendace_type"
                                value={this.state.attendance_type}
                                variant="outlined"
                                className={classes.box}
                                readOnly
                            />
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
                        <div id="Mymap"  style={{height:'300px',marginTop:'20px'}}></div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>      
            </div>
        )
    }
}

export default withStyles(styles)(AttendanceView)

