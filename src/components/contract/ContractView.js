import React from 'react';
import 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DrawSign from './DrawSign';

const styles = theme => ({
    box_fullWidth: {
        width:'100%',
        margin:"0 auto",
        marginTop:'20px'
    },
    hidden: {
      display: "none"
    },
    select1 : {
      width:'48%',
      float:'right',
      margin:"0 auto",
      marginTop:'28px'
    },
    select2 : {
      width:'48%',
      float:'left',
      margin:"0 auto",
      marginTop:'28px'
    },
    btn:{
        margin:10,
    },
    img:{
        padding: "0 16px"
    }
});


class ManagerView extends React.Component {

    constructor(props) {    
        super(props);
        this.state = {                      
          file: this.props.c.image,
          fileName: "",
          id:this.props.c.id,
          open : false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)    
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    handleClickOpen() {    
        this.setState({
            open: true    
        });
    }

    doSign() {    
      
    }

    render() {
        const { classes } = this.props;
        const link = "/admin/drawsign/?q="+this.state.id+'&name='+this.props.c.name;
        return (
            <div>
                <Button variant="contained" color="primary" className={classes.btn} id="update_btn" onClick={this.handleClickOpen}>
                    보기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} id="dia">
                  <DialogContent id="contract" style={{maxHeight:'700px'}}>
                    <img src={this.state.file} alt="" className={classes.img}/>
                  </DialogContent>
                  <DialogActions>
                      <Button variant="contained" color="primary" ><Link to={link}>싸인하기</Link></Button>
                      <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                  </DialogActions>
                </Dialog>
            </div>
        )
    }
}
     
export default withStyles(styles)(ManagerView)