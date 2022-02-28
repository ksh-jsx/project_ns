import React from "react";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import Paper from "@material-ui/core/Paper";
import TopImage from "../../components/sections/TopImage";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import engineer1 from "./../../img/engineer1.png";
import engineer2 from "./../../img/engineer2.png";
import engineer3 from "./../../img/engineer3.png";
import engineer4 from "./../../img/engineer4.png";

import "../../css/support.css";
import $ from "jquery";
window.$ = $;

const img_data = {
  image: "banner1_1.jpg",
  title: "엔지니어 현황",
  menu1: "기술문의",
  menu2: "엔지니어현황"
};

export default function Support1() {
  $(document).ready(function () {
    var count = 0;
    do_ani(".article > div > *", count);
    do_ani(".split-item", count);
    $(window).scroll(function () {
      do_ani(".article > div > *", count);
      do_ani(".split-item", count);
    });


    $(".engineerIcon").css('max-height','160px');
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
          <div className="article_top">
            <div>
              <span>엔지니어 및 연구인력</span>
            </div>
          </div>
          <div className="article_mid2">
            <Paper elevation={0} className="paper">
              <img src={engineer1} alt="icon" className="engineerIcon"/>
              <div>VIRTUALIZATION</div>
              <div>
                <ul>
                  <li>VMware VCP-DCV 3명</li>
                  <li>VMware VCP-DT 1명</li>
                  <li>Citrix XenDesktop CCA 1명</li>
                  <li>Citrix XenApp 1명</li>
                  <li>Citrix CCSP 2명</li>
                </ul>
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={engineer2} alt="icon" className="engineerIcon"/>
              <div>O / S</div>
              <div>
                <ul>
                  <li>MCSE 1명</li>
                  <li>
                    AD(Active Directory) 및 <br />
                    &nbsp;&nbsp;MS server 전담 엔지니어 2명
                  </li>
                  <li>Linux LPICm Suse CLA 1명</li>
                  <li>Linux master 2명</li>
                </ul>
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={engineer3} alt="icon" className="engineerIcon"/>
              <div>HARDWARE</div>
              <div>
                <ul>
                  <li>HP ATP 1명</li>
                  <li>Dell DCSE 1명</li>
                  <li>Cisco CCNA 1명</li>
                  <li>Cisco CCNP 1명</li>
                  <li>Alcatel Lucent 1명</li>
                </ul>
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={engineer4} alt="icon" className="engineerIcon"/>
              <div>DATABASE</div>
              <div>
                <ul>
                  <li>OCP 1명</li>
                  <li>OCNA 1명</li>
                  <li>MS SQL 엔지니어 1명</li>
                  <li>공학박사 (네트워크 보안)</li>
                  <li>이학박사</li>
                  <li>정보처리기사 외 다수</li>
                </ul>
              </div>
            </Paper>
          </div>
          <div className="article_top">
            <div>
              <span>파트너십</span>
            </div>
          </div>
          <div className="article_mid">
            <div>
              <ul id="partnership">
                <li>VMware Enterprise 파트너</li>
                <li>HP Industrial Server Storage 공인서비스 센터</li>
                <li>HP Server, Storage, Network 파트너</li>
                <li>Dell Server, Storage, Network 서비스 파트너</li>
                <li>Cisco 파트너</li>
                <li>Alcatel Lucent 파트너</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
