import React from 'react'
import { post } from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    hidden: {
        display: 'none'
    },
    formControl: {
        marginTop: 20,
        minWidth: 120,
      },
    selectEmpty: {
    marginTop: theme.spacing(2),
    },  
    text:{
        color:"#313131",
        opacity:0.7
    },
    btn:{
        fontSize:'15px',
    },
    box_fullWidth: {
        width:'100%',
        margin:"0 auto",
        marginTop:'20px'
    },
});

class PopUpUpdate extends React.Component {
    constructor(props) {            
        super(props);
        this.state = {
            file: this.props.c.img,
            fileName: '',
            content: this.props.c.content,            
            open:false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.updatePopup = this.updatePopup.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }
    handleFormSubmit(e) {
        e.preventDefault()
        if(this.state.file === null)
            alert('이미지는 필수입니다.')
        else{
            this.updatePopup()
            .then((response) => {
                this.props.stateRefresh();
            })
            this.setState({
                file: this.props.c.img,
                fileName: '',
                content: this.props.c.content,           
                open:false
            })  
        }        
    }

    handleFileChange(e) {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        });
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    updatePopup(){
        const url = '/api/popup';
        const formData = new FormData();
        formData.append('image', this.state.file)
        formData.append('content', this.state.content)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    handleClickOpen() {
        this.setState({        
            open: true
        });
    }
        
    handleClose() { 
        this.setState({
            file: this.props.c.img,
            fileName: '',
            content: this.props.c.content,             
            open: false
        })
    }
    
 

    render() {
        const { classes } = this.props;
        
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} className={classes.btn}>
                    수정
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>팝업 수정</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === ''? "팝업 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField
                            id="outlined-multiline-static"
                            label="팝업 내용"
                            name="content"
                            multiline
                            rows={5}
                            value={this.state.content}
                            onChange={this.handleValueChange}
                            placeholder="팝업 내용"
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

export default withStyles(styles)(PopUpUpdate)

