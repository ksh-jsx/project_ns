import React from 'react';
import TextField from '@mui/material/TextField';
import { withStyles } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PopUpUpdate from './PopUpUpdate';

import CircularProgress from '@mui/material/CircularProgress';
import Navigation from '../NavigationBar';

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
        width: '100%',
        height: 200
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
        minHeight:'200px'
    },
    progress: {
        position:'relative',
        left:'50%',
        marginTop:65
        
    },
    popup:{
        width:200,
        margin:'0 auto',
        border:'1px solid #ccc',
        marginTop:20,
        marginBottom:20
    },
    popup_text:{
        padding:10
    },
    state:{
        textAlign:'center',
        paddingTop:10
    }
});

class PopUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          session_id:"",
          popup:"",
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
            popup:"",
            completed:0
        });

        this.callApi()
            .then(res => this.setState({popup: res}))
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
            .then(res => this.setState({popup: res}))
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
        const response = await fetch('/api/popup');        
        const body = await response.json();
        return body;
    }

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };

    render() {
        const { classes } = this.props;        
        const filteredComponents = (data) => {
          return data.map((c,i) => {
            return <PopUpList stateRefresh={this.stateRefresh} key={i} c={c} state = {classes.state} popup = {classes.popup} popup_text = {classes.popup_text} img={classes.img}/>
          });
        }
        const filteredComponents2 = (data) => {
            return data.map((c,i) => {
              return <PopUpUpdate stateRefresh={this.stateRefresh} key={i} c={c} />
            });
          }
        return (
            <div>
              <Navigation current_link="/popUp" session_id ={this.state.session_id} />
              <div className={classes.menu}>
                {this.state.popup && this.state.session_id ?
                    filteredComponents2(this.state.popup) :
                    (<div></div>)
                }
              </div>
                <Paper className={classes.paper}>
                    
                    {this.state.popup && this.state.session_id ?
                        filteredComponents(this.state.popup) :
                            <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                    }
                        
                </Paper>
            </div>
        
        )

    }
}
    
class PopUpList extends React.Component {
    render() { 
        $('#te').text().replace('\n','<br/>')
        return (
            <div>
                <div className={this.props.state}>팝업창 상태</div>
                <div className={this.props.popup}>
                    <img src={process.env.PUBLIC_URL+'/upload/'+this.props.c.img.split('/')[2]} alt="" className={this.props.img}/>
                    <TextField
                            id="outlined-multiline-static"

                            name="content"
                            multiline
                            rows={5}
                            value={this.props.c.content}
                            variant="outlined"
                            className={this.props.popup_text}
                            autoComplete="off"
                    />                    
                </div>
            </div>
        )
    }
}
      

export default withStyles(styles)(PopUp);