import React from 'react';
import 'date-fns';
import { post } from 'axios';
import { withStyles } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';


const styles = theme =>({
    
    btn:{
        margin:10,
    },
    box_fullWidth: {
        width:'100%',
        margin:"0 auto",
        marginTop:'20px'
    },
    margin: {
      marginTop:"80px"
    }
});


class JournalUpdate extends React.Component {

    constructor(props) {    
        super(props);
        this.state = {  
          title : this.props.c.title,
          content : this.props.c.content,
          open:false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.selectedDate = this.selectedDate.bind(this)
        this.updateBoard = this.updateBoard.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)    
        this.handleClose = this.handleClose.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault()
        if(this.state.title === "" || this.state.content === "" )
          alert('양식을 모두 채워주세요')
        else{
          this.updateBoard()
          .then((response) => {            
              this.props.stateRefresh();
          })   
        }     
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
          title : this.props.c.title,
          content : this.props.c.content,
          open: false
        })
    }

    selectedDate(e) {
        this.setState({
            date : new Date(e)
        })    
    }
     
    updateBoard(){
        const url = '/api/board/' + this.props.c.id;    
        const formData = new FormData();
        formData.append('title', this.state.title)
        formData.append('content', this.state.content)
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
          <div>
            <Button variant="contained" color="primary" className={classes.btn} id="update_btn" onClick={this.handleClickOpen}>
                수정
            </Button>
            <Dialog onClose={this.handleClose} open={this.state.open} className={classes.margin}>
              <DialogTitle onClose={this.handleClose}>
                  게시글 수정
              </DialogTitle>
              <DialogContent>    
                <TextField 
                  id="outlined-basic" 
                  label="제목"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleValueChange}
                  variant="outlined"
                  className={classes.box_fullWidth}
                  autoComplete="off"
                />
                <TextField 
                  id="outlined-basic" 
                  label="내용" 
                  name="content"
                  value={this.state.content}
                  multiline
                  rows={5}
                  onChange={this.handleValueChange}
                  variant="outlined"
                  className={classes.box_fullWidth}
                  autoComplete="off"
                />
              </DialogContent>
              <DialogActions>
                  <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>수정</Button>
                  <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
              </DialogActions>
            </Dialog>
          </div>
        )
    }
}
     
export default withStyles(styles)(JournalUpdate)