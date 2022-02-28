import React from "react";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import TopImage from "../../components/sections/TopImage";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import maintenance1 from "./../../img/maintenance1.png";
import maintenance1_m from "./../../img/maintenance1_m.png";
import maintenance2 from "./../../img/maintenance2.png";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import icon1 from "./../../img/icon/27.png";
import icon2 from "./../../img/icon/15.png";
import icon3 from "./../../img/icon/5.png";
import icon4 from "./../../img/icon/40.png";
import icon5 from "./../../img/icon/35.png";
import icon6 from "./../../img/icon/37.png";
import icon7 from "./../../img/icon/33.png";
import icon8 from "./../../img/icon/32.png";
import icon9 from "./../../img/icon/25.png";
import icon10 from "./../../img/icon/7.png";
import icon11 from "./../../img/icon/9.png";
import icon12 from "./../../img/icon/29.png";

import "../../css/support.css";
import $ from "jquery";
window.$ = $;

const img_data = {
  image: "banner1_1.jpg",
  title: "유지보수",
  menu1: "기술문의",
  menu2: "유지보수"
};

const useStyles = makeStyles((theme) => ({
  left: {
    textAlign: "left !important"
  }
}));

export default function Engineer2() {
  const classes = useStyles();
  $(document).ready(function () {
    var count = 0;
    do_ani(".article > div > *", count);
    do_ani(".split-item", count);
    $(window).scroll(function () {
      do_ani(".article > div > *", count);
      do_ani(".split-item", count);
    });

    $('.icons').height($('.icons').width())
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
  if ($(window).width() < 600) {
    $("#maintenance1").attr("src", maintenance1_m);
  }
  return (
    <div>
      <Header/>
      <TopImage data={img_data} />
      <div className="maintenance_container">
        <div className="article">
          <div className="article_top">
            <div>
              <span>서버 스토리지 통합 유지보수</span>
            </div>
          </div>
          <div className="article_mid">
            <img src={maintenance1} id="maintenance1" alt="maintenance" />
          </div>

          <div className="article_top">
            <div>
              <span>엔지니어 유지보수 지원</span>
            </div>
          </div>

          <div className="article_mid">
            <div className="engineer_container">
              <Paper elevation={1} className="paper_engineer_slim">
                <img src={icon1} alt="icon" className="icons"/>
                <div>정기점검</div>
                <div>(월/분기) 1회 정기점검</div>
              </Paper>
              <Paper elevation={1} className="paper_engineer_slim">
                <img src={icon2} alt="icon" className="icons"/>
                <div>상시지원</div>
                <div>장애발생 횟수 제한없이 지원</div>
              </Paper>
              <Paper elevation={1} className="paper_engineer_slim">
                <img src={icon3} alt="icon" className="icons"/>
                <div>장애지원</div>
                <div>현장지원 또는 원격지원</div>
              </Paper>
              <Paper elevation={1} className="paper_engineer_slim">
                <img src={icon4} alt="icon" className="icons"/>
                <div>부품지원</div>
                <div>교체파트(부품) 무상지원</div>
              </Paper>
              <Paper elevation={1} className="paper_engineer_slim">
                <img src={icon5} alt="icon" className="icons"/>
                <div>서비스 제공</div>
                <div>계약레벨에 따른 신속지원</div>
              </Paper>
              <Paper elevation={1} className="paper_engineer_slim">
                <img src={icon6} alt="icon" className="icons"/>
                <div>이력관리</div>
                <div>장비 변경/장애 이력 관리</div>
              </Paper>
            </div>
          </div>

          <div className="engineer_container2">
            <Paper elevation={0} className="paper_engineer">
              <img src={icon7} alt="icon" />
              <div>빠른 장애처리</div>
              <div>
                업무 시간 외에도 24시간 365일 장애접수 및 사내 비상 연락망
                체계를 통해 4시간 이내 장애 지원 및 시스템 장애로 인한 업무 손실
                시간 최소화
              </div>
            </Paper>
            <Paper elevation={0} className="paper_engineer">
              <img src={icon8} alt="icon" />
              <div>정품 부품 무상 공급</div>
              <div>
                벤더사를 통해 공급받은 정품 및 최신의 부품(PART)만을 빠르게 공급
              </div>
            </Paper>
            <Paper elevation={0} className="paper_engineer">
              <img src={icon9} alt="icon" />
              <div>장애 사전 예방</div>
              <div>
                (월/분기) 1회 고객사 방문을 통해 하드웨어 상태점검 및 로그 분석,
                Firmware 관리 OS 패치 및 Driver Update 등으로 사전에 장애 발생
                원인 최소화
              </div>
            </Paper>
            <Paper elevation={0} className="paper_engineer">
              <img src={icon10} alt="icon" />
              <div>사후관리</div>
              <div>
                정기 점검 리포트를 통해 고객사 현재 시스템에 대한 상태 및 정보
                제공, 장애 지원 리포트를 통해 장애 원인 분석 및 처리로 체계적
                관리
              </div>
            </Paper>
            <Paper elevation={0} className="paper_engineer">
              <img src={icon11} alt="icon" />
              <div>최고의 기술력</div>
              <div className={classes.left}>
                하드웨어(HP, Dell 공인서비스센터) / 가상화(VMware, Citrix, MS
                Hyper-V / OS(Windows, Linux) 하드웨어, 소프트웨어 문제발생
                여부에 관계없이 전문 엔지니어 기술지원 서비스 제공
              </div>
            </Paper>
            <Paper elevation={0} className="paper_engineer">
              <img src={icon12} alt="icon" />
              <div>관리비용 절감</div>
              <div>
                장애 PART 전액 무상교체 및 엔지니어 출장 비용 무상지원을 통해
                관리 비용 절감
              </div>
            </Paper>
          </div>

          <div className="article_top">
            <div>
              <span>유지보수 절차</span>
            </div>
          </div>
          <div className="article_mid">
            <img src={maintenance2} id="maintenance2" alt="maintenance" />
          </div>
          <div
            className="article_top"
            style={{
              marginBottom: "50px"
            }}
          >
            <div>
              <span>유지보수 대상고객</span>
            </div>
          </div>
          <div className="article_mid">
            <div>
              <ul>
                <li>서버를 관리하는 전문 인력이 없는 고객</li>
                <li>체계적인 장비관리가 필요한 고객</li>
                <li>전산실의 비용절감과 효율적 운영을 원하는 고객</li>
                <li>전산실의 아웃소싱을 원하는 고객</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
