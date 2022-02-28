import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { withStyles } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import Navigation from '../NavigationBar';
import BoardAdd from './BoardAdd';
import BoardUpdate from './BoardUpdate';
import BoardDelete from './BoardDelete';
import BoardView from './BoardView';
import '../../css/profile.css';
import '../../css/profile.css';

import $ from 'jquery';
window.$ = $;

function sleep(ms) { //sleep 함수
    return new Promise(resolve=>setTimeout(resolve, ms));
}

const sideBarWidth = 315;
const clientWidth = $( window ).width();
const article_view = clientWidth > 600 ? `calc(100% - ${sideBarWidth}px)` : '95%'
$( window ).resize(function() {
    //clientWidth = $(window).width();
    //article_view = clientWidth > 600 ? `calc(100% - ${sideBarWidth}px)` : '95%'
});

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
        height: 150,
        cursor:"pointer"
      },
      progress: {
        margin: 20
      },
      tableHead: {
        fontSize: '13px',
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
        paddingTop: 10,
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

class Boards extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          session_id : '',
          boards:"",
          completed:0,
          searchKeyword: ''
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
            boards:"",
            completed:0
        });

        this.callApi()
            .then(res => this.setState({boards: res}))
            .catch(err => console.log(err));
    }

    componentDidMount(){
        this.timer = setInterval(this.progress, 20);
        this.callSession()
            .then(res => this.setState({session_id: res.user_id}))
            .catch(err => console.log(err));
        this.callApi()
            .then(res => this.setState({boards: res}))
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    callApi = async () => {
      await sleep(500)
      const response = await fetch('/api/board');        
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
        const cellList2 = ["날짜", "제목", "설정"]
        const filteredComponents = (data) => {
          data = data.filter((c) => {
            return c.title.indexOf(this.state.searchKeyword) > -1;
          });
          return data.reverse().map((c) => {
            return <BoardList stateRefresh={this.stateRefresh} tableRow= {classes.tableRow} tableBody= {classes.tableBody} key={c.id} id={c.id} session_id={this.state.session_id} c={c} />
          });
        }
        return (
            <div id="admin_container">
              <Navigation current_link="/board" session_id ={this.state.session_id} />
              <div className={classes.menu}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="제목"
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
                <BoardAdd stateRefresh={this.stateRefresh}/>
              </div>
                <Paper className={classes.paper}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            { 
                              cellList2.map(c => {
                                return <TableCell className={classes.tableHead} key={c}>{c}</TableCell>
                              })
                            }
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.boards && this.state.session_id ?
                            filteredComponents(this.state.boards) :
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
    
class BoardList extends React.Component {
    render() {
      const date = this.props.c.created_date
      var changed_date = date.substring(0,10)
      return (
          <TableRow className={this.props.tableRow}  id="row">
            <TableCell className={this.props.tableBody} >{changed_date}</TableCell>
            <TableCell className={this.props.tableBody} >{this.props.c.title}</TableCell>
            <TableCell className={this.props.tableBody}>
              <BoardView stateRefresh={this.props.stateRefresh} c={this.props.c}/>
              <BoardUpdate stateRefresh={this.props.stateRefresh} c={this.props.c}/>
              <BoardDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/>
            </TableCell>
          </TableRow>
        
      )
    }
}
      

export default withStyles(styles)(Boards);