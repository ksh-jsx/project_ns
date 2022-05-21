import React from 'react';
import { post } from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AccountCircle from '@material-ui/icons/AccountCircle';
import logo from "../img/logo.png";
import { dbService, storageService } from "../firebase";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#bdbdbbd',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  none:{
    display:'none'
  },
  black : {
    color:'#000000'
  },
  logo : {
	 position:'absolute',
	 left:15,
	 top:15,
	 cursor:'pointer'
  }
});

class SignIn extends React.Component {
  constructor(props) {            
    super(props);
    this.state = {
      userId: '',            
      passwd: '',
      session_id:'',
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.Login = this.Login.bind(this)
  }
  componentDidMount(){
    
    //this.callData()
    
    this.timer = setInterval(this.progress, 20);
    
    this.callSession()
        .then(res => this.setState({session_id: res.user_id.replace('admin','')}))
        .catch(err => console.log(err));
  }

  callSession = async() => {
    const response = await fetch('/api/get_session');        
    const body = await response.json();
    return body;
  }

  callData = async() => {
    await dbService.collection("lists").onSnapshot((snapshot) => {
      const fbArray = snapshot.docs.map((doc) => ({
        id: 1,
        page:2,
        ...doc.data(),
      }));
      return fbArray
    });
    
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.Login()
    .then((response) => {
        let user = response.data
        if(user === '비밀번호 불일치' || user === '아이디 불일치'){
          alert(user)
          this.setState({                 
            passwd: '',
          })   
        }
        else{
          window.location.reload()
        }  
        
    })
    .catch(function(err){
      alert(err)
    })
    
    this.setState({     
      userId: '',            
      passwd: '',
    })             
    
  }
  
  
  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  Login(){
    const url = '/api/auth/login';
    const formData = new FormData();
    formData.append('userId', this.state.userId)
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
      <Container component="main" maxWidth="xs" id="admin_container">
        <Link
          to="/"
          className={classes.txt_deco_none2}
        >
          <img src={logo} alt="logo" className={classes.logo}/>
        </Link>
        <div className={classes.none}>{this.state.session_id ? window.location.href = '/admin' : <div></div>}</div>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircle/>
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.black}>
            로그인
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userId"
              label="아이디"
              name="userId"
              value={this.state.userId}
              onChange={this.handleValueChange}
              autoComplete="off"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwd"
              label="비밀번호"
              value={this.state.passwd}
              onChange={this.handleValueChange}
              type="password"
              id="passwd"
              autoComplete="off"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleFormSubmit}
            >
              로그인
            </Button>
          </form>
        </div>
        <Link to="/admin">메인뷰</Link>
      </Container>
    );
  }
}

export default withStyles(useStyles)(SignIn)