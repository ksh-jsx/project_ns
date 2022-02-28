import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { withStyles } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import Navigation from '../NavigationBar';
import ContractDelete from './Contract2Delete';
import ContractView from './Contract2View';
import '../../index.css';
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
        height: 80
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

class Contract extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          session_id:"",
          cust_name_list : "",
          completed:0,          
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
            manager:"",
            completed:0
        });

        this.callApi()
            .then(res => this.setState({manager: res}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
      await sleep(500)
      const response = await fetch('/api/contract2');        
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
            .then(res => this.setState({manager: res}))
            .catch(err => console.log(err));
        
        this.callSession()
            .then(res => this.setState({session_id: res.user_id}))
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };

    render() {
        const { classes } = this.props;
        const cellList = ["번호", "파일 명", "설정"]
        const filteredComponents = (data) => {
          
          return data.map((c,i) => {
            return <ContractList stateRefresh={this.stateRefresh} i={i+1} tableRow={classes.tableRow} tableBody={classes.tableBody} session_id={this.state.session_id} key={c.id} c={c} cust_name_list={this.state.cust_name_list}/>
          });
        }
        return (
            <div id="admin_container">
              <Navigation current_link="/contract2" session_id ={this.state.session_id} />
              <div className={classes.menu}></div>
                <Paper className={classes.paper}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            {cellList.map((c,i) => {
                            return <TableCell className={classes.tableHead} key={i}>{c}</TableCell>
                            })}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.manager && this.state.session_id ?
                            filteredComponents(this.state.manager) :
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
    
class ContractList extends React.Component {
    render() {        
        return (
            <TableRow className={this.props.tableRow}>
                <TableCell className={this.props.tableBody}>{this.props.i}</TableCell>
                <TableCell className={this.props.tableBody}>{this.props.c.name}</TableCell>
                <TableCell className={this.props.tableBody}>
                  <ContractView stateRefresh={this.props.stateRefresh} c={this.props.c} cust_name_list={this.props.cust_name_list}/>
                  <ContractDelete stateRefresh={this.props.stateRefresh} id={this.props.c.id}/>
                </TableCell>
            </TableRow>
        )
    }
}
      

export default withStyles(styles)(Contract);