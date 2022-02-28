import React from 'react';
import 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

const styles = theme =>({
    
    btn:{
        margin:10,
    },
    box_fullWidth: {
        width:'100%',
        margin:"0 auto",
        marginTop:'20px'
    },
    box_halfWidth_right: {
        width:'48%',
        float:'right',
        margin:"0 auto",
        marginTop:'20px'
    },
    box_halfWidth_left: {
        width:'48%',
        float:'left',
        margin:"0 auto",
        marginTop:'20px'
    },
    margin: {
      marginTop:"80px"
    }
});


class JournalView extends React.Component {

    constructor(props) {    
        super(props);
        this.state = {  
          classification: this.props.c.classification,  
          date : this.props.c.created_date,
          cust_name : this.props.c.cust_name,
          cust_manager :this.props.c.cust_manager,
          serial_no : this.props.c.serial_no,
          case_id : this.props.c.case_id,
          approach : this.props.c.approach,
          contact : this.props.c.contact,
          content : this.props.c.content,
          model : this.props.c.model,
          part : this.props.c.part,
          reference : this.props.c.reference,  
          open: this.props.open,
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

    render() {
        const { classes } = this.props;
        return (
          <div>
            <Button variant="contained" color="default" className={classes.btn} id="update_btn" onClick={this.handleClickOpen}>
              보기
            </Button>
            <Dialog onClose={this.handleClose} open={this.state.open} className={classes.margin}>
              <DialogContent>
                <TextField 
                    id="outlined-basic" 
                    label="분류" 
                    name="classification"
                    value={this.state.classification}
                    variant="outlined"
                    className={classes.box_halfWidth_left}
                    autoComplete="off"
                />    
                <TextField 
                  id="outlined-basic" 
                  label="날짜" 
                  name="date"
                  value={this.state.date}
                  variant="outlined"
                  className={classes.box_halfWidth_right}
                  autoComplete="off"
                />
                <TextField 
                  id="outlined-basic" 
                  label="고객사 명" 
                  name="cust_name"
                  value={this.state.cust_name}
                  variant="outlined"
                  className={classes.box_halfWidth_left}
                  autoComplete="off"
                />
                <TextField 
                  id="outlined-basic" 
                  label="고객사 담당자" 
                  name="cust_manager"
                  value={this.state.cust_manager}
                  variant="outlined"
                  className={classes.box_halfWidth_right}
                  autoComplete="off"
                />
                <TextField 
                  id="outlined-basic" 
                  label="Serial No / Service Tag" 
                  name="serial_no"
                  value={this.state.serial_no}
                  variant="outlined"
                  className={classes.box_halfWidth_left}
                  autoComplete="off"
                />
                <TextField 
                  id="outlined-basic" 
                  label="Case ID / Ser No" 
                  name="case_id"
                  value={this.state.case_id}
                  variant="outlined"
                  className={classes.box_halfWidth_right}
                  autoComplete="off"
                />
                <TextField
                  id="outlined-multiline-static"
                  label="업무 내용"
                  name="content"
                  multiline
                  rows={5}
                  value={this.state.content}
                  placeholder="업무 내용"
                  variant="outlined"
                  className={classes.box_fullWidth}
                  autoComplete="off"
                />
                <TextField 
                  id="outlined-basic" 
                  label="모델 명" 
                  name="model"
                  value={this.state.model}
                  variant="outlined"
                  className={classes.box_halfWidth_left}
                  autoComplete="off"
                />
                <TextField 
                  id="outlined-basic" 
                  label="part" 
                  name="part"
                  value={this.state.part}
                  variant="outlined"
                  className={classes.box_halfWidth_right}
                  autoComplete="off"
                />
                <TextField
                  id="outlined-multiline-static"
                  label="참고 사항"
                  name="reference"
                  multiline
                  rows={5}
                  value={this.state.reference}
                  placeholder="참고 사항"
                  variant="outlined"
                  className={classes.box_fullWidth}
                  autoComplete="off"
                />
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
              </DialogActions>
            </Dialog>
          </div>
        )
    }
}
     
export default withStyles(styles)(JournalView)