import React from 'react';
import 'date-fns';
import { withStyles } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormGroup from "@mui/material/FormGroup";
import TextField from '@mui/material/TextField';
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import MuiCheckbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";

const styles = theme =>({
    
  root: {
    fontFamily: "NanumSquare !important",
    margin: "0 auto",
    maxWidth: "1280px",
    padding:20,
    paddingTop:100,
    paddingBottom:100,

  },
  margin: {
    marginTop:"80px"
  },
  font: {
    fontFamily: "NanumSquare !important"
  },
  marginBottom: {
    marginBottom: "50px",
    "& > *":{
      marginTop:10
    },
  },
  hidden: {
    display: "none"
  },
  button: {
    background: "#6bbf24"
  },
  formControl: {
    marginTop: 30,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  text: {
    color: "#313131",
    opacity: 0.7
  },
  btn: {
    fontSize: "15px"
  }
});

const Checkbox = withStyles({
  root: {
    color: "#6bbf24",
    "&$checked": {
      color: "#6bbf24"
    }
  },
  checked: {}
})(MuiCheckbox);


class SurveyView extends React.Component {

    constructor(props) {    
      super(props);
      this.state = {  
        comp_name : this.props.c.comp_name,
        name : this.props.c.name,
        department : this.props.c.department,
        rank : this.props.c.rank,
        contact : this.props.c.contact,
        email : this.props.c.email,
        form1 : this.props.c.form1.split(','),
        form2 : this.props.c.form2.split(','),
        form3 : this.props.c.form3.split(','),
        form4 : this.props.c.form4.split(','),
        form5 : this.props.c.form5.split(','),
        form6 : this.props.c.form6.split(','),
        form7 : this.props.c.form7.split(','),
        poc : this.props.c.poc,
        open:false
      }
      this.handleClickOpen = this.handleClickOpen.bind(this)    
      this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
      this.setState({
        title : this.props.c.title,
        content : this.props.c.content,
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
                <FormHelperText>
                  아래의 간단한 내용의 설문을 작성해 주시면 소정의 기념품을 드립니다.
                </FormHelperText>

                <FormControl component="fieldset" className={classes.formControl}>
                  <FormGroup className={classes.marginBottom}>
                    <TextField
                      id="custom-css-standard-input"
                      label={<div className={classes.font}>회사명</div>}
                      value={this.state.comp_name}
                    />
                    <TextField
                      id="custom-css-standard-input"
                      label={<div className={classes.font}>성함</div>}
                      value={this.state.name}
                    />
                    <TextField
                      id="custom-css-standard-input"
                      label={<div className={classes.font}>부서</div>}
                      value={this.state.department}
                    />
                    <TextField
                      id="custom-css-standard-input"
                      label={<div className={classes.font}>직함</div>}
                      value={this.state.rank}
                    />
                    <TextField
                      id="custom-css-standard-input"
                      label={<div className={classes.font}>연락처</div>}
                      value={this.state.contact}
                    />
                    <TextField
                      id="custom-css-standard-input"
                      label={<div className={classes.font}>이메일</div>}
                      value={this.state.email}
                    />
                  </FormGroup>

                  <div>(설문 복수 응답 가능)</div>

                  <div>
                    1. 현재 사내에 서버가상화 또는 데스크탑 가상화를 도입해서 운영하고
                    계십니까?
                    
                  </div>
                  <FormGroup className={classes.marginBottom}>
                  {
                  this.state.form1[0] === 'true' ? (
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="a1"
                          checked
                        />
                      }
                      label={<div className={classes.font}>서버가상화 구축</div>}
                    />
                  ) : 
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="a1"
                        />
                      }
                      label={<div className={classes.font}>서버가상화 구축</div>}
                    />
                  }
                  {
                  this.state.form1[1] === 'true' ? (
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="a1"
                          checked
                        />
                      }
                      label={<div className={classes.font}>데스크탑 가상화 구축</div>}
                    />
                  ) : 
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="a1"
                        />
                      }
                      label={<div className={classes.font}>데스크탑 가상화 구축</div>}
                    />
                  }
                  {
                  this.state.form1[2] === 'true'? (
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="a1"
                          checked
                        />
                      }
                      label={<div className={classes.font}>계획중에 있습니다</div>}
                    />
                  ) : 
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="a1"
                        />
                      }
                      label={<div className={classes.font}>계획중에 있습니다</div>}
                    />
                  }
                  {
                  this.state.form1[3] === 'true' ? (
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="a1"
                          checked
                        />
                      }
                      label={<div className={classes.font}>아니오</div>}
                    />
                  ) : 
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="a1"
                        />
                      }
                      label={<div className={classes.font}>아니오</div>}
                    />
                  }
                  </FormGroup>

                  <div>2. 운영하고 계시다면, 가상화 솔루션은 어떤 제품입니까?</div>
                  <FormGroup className={classes.marginBottom}>
                    {
                    this.state.form2[0] === 'true' ? (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="a1"
                            checked
                          />
                        }
                        label={<div className={classes.font}>VMware</div>}
                      />
                    ) : 
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="a1"
                          />
                        }
                        label={<div className={classes.font}>VMware</div>}
                      />
                    }
                    {
                    this.state.form2[1] === 'true' ? (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="a1"
                            checked
                          />
                        }
                        label={<div className={classes.font}>Citrix</div>}
                      />
                    ) : 
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="a1"
                          />
                        }
                        label={<div className={classes.font}>Citrix</div>}
                      />
                    }
                    {
                    this.state.form2[2] === 'true' ? (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="a1"
                            checked
                          />
                        }
                        label={<div className={classes.font}>Microsoft</div>}
                      />
                    ) : 
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="a1"
                          />
                        }
                        label={<div className={classes.font}>Microsoft</div>}
                      />
                    }
                    {
                    this.state.form2[3] !== 'false' ? (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="a1"
                            checked
                          />
                        }
                      label={<div className={classes.font}>기타 : {this.state.form2[3]}</div>}
                      />
                    ) : 
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="a1"
                          />
                        }
                        label={<div className={classes.font}>기타</div>}
                      />
                    }
                  </FormGroup>

                  <div>
                    3. 가상화, 클라우드에 대한 요구사항을 가지고 계시다면, 그 도입시기는
                    언제입니까?
                  </div>
                  <FormGroup className={classes.marginBottom}>
                    {
                      this.state.form3[0] === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>6개월 이내</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>6개월 이내</div>}
                        />
                      )
                    }
                    {
                      this.state.form3[1] === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>1년 이내</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>1년 이내</div>}
                        />
                      )
                    }
                    {
                      this.state.form3[2] === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>2년 이내</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>2년 이내</div>}
                        />
                      )
                    }
                    {
                      this.state.form3[3] !== 'false' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                        label={<div className={classes.font}>기타 : {this.state.form3[3]}</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>기타</div>}
                        />
                      )
                    }
                  </FormGroup>

                  <div>
                    4. 사내에 가상화 솔루션 도입 및 추가 시 중요하게 고려하는 것은
                    무엇입니까?
                  </div>
                  <FormGroup className={classes.marginBottom}>
                    {
                        this.state.form4[0] === 'true' ? (
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="a1"
                                checked
                              />
                            }
                            label={<div className={classes.font}>IT 비용 절감</div>}
                          />
                        ) : 
                        (
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="a1"
                              />
                            }
                            label={<div className={classes.font}>IT 비용 절감</div>}
                          />
                        )
                    }
                    {
                      this.state.form4[1] === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>자원 통합을 통한 관리의 편리성과 안정성</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>자원 통합을 통한 관리의 편리성과 안정성</div>}
                        />
                      )
                    }
                    {
                      this.state.form4[2] === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>무중단 장애대비 등을 위한 고가용성 확보</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>무중단 장애대비 등을 위한 고가용성 확보</div>}
                        />
                      )
                    }
                    {
                      this.state.form4[3] !== 'false' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                        label={<div className={classes.font}>기타 : {this.state.form4[3]}</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>기타</div>}
                        />
                      )
                    }
                  </FormGroup>

                  <div>5. 가상화 솔루션 도입 및 추가 시 장애요소는 무엇입니까?</div>
                  <FormGroup className={classes.marginBottom}>
                    {
                      this.state.form5[0] === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>구축 비용의 부담</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>구축 비용의 부담</div>}
                        />
                      )
                    }
                    {
                      this.state.form5[1] === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>새로운 환경 변화에 따른 기존 사용자들의 불만</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>새로운 환경 변화에 따른 기존 사용자들의 불만</div>}
                        />
                      )
                    }
                    {
                      this.state.form5[2] === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>가상화 인프라에 대한 적응과 교육의 필요</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>가상화 인프라에 대한 적응과 교육의 필요</div>}
                        />
                      )
                    }
                    {
                      this.state.form5[3] === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>가상화 인프라에 대한 안정성 및 장애 우려</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>가상화 인프라에 대한 안정성 및 장애 우려</div>}
                        />
                      )
                    }
                    {
                    this.state.form5[4] !== 'false' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>기타 : {this.state.form5[4]}</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>기타</div>}
                        />
                      )
                    }
                  </FormGroup>

                  <div>
                    6. 다음 가상화 솔루션 중 보다 자세한 정보가 필요한 솔루션은
                    무엇입니까?
                  </div>
                  <FormGroup className={classes.marginBottom}>
                    {
                      this.state.form6[0] === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>VMware 서버 가상화 솔루션</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>VMware 서버 가상화 솔루션</div>}
                        />
                      )
                    }
                    {
                      this.state.form6[1] === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>VMware 데스크톱 가상화 솔루션</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>VMware 데스크톱 가상화 솔루션</div>}
                        />
                      )
                    }
                    {
                      this.state.form6[2] === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>VMware 애플리케이션 가상화 솔루션</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>VMware 애플리케이션 가상화 솔루션</div>}
                        />
                      )
                    }
                  </FormGroup>

                  <div>
                    7. 가상화, 클라우드에 대한 추가적인 지원이 필요한 부분은 무엇입니까?
                  </div>
                  <FormGroup className={classes.marginBottom}>
                    {
                      this.state.form7[0] === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>솔루션 정보 메일</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>솔루션 정보 메일</div>}
                        />
                      )
                    }
                    {
                      this.state.form7[1] === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>전문가의 컨설팅</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>전문가의 컨설팅</div>}
                        />
                      )
                    }   
                    {
                      this.state.form7[2] !== 'false' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>기타 : {this.state.form7[2]}</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>기타</div>}
                        />
                      )
                    }                   
                  </FormGroup>

                  <div>* POC(Proof Of Concept, 구축 데모)를 요청합니다.</div>
                    {
                      this.state.poc === 'true' ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                              checked
                            />
                          }
                          label={<div className={classes.font}>예, 요청합니다</div>}
                        />
                      ) : 
                      (
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="a1"
                            />
                          }
                          label={<div className={classes.font}>예, 요청합니다</div>}
                        />
                      )
                    }    
                </FormControl>      
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
              </DialogActions>
            </Dialog>
          </div>
        )
    }
}
     
export default withStyles(styles)(SurveyView)