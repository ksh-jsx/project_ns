import React from "react";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import TopImage from "../../components/sections/TopImage";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import "../../css/q&r.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import $ from "jquery";
window.$ = $;

const img_data = {
  image: "banner6.jpg",
  title: "원격지원",
  menu1: "기술문의",
  menu2: "원격지원"
};

const useStyles = makeStyles((theme) => ({
  btn: {
    background:'#64A538',
    position:'relative',
    left:'50%',
    transform:'translateX(-50%)'
  }
}));

export default function Engineer1() {
  const classes = useStyles();
  $(document).ready(function(){
    var url = 'http://rs.nsworks.co.kr/'
    window.open(url, "_blank");
    
  })
  return (
    <div>
      <Header/>
      <TopImage data={img_data} />
      <div className="maintenance_container">
        <div className="article">
        
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
        >
          원격지원 페이지로 이동하기
        </Button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
