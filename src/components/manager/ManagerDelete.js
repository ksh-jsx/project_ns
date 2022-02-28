import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

const styles = theme =>({
    btn:{
        margin:10,
    },
});

class ManagerDelete extends React.Component {

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

    
    deleteManager(id){
        const url = '/api/managers/' + id;    
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }
     
    render() {
        const { classes } = this.props;
        return (
            <div>
                { this.state.session_id === this.props.id || 1 ? (
                    <Button variant="contained" color="secondary" className={classes.btn} onClick={this.handleClickOpen}>
                        삭제
                    </Button>   
                ) : (
                    <div></div>
                )}
                <Dialog onClose={this.handleClose} open={this.state.open}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 담당자 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteManager(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default withStyles(styles)(ManagerDelete)