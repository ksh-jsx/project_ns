import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import AdminDelete from './AdminDelete'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AdminAdd from './AdminAdd';
import AdminUpdate from './AdminUpdate';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Navigation from '../NavigationBar';
import '../../index.css';
import '../../css/profile.css';
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
        height: 110
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
        backgroundColor: fade(theme.palette.common.white, 1),
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

class Admins extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          session_id:"",
          admin:"",
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
            admin:"",
            completed:0
        });

        this.callApi()
            .then(res => this.setState({admin: res}))
            .catch(err => console.log(err));
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

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    
    callApi = async () => {
      await sleep(500)
      const response = await fetch('/api/all');        
      const body = await response.json();
      return body;
    }

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };

    render() {
        const { classes } = this.props;
        const cellList = ["프로필 이미지", "이름", "설정"]
		const nameList = [];
        const filteredComponents = (data) => {
          data = data.filter((c) => {
            return c.name.indexOf(this.state.searchKeyword) > -1;
          });
          return data.map((c) => {
            if((c.id !==2 && c.id !== -1) || (this.state.session_id*1 === 2 || this.state.session_id*1 === -1))
			  {	
				nameList.push(c.name)
				return <AdminList stateRefresh={this.stateRefresh} img={classes.img} tableRow={classes.tableRow} tableBody={classes.tableBody} session_id={this.state.session_id} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
			  }
          });
        }
        
        return (
            <div id="admin_container">    
              <Navigation current_link="/" session_id ={this.state.session_id} />
              <div className={classes.menu}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="이름으로 검색"
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

				{(this.state.session_id*1 === this.props.id || this.state.session_id*1 === 1 || this.state.session_id*1 === -1 || this.state.session_id*1 === 2) ?
                  (<AdminAdd stateRefresh={this.stateRefresh} name={nameList}/>)
                  :
                  (<div></div>)
                }
                
              </div>
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

                        {this.state.admin && this.state.session_id  ? 
                            filteredComponents(this.state.admin) :
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
    
class AdminList extends React.Component {
    render() {        
        return (
            <TableRow className={this.props.tableRow}>
                <TableCell className={this.props.tableBody}><img src={process.env.PUBLIC_URL+'/upload/'+this.props.image.split('/')[2]} alt="" className={this.props.img}/></TableCell>
                <TableCell className={this.props.tableBody}>{this.props.name}</TableCell>
                <TableCell className={this.props.tableBody}>
                  {(this.props.session_id*1 === this.props.id || this.props.session_id*1 === 1 || this.props.session_id*1 === -1 || this.props.session_id*1 === 2) ?
                  (<AdminUpdate stateRefresh={this.props.stateRefresh} id={this.props.id} session_id={this.props.session_id} image={this.props.image} name={this.props.name} birthday={this.props.birthday} gender={this.props.gender} job={this.props.job}/>)
                  :
                  (<div></div>)
                  }
                  {(this.props.session_id*1 === this.props.id || this.props.session_id*1 === 1 || this.props.session_id*1 === -1 || this.props.session_id*1 === 2) ?
                  (<AdminDelete stateRefresh={this.props.stateRefresh} id={this.props.id} session_id={this.props.session_id} />)
                  :
                  (<div></div>)
                  }
                  
                </TableCell>
            </TableRow>
        )
    }
}
      

export default withStyles(styles)(Admins);