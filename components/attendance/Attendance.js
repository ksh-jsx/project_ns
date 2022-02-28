import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { withStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import '../../css/profile.css';
import Navigation from '../NavigationBar';
import AttendanceAdd from './AttendanceAdd';
import AttendanceDelete from './AttendanceDelete';
import AttendanceView from './AttendanceView';


import $ from 'jquery';
window.$ = $;

function sleep(ms) { //sleep 함수
    return new Promise(resolve=>setTimeout(resolve, ms));
}

const sideBarWidth = 315;
const clientWidth = $( window ).width();
const article_view = clientWidth > 600 ? `calc(100% - ${sideBarWidth}px)` : '95%'

const styles = theme =>({
    img: {
        width: 100,
    },
    menu: {
        marginTop: 80,
        marginBottom: 15,
        marginRight: '2.5%',
        display: 'flex',
        justifyContent: 'flex-end'
      },
      paper: {
        width : article_view,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        float: 'right',
        overflow:'auto',
        "& > table":{
          minWidth:'600px'
        }
      },
      table: {
        minWidth: 1080
      },
      tableRow: {
        height: 150
      },
      progress: {
        margin: 20
      },
      tableHead: {
        fontSize: '1.0rem',
        textAlign:'center'
      },
      tableBody: {
        textAlign:'center'
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.common.white,
        '&:hover': {
          backgroundColor: theme.palette.common.white,
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: 10,
          width: 'auto',
        },
      },
      searchIcon: {
        width: 90,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
        width: '100%',
      },
      inputInput: {
        padding : 10,
        paddingLeft: 100,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 120,
          '&:focus': {
            width: 200,
          },
        },
      }
});

class Attendance extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          session_id : "",
          attendance:"",
          completed:0,
          searchKeyword: '',
          open : false
        }
        this.stateRefresh = this.stateRefresh.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this)
    }
    
    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    
    stateRefresh(){
        this.setState({
            attendance:"",
            completed:0
        });

        this.callApi()
            .then(res => this.setState({attendance: res}))
            .catch(err => console.log(err));
    }

    componentDidMount(){
        this.timer = setInterval(this.progress, 20);
        this.callApi()
            .then(res => this.setState({attendance: res}))
            .catch(err => console.log(err));
        
        this.callSession()
            .then(res => this.setState({session_id: res.user_id}))
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    callApi = async () => {
      await sleep(500)
      const response = await fetch('/api/attendance');        
      const body = await response.json();
      return body;
    }

    callSession = async() => {
      const response = await fetch('/api/get_session');        
      const body = await response.json();
      return body;
    }

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };

    render() {
        const { classes } = this.props;
        const cellList1 = ["이름","타입", "날짜", "설정"]
        const cellList2 = ["타입", "날짜", "설정"]
        const filteredComponents = (data) => {
            data = data.filter((c) => {
            return c.date.indexOf(this.state.searchKeyword) > -1;
          });
          return data.reverse().map((c) => {
            return <AttendanceList stateRefresh={this.stateRefresh} tableRow= {classes.tableRow} tableBody= {classes.tableBody} key={c.id} id={c.id} session_id={this.state.session_id} name={c.name} type={c.attendance_type} date={c.date} lat={c.latitude} lng={c.longitude} />
          });
        }
        return (
            <div id="admin_container">
              <Navigation current_link="/attendance" session_id ={this.state.session_id} />
              <div className={classes.menu}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="날짜로 검색"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    autoComplete="off"
                    name="searchKeyword"
                    value={this.state.searchKeyword}
                    onChange={this.handleValueChange}
                    />
                </div>
                <AttendanceAdd stateRefresh={this.stateRefresh} />
              </div>
                <Paper className={classes.paper}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            { this.state.session_id === 1 || this.state.session_id === 2 || this.state.session_id === -1 ?
                              cellList1.map(c => {
                                return <TableCell className={classes.tableHead} key={c}>{c}</TableCell>
                              })
                              :
                              cellList2.map(c => {
                                return <TableCell className={classes.tableHead} key={c}>{c}</TableCell>
                              })
                            }
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.attendance && this.state.session_id ?
                            filteredComponents(this.state.attendance) :
                            <TableRow>
                            <TableCell colSpan="6" align="center">
                                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                            </TableCell>
                            </TableRow>
                        }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        
        )

    }
}
    
class AttendanceList extends React.Component {
  constructor(props) {    
    super(props);
    this.state = {  
        open: false,
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
  }

  handleMouseOver(){
    this.setState({
      open: true    
    });
  }

  render() {
    let cell ='';
    if(this.props.session_id === 1 || this.props.session_id === 2 || this.props.session_id === -1)
      cell = <TableCell className={this.props.tableBody}>{this.props.name}</TableCell>
    return (
        <TableRow className={this.props.tableRow} onMouseOver={this.handleMouseOver}>
            {cell}
            <TableCell className={this.props.tableBody}>{this.props.type}</TableCell>
            <TableCell className={this.props.tableBody}>{this.props.date}</TableCell>
            <TableCell className={this.props.tableBody}>
              <AttendanceView open={this.state.open} session_id={this.state.session_id} key={this.props.id} id={this.props.id} type={this.props.type} date={this.props.date}  lat={this.props.latitude} lng={this.props.longitude} />  
              <AttendanceDelete stateRefresh={this.props.stateRefresh} session_id={this.state.session_id} id={this.props.id}/>
            </TableCell>
        </TableRow>
        
    )
  }
}
      

export default withStyles(styles)(Attendance);