import React from "react";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TopImage from "../../components/sections/TopImage";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import vmware from "./../../img/vmware.jpg";
import icon1 from "./../../img/icon/6.png";
import icon2 from "./../../img/icon/1.png";
import icon3 from "./../../img/icon/3.png";
import icon4 from "./../../img/icon/13.png";
import icon5 from "./../../img/icon/34.png";
import icon6 from "./../../img/icon/40.png";
import icon7 from "./../../img/icon/41.png";
import icon8 from "./../../img/icon/42.png";
import icon9 from "./../../img/icon/43.png";
import icon10 from "./../../img/icon/44.png";
import icon11 from "./../../img/icon/45.png";
import icon12 from "./../../img/icon/46.png";
import "../../css/virtual.css";

import $ from "jquery";
window.$ = $;

const img_data = {
  image: "banner3.jpg",
  title: "서버 가상화",
  menu1: "가상화인프라",
  menu2: "서버가상화"
};

const useStyles = makeStyles((theme) => ({
  left: {
    textAlign: "left !important"
  }
}));

export default function Virtualization1() {
  const classes = useStyles();
  $(document).ready(function () {
    do_ani(".article > div > *");
    $(window).scroll(function () {
      do_ani(".article > div > *");
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
      <TopImage data={img_data} />
      <div className="virtual_container">
        <div className="article">
          <div className="article_top">
            <div>
              <span>VMware vSphere</span>
            </div>
            <div>
              <div className="highlight">
                업계 최고의 가상화 플랫폼: VMware vSphere
              </div>
              vSphere는 하이브리드 클라우드 전반의 공통 운영 환경에서
              애플리케이션을 실행, 관리, 연결, 보호할 수 있도록 지원합니다.
            </div>
          </div>
          <div className="article_mid">
            <img src={vmware} alt="vm" />
            <div className={classes.left}>
              VMware는 사용자가 안심하고 수직 확장 및 수평 확장 애플리케이션을
              가상화할 수 있게 해주며 가용성을 더욱 향상시키고 가상 데이터
              센터를 간소화합니다. 그 결과 데이터 센터 비용을 대폭 절감하고
              시스템 및 애플리케이션 가동 시간을 늘리며 데이터 센터 운영 방식을
              획기적으로 간소화할 수 있습니다.
            </div>
          </div>
          <div className="article_mid2">
            <Paper elevation={0} className="paper">
              <img src={icon1} alt="icon" />
              <div>
                데이터센터 통합 및<br /> 비즈니스 연속성
              </div>
              <div>
                가상화를 통해 대규모 데이터 센터 운영 및 관리를 간소화 하고
                비즈니스 효율성을 높이며 자본 비용과 운영 비용을 절감할 수
                있습니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon2} alt="icon" />
              <div>
                애플리케이션 및 <br className="mobile" />
                인프라 보안
              </div>
              <div className={classes.left}>
                간편하고 확장 가능한 보안 솔루션을 통해 보안 위협 감지 및 분석의
                정확성을 향상시키고 대응시간을 단축합니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon3} alt="icon" />
              <div>지능적인 운영 관리 및 자동화</div>
              <div className={classes.left}>
                vSphere with Operations Management를 통해 지능적 운영 관리 및
                자동화 기능을 데이터 센터에 추가합니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon4} alt="icon" />
              <div>빅데이터 가상화</div>
              <div>
                VMware는 기존 애플리케이션에는 물론 <br className="pc" />
                빅데이터에도 가장 적합한 플랫폼입니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon5} alt="icon" />
              <div>
                원격 근무지 및<br className="mobile" /> 지사 지원
              </div>
              <div className={classes.left}>
                로컬 IT 직원이 거의 또는 전혀 없는 상태에서도 원격 근무지 및
                지사를 관리합니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon6} alt="icon" />
              <div style={{ wordBreak: "keep-all" }}>
                기존 Unix를 가상 Linux로
                <br className="pc" /> 마이그레이션
              </div>
              <div className={classes.left}>
                성능과 가용성을 개선하고 가상 머신 용량을 늘리며 재해 복구
                기능을 활용할 수 있습니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon7} alt="icon" />
              <div>압도적인 시장점유율</div>
              <div>
                전 세계 35만여 고객사 (한국: 3,000여사)를 보유한 가상화 시장의
                리더로 포츈 1,000대 기업의 99%가 사용 중입니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon8} alt="icon" />
              <div>우수한 통합률과 퍼포먼스</div>
              <div className={classes.left}>
                메모리 오버커밋 기술을 통한 높은 통합률을 가지며, 리소스
                유효활용에 따른 높은 퍼포먼스를 보여줍니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon9} alt="icon" />
              <div>높은 신뢰성 및 안정성</div>
              <div className={classes.left}>
                실제 고객 환경에서 6년 이상 구동되며 검증된 안정성을 보여주어
                기존의 고객 및 신규 도입 예정인 기업들의 지지를 받습니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon10} alt="icon" />
              <div>간단하고 편리한 관리 기능</div>
              <div>
                편리하고 단일화된 관리 프로세스, 쉽고 빠른 이중화 구성 및
                마이그레이션을 제공합니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon11} alt="icon" />
              <div>기존 자산의 유용한 활용</div>
              <div className={classes.left}>
                90여 개 이상의 Guest OS를 지원하며, 폭넓은 하드웨어와
                소프트웨어를 서포트합니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon12} alt="icon" />
              <div>다양한 에디션과 클라우드로의 확장</div>
              <div className={classes.left}>
                사용자 예산에 맞는 vSphere 에디션을 선택 가능하며, 클라우드로
                확장 가능한 VMware만의 다양한 솔루션을 제공합니다.
              </div>
            </Paper>
          </div>
          <div className="pdf_wrap">
            <p>
              <a
                href="https://www.vmware.com/content/dam/digitalmarketing/vmware/ko/pdf/vsphere/vmw-vsphere-datasheet.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="PDF_link"
              >
                DataSheet Download
              </a>
            </p>
          </div>
          <div className="article_bot">
            <div>
              <span>vSphere Reference</span>
            </div>
            <div>
              <Paper elevation={3} className="paper">
                <iframe
                  src="https://players.brightcove.net/1534342432001/Byh3doRJx_default/index.html?videoId=5969011395001"
                  allowFullScreen
                  frameBorder="0"
                  title="vm1"
                />
              </Paper>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br className="pc" />
          <br className="pc" />
          <br className="pc" />
          <br className="pc" />
          <br className="pc" />
          <br className="pc" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
