import React from 'react';
import { withStyles } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

const styles = theme =>({
    btn:{
        margin:10,
    },
});

class AttendanceDelete extends React.Component {

    constructor(props) {    
        super(props);
        this.state = {    
            open: false,
            session_id:this.props.session_id,    
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)    
        this.handleClose = this.handleClose.bind(this);        
    }

    handleClickOpen() {    
        this.setState({
            open: true    
        });
    }
    
    handleClose() {
        this.setState({
            open: false
        })
    }

    
    deleteAttendance(id){
        const url = '/api/attendance/' + id;    
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }
     
    render() {
        const { classes } = this.props;
        return (
            <div>                
                <Button variant="contained" color="secondary" className={classes.btn} onClick={this.handleClickOpen}>
                    삭제
                </Button>   
                <Dialog onClose={this.handleClose} open={this.state.open}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteAttendance(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default withStyles(styles)(AttendanceDelete)