import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Navigation from '../NavigationBar';
import JournalAdd from './JournalAdd';
import JournalUpdate from './JournalUpdate';
import JournalDelete from './JournalDelete';
import JournalView from './JournalView';

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
          minWidth:'800px'
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
        fontSize: '15px',
        textAlign:'center'
      },
      tableBody: {
        textAlign:'center'
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
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

class Journals extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          session_id : '',
          journals:"",
          cust_name_list : "",
          manager_name_list : "",
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
            journals:"",
            completed:0
        });

        this.callApi()
            .then(res => this.setState({journals: res}))
            .catch(err => console.log(err));
    }

    componentDidMount(){
        this.timer = setInterval(this.progress, 20);
        this.callSession()
            .then(res => this.setState({session_id: res.user_id}))
            .catch(err => console.log(err));
        this.callApi()
            .then(res => this.setState({journals: res}))
            .catch(err => console.log(err));
        this.callCustomer()
            .then(res => this.setState({cust_name_list: res}))
            .catch(err => console.log(err));
        this.callManager()
            .then(res => this.setState({manager_name_list: res}))
            .catch(err => console.log(err));
        
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    callApi = async () => {
      await sleep(500)
      const response = await fetch('/api/journal');        
      const body = await response.json();
      return body;
    }

    callSession = async() => {
      const response = await fetch('/api/get_session');        
      const body = await response.json();
      return body;
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

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };

    render() {
        const { classes } = this.props;
        const cellList1 = ["이름","날짜","분류", "고객사 명", "고객사 담당자", "설정"]
        const cellList2 = ["날짜","분류", "고객사 명", "고객사 담당자", "설정"]
        const filteredComponents = (data) => {
          data = data.filter((c) => {
            return c.cust_name.indexOf(this.state.searchKeyword) > -1;
          });
          return data.reverse().map((c) => {
            return <JournalList stateRefresh={this.stateRefresh} tableRow= {classes.tableRow} tableBody= {classes.tableBody} key={c.id} id={c.id} session_id={this.state.session_id} c={c} cust_name_list = {this.state.cust_name_list} manager_name_list = {this.state.manager_name_list}/>
          });
        }
        return (
            <div id="admin_container">
              <Navigation current_link="/journal" session_id ={this.state.session_id} />
              <div className={classes.menu}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="고객사 명"
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
                {this.state.cust_name_list && this.state.manager_name_list ?
                  (<JournalAdd stateRefresh={this.stateRefresh} cust_name_list = {this.state.cust_name_list} manager_name_list = {this.state.manager_name_list}/>):
                  (<div></div>)
                }
              </div>
                <Paper className={classes.paper}>
                    <Table>
                        <TableHead>
                        <TableRow>
		                    {this.state.session_id === 1}
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
                        {this.state.journals && this.state.session_id ?
                            filteredComponents(this.state.journals) :
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
    
class JournalList extends React.Component {
    
    render() {
      let cell ='';
	  var sqlTime1 = this.props.c.date.substr(0,10);
	  var sqlTime2 = this.props.c.date.substr(11,8);
	  var time1 = new Date(sqlTime1+' '+sqlTime2)
	  var time2 = new Date();

      if(this.props.session_id === 1 || this.props.session_id === 2 || this.props.session_id === -1)
        cell = <TableCell className={this.props.tableBody}>{this.props.c.name}</TableCell>
        return (
            <TableRow className={this.props.tableRow}  id="row">
                {cell}
                <TableCell className={this.props.tableBody} >{this.props.c.created_date}</TableCell>
                <TableCell className={this.props.tableBody} >{this.props.c.classification}</TableCell>
                <TableCell className={this.props.tableBody} >{this.props.c.cust_name}</TableCell>
                <TableCell className={this.props.tableBody} >{this.props.c.cust_manager}</TableCell>
                <TableCell className={this.props.tableBody}>
                  <JournalView stateRefresh={this.props.stateRefresh} c={this.props.c}/>
				{time2-time1 < 118800000 ? 
					<JournalUpdate stateRefresh={this.props.stateRefresh} c={this.props.c} cust_name_list = {this.props.cust_name_list} manager_name_list = {this.props.manager_name_list}/>:
					<div></div>
				  }
                  
                  <JournalDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/>
                  
                </TableCell>
                
            </TableRow>
          
        )
    }
}
      

export default withStyles(styles)(Journals);