import React from "react";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import { makeStyles } from "@material-ui/core/styles";
import TopImage from "../../components/sections/TopImage";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import cisco1 from "./../../img/cisco01_01.jpg";
import cisco2 from "./../../img/cisco01_02.jpg";
import cisco3 from "./../../img/cisco01_03.jpg";

import "../../css/hardware.css";
import $ from "jquery";
window.$ = $;
const img_data = [
  {
    image: "banner4.jpg",
    title: "네트워크",
    menu1: "하드웨어인프라",
    menu2: "네트워크"
  }
];

const useStyles = makeStyles((theme) => ({
  left: {
    textAlign: "left !important"
  },
  justify: {
    textAlign: "justify !important"
  }
}));

export default function Hardware3() {
  const classes = useStyles();
  $(document).ready(function () {
    var count = 0;
    do_ani(".article > div > *", count);
    do_ani(".split-item", count);
    $(window).scroll(function () {
      do_ani(".article > div > *", count);
      do_ani(".split-item", count);
    });
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
      <Header />
      {img_data.map((v, i) => (
        <TopImage data={v} key={i} />
      ))}
      <div className="hardware_container">
        <div className="article">
          <div className="article_top">
            <div>
              <span>Cisco Network</span>
            </div>
            <div>
              <div className="highlight">Cisco 스위치</div>
            </div>
          </div>
          <div className="article_mid">
            <div className={classes.left} style={{ fontSize: "15px" }}>
              오늘날 엔터프라이즈 네트워크는 언제, 어디서나, 어떤 장치를
              사용하든 모든 사용자에게 보안과 안정성 그리고 원활한 연결을 보장해
              줄 수 있어야 합니다.
              <br className="pc" /> 성공적인 비즈니스를 위한 시스코 엔터프라이즈
              네트워크 신제품을 소개해 드립니다.
            </div>
          </div>
          <div className="article_top">
            <div>
              <div>
                <div className="highlight">스위치</div>
              </div>
            </div>
            <div>Cisco Catalyst 멀티기가비트 기술(mGig)을 지원하는 스위치</div>
          </div>
          <div className="article_mid">
            <div
              className={classes.left}
              style={{ fontSize: "15px", marginBottom: "30px" }}
            >
              시스코는 Category 5e 케이블에서도 멀티기가비트 속도(2.5Gbps 및
              5Gbps)를 사용할 수 있는 혁신적 기술인 Cisco Catalyst 멀티기가비트
              기술 (mGig)을 탑재한 최신형 스위치를 출시했습니다. 이 기술은
              기존의 구형 케이블 인프라를 교체하지 않고서도 IEEE 802.11ac 초고속
              무선랜을 위해 충분한 성능을 발휘하는 유선랜 네트워크 구축에
              효과적입니다. 현재 mGig 기술은 Cisco Catalyst 3560-CX 시리즈,
              Cisco Catalyst 3850 시리즈, Cisco Catalyst 4500E 시리즈의 라인
              카드를 통해 지원됩니다. mGig를 지원하는 모델 외에도 Cisco Catalyst
              2960-C/3560-C 시리즈의 업그레이드 버전인 Cisco Catalyst
              2960-CX/3560-CX 시리즈 모델 및 SFP+ 모듈 슬롯이 탑재되어 10GE
              다운링크를 지원하는 Cisco Catalyst 3850 시리즈 모델 등 새로운
              시리즈 모델도 함께 출시되었습니다.
            </div>
            <img src={cisco1} alt="cisco" />
            <img src={cisco2} alt="cisco" />
            <img src={cisco3} alt="cisco" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
