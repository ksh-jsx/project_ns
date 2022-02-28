import React from 'react';
import 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

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
});


class ManagerView extends React.Component {

    constructor(props) {    
        super(props);
        this.state = {  
          src: this.props.c.image,
          src2: this.props.c.base_img,
          name:this.props.c.name,
          open : false
        }		  
        this.handleClickOpen = this.handleClickOpen.bind(this)    
        this.handleClose = this.handleClose.bind(this);
        this.save = this.save.bind(this)    
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

    save(){
        
          let el = document.getElementById("target"); 
          
          el.download = this.state.name; 
          el.click();

    }

    render() {
        const { classes } = this.props;
        
        return (
            <div>
                <Button variant="contained" color="primary" className={classes.btn} id="update_btn" onClick={this.handleClickOpen}>
                    보기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                  <DialogContent id="contract" style={{maxHeight:'700px'}}>
                    <img src={process.env.PUBLIC_URL+'/upload/'+this.state.src2.split('/')[2]} alt="" className={this.props.img}/>
                    <img src={this.state.src} alt="" className={this.props.img}/>
                    <a href={this.state.src} alt="" style={{display:"none"}} id="target"/>
                  </DialogContent>
                  <DialogActions>
                      <Button variant="contained" color="primary" onClick={this.save}>다운로드</Button>
                      <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                  </DialogActions>
                </Dialog>
            </div>
        )
    }
}
     
export default withStyles(styles)(ManagerView)