import React from "react";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import Paper from "@material-ui/core/Paper";
import TopImage from "../../components/sections/TopImage";
import Support3C from "./Support3C";
import "../../css/support.css";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import engineer1 from "./../../img/engineer1.png";
import engineer2 from "./../../img/engineer4.png";
import engineer3 from "./../../img/engineer3.png";

import contact from "./../../img/contact.png";
import $ from "jquery";
window.$ = $;

const img_data = {
  image: "banner1_1.jpg",
  title: "기술지원문의",
  menu1: "기술문의",
  menu2: "기술지원문의"
};

export default function Support3() {
  $(document).ready(function () {
    var count = 0;
    do_ani(".article > div > *", count);
    do_ani(".split-item", count);
    $(window).scroll(function () {
      do_ani(".article > div > *", count);
      do_ani(".split-item", count);
    });

    $('.engineerIcon').height($('.engineerIcon').width()*2/3-20)
  });

  const do_ani = (target) => {
    var count = 0;
    $(target).each(function (i) {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if (bottom_of_window > bottom_of_object / 1.3) {
        if ($(this).css("animation-name") === "tmp") count += 1;

        $(this)
          .css("animation-name", "slide1")
          .delay(200 * count);
        $(this).animate({ opacity: "1" }, 1000);
      }
    });
  };
  return (
    <div>
      <Header/>
      <TopImage data={img_data} />
      <div className="maintenance_container">
        <div className="article">
          <div className="article_contact">
            <div className="left">
              <img src={contact} alt="contact" />
            </div>
            <div className="right">
              <table>
                <thead>
                  <tr>
                    <td colSpan="3">영업 및 기술문의</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>황재찬 부장</td>
                    <td>010-2525-5519</td>
                    <td>ahbon@nsworks.co.kr</td>
                  </tr>
                  <tr>
	{/*
                    <td>임재성 차장</td>
                    <td>010-9468-9344 </td>
                    <td>homerun@nsworks.co.kr</td>
					*/}
                  </tr>
                  <tr>
                    <td />
                    <td
                      style={{
                        textAlign: "right"
                      }}
                      colSpan="2"
                    >
                      <Support3C />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="article_top">
            <div>
              <span>기술 지원</span>
            </div>
          </div>
          <div className="article_mid2">
            <Paper elevation={0} className="paper">
              <img src={engineer1} alt="icon" className="engineerIcon"/>
              <div>가상화</div>
              <div>
                <ul>
                  <li>
                    VMware , Citrix , Microsoft <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;3개 가상화 구축 지원 가능
                  </li>
                </ul>
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={engineer3} alt="icon" className="engineerIcon"/>
              <div>H/W , S/W</div>
              <div>
                <ul>
                  <li>
                    HP, Dell 서버 스토리지 백업장비
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;Cisco, HP Network장비 판매 구축
                  </li>
                  <li>Windows 서버 / Linux 서버 판매</li>
                </ul>
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={engineer2} alt="icon" className="engineerIcon"/>
              <div>IT컨설팅</div>
              <div>
                <ul>
                  <li>IT인프라 구축 및 솔루션 컨설팅</li>
                  <li>백업, 이중화, 보안 컨설팅</li>
                </ul>
              </div>
            </Paper>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
