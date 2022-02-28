import React, { createRef, componentDidMount } from "react";
import { post } from "axios";
import "date-fns";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../../index.css";
import { toPng } from 'html-to-image';
import styled from 'styled-components'
import $ from "jquery";
window.$ = $;

const Container = styled.div`
  width: 100%;
  padding: 16px;
  display: none;
  flex-direction: column;

`

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 36px;
  margin-bottom: 60px;
`
const DateText = styled.div`
  width: 100%;
  font-size: 16px;
  margin-bottom: 8px;
`
const MainContainer = styled.div`
  width: 100%;
  height: 200px;
  border-top: 3px solid black;
  border-bottom: 3px solid black;
  margin-bottom: 8px;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const MainText = styled.div`
  font-size: 24px;
`

const SignContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  & > * {
    margin-right: 120px;
  }
`

const Sign = styled.div`
  font-size: 20px;
`

const FooterTitle = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`
const Footer = styled.div`
  width: 100%;
  font-size: 14px;
`

let today = new Date()


let canvasRef = createRef()

const styles = (theme) => ({
  box_fullWidth: {
    width: "100%",
    margin: "0 auto",
    marginTop: "20px"
  },
  select2: {
    width: "48%",
    float: "left",
    margin: "0 auto",
    marginTop: "28px"
  },
  btn: {
    fontSize: "15px"
  },
  hidden: {
    display: "none"
  },
});

class ContractAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      file: null,
      fileName: "",
      referenece: "",
      open: false,
      contractHtmlSrc: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.addContract = this.addContract.bind(this);
    this.getcanvas = this.getcanvas.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.contractHtmlRef = createRef()
  }

  handleFormSubmit(e) {
    e.preventDefault();
  
    if (this.state.name === "")
      alert("파일 명은 필수입력 항목입니다");
    else {
      
        if (window.confirm("이대로 추가하겠습니까?") === true){
        this.addContract().then((response) => {
          this.props.stateRefresh();
        });
      }

      this.setState({
        name: "",
        file: null,
        fileName: "",
        referenece: "",
        open: false,
        contractHtmlSrc: ''
      });
      
    }
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    
    let canvas2 = document.getElementById('canvas');        
    
    this.setState({
      contractHtmlSrc:canvas2.toDataURL()
    });
  }
  getcanvas(){
    let canvas = canvasRef.current
    let ctx = canvas.getContext("2d")

    let img = new Image()
    $('#htmlContainer').show()
    toPng(this.contractHtmlRef.current)
      .then((dataurl) => {

        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height) 
        }
        img.src = dataurl
        
      })
    $('#createBtn').hide()
  }

  addContract() {
    const url = "/api/contract";
    const formData = new FormData();
    formData.append("image", this.state.contractHtmlSrc);
    formData.append("name", this.state.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  }

  handleClickOpen() {
    
    this.setState({
      open: true
    });
    
  }

  handleClose() {
    this.setState({
        name: "",
        file: null,
        fileName: "",
        referenece: "",
        open: false
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
          className={classes.btn}
        >
          추가
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>파일 추가</DialogTitle>
          <DialogContent style={{maxHeight:'700px'}}>
            <Container ref={this.contractHtmlRef} id="htmlContainer">
              <Title>
                Data Backup 확인서
              </Title>
              <DateText>
                DATE : {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일
              </DateText>
              <MainContainer>
                <MainText>
                  본 장비에 대한 Data는 안전하게 Backup이 되어 있음을 확인합니다.
                </MainText>
                <SignContainer>
                  <Sign>고객명:</Sign>
                  <Sign>서명</Sign>
                </SignContainer>
              </MainContainer>
              <FooterTitle>[DATA BACKUP에 대한 안내]</FooterTitle>
              <Footer>
                Data Backup은 고객의 책임이므로 반드시 Backup을 받아 놓으시기 바랍니다. 고객님의 별도 Backup이 이루어지지 않은 상태에서 교체수리에 발생되는 데이터 손실에 대해서는 보증하지 않습니다
              </Footer>
            </Container>
            
            <canvas ref={canvasRef} width="520" height="430" style={{position: 'relative', left:'50%', transform:'translateX(-50%)',display:'none'}} id="canvas">
              <img src={this.state.contractHtmlSrc} />
            </canvas>
            <Button
              variant="contained"
              color="primary"
              onClick={this.getcanvas}
              id="createBtn"
            >문서 생성</Button>
            <br/>
            <TextField
              id="outlined-multiline-static"
              label="파일 명"
              name="name"
              value={this.state.name}
              onChange={this.handleValueChange}
              placeholder="파일 명"
              variant="outlined"
              className={classes.box_fullWidth}
              autoComplete="off"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
            >
              추가
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClose}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ContractAdd);