import React from 'react'
import { post } from 'axios';
import 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import $ from 'jquery';
window.$ = $;

const styles = theme => ({
 
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
    checkbox : {
      width:'150px',
      float:'left',
      height:'50px',
      margin:"0 auto",
      marginTop:'26px'
    },
    select1 : {
      width:'48%',
      float:'right',
      margin:"0 auto",
      marginTop:'0'
    },
    select2 : {
      width:'48%',
      float:'left',
      margin:"0 auto",
      marginTop:'28px'
  },
  btn:{
    fontSize:'15px',
  },
  paper:{
    maxHeight:'600'
  }

});

class CustomerAdd extends React.Component {
    constructor(props) {            
      super(props);
      this.state = {
        cust_name : '',
        cust_type : '',
        response_type : '',
        cust_addr : '',
        cust_tel : '',
        cust_fax : '',
        num_employee : '',
        url : '',
        business_num : '',
        main_bussiness : '',
        main_trading_company : '',
        sales : '',
        pc_num : '',
        server_num : '',
        use_solution : '',
        build_type : '',
        open:false
      }
      this.handleFormSubmit = this.handleFormSubmit.bind(this)
      this.handleValueChange = this.handleValueChange.bind(this)
      this.addCustomer = this.addCustomer.bind(this)
      this.handleClickOpen = this.handleClickOpen.bind(this)
      this.handleClose = this.handleClose.bind(this);
    }

    handleFormSubmit(e) {
      e.preventDefault()
      if(this.state.cust_name === "")
        alert('고객사 명은 필수입력 항목입니다')
      else{
        this.addCustomer()
        .then((response) => {
          this.props.stateRefresh();
        })
        this.setState({
          cust_name : '',
          cust_type : '',
          response_type : '',
          cust_addr : '',
          cust_tel : '',
          cust_fax : '',
          num_employee : '',
          url : '',
          business_num : '',
          main_bussiness : '',
          main_trading_company : '',
          sales : '',
          pc_num : '',
          server_num : '',
          use_solution : '',
          build_type : '',
          open:false
        })   
      }         
    }

    handleValueChange(e) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;      
      this.setState(nextState);
    }
    
    addCustomer(){
      const url = '/api/customers'
      const formData = new FormData();
      formData.append('cust_name', this.state.cust_name)
      formData.append('cust_type', this.state.cust_type)
      formData.append('response_type', this.state.response_type)
      formData.append('cust_addr', this.state.cust_addr)
      formData.append('cust_tel', this.state.cust_tel)
      formData.append('cust_fax', this.state.cust_fax)
      formData.append('num_employee', this.state.num_employee)
      formData.append('url', this.state.url)
      formData.append('business_num', this.state.business_num)
      formData.append('main_bussiness', this.state.main_bussiness)
      formData.append('main_trading_company', this.state.main_trading_company)
      formData.append('sales', this.state.sales)
      formData.append('pc_num', this.state.pc_num)
      formData.append('server_num', this.state.server_num)
      formData.append('use_solution', this.state.use_solution)
      formData.append('build_type', this.state.build_type)
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
        cust_name : '',
        cust_type : '',
        response_type : '',
        cust_addr : '',
        cust_tel : '',
        cust_fax : '',
        num_employee : '',
        url : '',
        business_num : '',
        main_bussiness : '',
        main_trading_company : '',
        sales : '',
        pc_num : '',
        server_num : '',
        use_solution : '',
        build_type : '',
        open:false
      })
    }
 
    render() {
        const { classes } = this.props;
        
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} className={classes.btn}>
                    추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} className={classes.paper}>
                  <DialogTitle>고객사 추가</DialogTitle>
                  <DialogContent id="customer">
                    <TextField 
                      id="outlined-basic" 
                      label="고객사 명" 
                      name="cust_name"
                      multiline
                      rows={2}
                      value={this.state.cust_name}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_left}
                      autoComplete="off"
                    />
                    <FormControl className={classes.select1}>
                      <InputLabel htmlFor="age-native-simple">고객형태</InputLabel>
                      <Select labelId="demo-simple-select-label"id="demo-simple-select" label="고객형태" name="cust_type" value={this.state.cust_type} onChange={this.handleValueChange}>
                          <MenuItem value={'공공'}>공공</MenuItem>
                          <MenuItem value={'기업'}>기업</MenuItem>
                          <MenuItem value={'의료'}>의료</MenuItem>
                          <MenuItem value={'교육'}>교육</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className={classes.select1}>
                      <InputLabel htmlFor="age-native-simple">대응형태</InputLabel>
                      <Select labelId="demo-simple-select-label"id="demo-simple-select" label="대응형태" name="response_type" value={this.state.response_type} onChange={this.handleValueChange}>
                          <MenuItem value={'DROP'}>DROP</MenuItem>
                          <MenuItem value={'EDM'}>EDM</MenuItem>
                          <MenuItem value={'잠재'}>잠재</MenuItem>
                          <MenuItem value={'유효'}>유효</MenuItem>
                          <MenuItem value={'관리'}>관리</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField 
                      id="outlined-basic" 
                      label="고객사 주소" 
                      name="cust_addr"
                      value={this.state.cust_addr}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_fullWidth}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="고객사 전화번호" 
                      name="cust_tel"
                      value={this.state.cust_tel}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_left}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="매출액(억)" 
                      name="sales"
                      value={this.state.sales}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_right}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="고객사 팩스번호" 
                      name="cust_fax"
                      value={this.state.cust_fax}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_left}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="PC 대수" 
                      name="pc_num"
                      value={this.state.pc_num}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_right}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="종업원 수" 
                      name="num_employee"
                      value={this.state.num_employee}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_left}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="서버 대수" 
                      name="server_num"
                      value={this.state.server_num}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_right}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="홈페이지 주소" 
                      name="url"
                      value={this.state.url}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_left}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="사용 솔루션" 
                      name="use_solution"
                      value={this.state.use_solution}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      multiline
                      rows={3}
                      className={classes.box_halfWidth_right}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="사업자번호" 
                      name="business_num"
                      value={this.state.business_num}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_left}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="구축 형태" 
                      name="build_type"
                      value={this.state.build_type}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      multiline
                      rows={3}
                      className={classes.box_halfWidth_right}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="주력 사업" 
                      name="main_bussiness"
                      value={this.state.main_bussiness}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_left}
                      autoComplete="off"
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="IT 주거래 업체" 
                      name="main_trading_company"
                      value={this.state.main_trading_company}
                      onChange={this.handleValueChange}
                      variant="outlined"
                      className={classes.box_halfWidth_left}
                      autoComplete="off"
                    />
                  </DialogContent>
                  <DialogActions>
                      <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                      <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                  </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd)

