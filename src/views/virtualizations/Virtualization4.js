import React from "react";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import Paper from "@material-ui/core/Paper";
import TopImage from "../../components/sections/TopImage";

import srm from "./../../img/srm.png";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import icon1 from "./../../img/icon/21.png";
import icon2 from "./../../img/icon/26.png";
import icon3 from "./../../img/icon/30.png";

import "../../css/virtual.css";
import $ from "jquery";
window.$ = $;

const img_data = [
  {
    image: "banner3.jpg",
    title: "재해복구시스템(DR)",
    menu1: "가상화인프라",
    menu2: "재해복구시스템"
  }
];

export default function Virtualization4() {
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
      {img_data.map((v, i) => (
        <TopImage data={v} key={i} />
      ))}
      <div className="virtual_container">
        <div className="article">
          <div className="article_top">
            <div>
              <span>VMware SRM</span>
            </div>
            <div className="left_mobile">
              <div className="highlight">
                재해 복구 소프트웨어 : VMware Site Recovery Manager
                <br />
              </div>
              정책 기반 관리, 무중단 테스트 및 자동화된 조정으로 프라이빗
              클라우드 환경 내 각 사이트 간에 애플리케이션 가용성과 모빌리티를
              구현하는 <br className="pc" />
              업계 최고의 재해 복구 소프트웨어입니다.
            </div>
          </div>
          <div className="article_mid">
            <img src={srm} alt="srm" />
            <div>
              VMware Site Recovery Manager는 VMware vSphere® 환경에서 모든
              애플리케이션을 관리하기 위해 확장할 수 있으며, 소프트웨어 정의
              데이터 센터(SDDC) 아키텍처를 활용하여 VMware NSX(네트워크 가상화),
              VMware vSAN(하이퍼 컨버지드 인프라를 지원하는 소프트웨어)과 같은
              다른 VMware 솔루션과 통합할 수 있습니다.
            </div>
          </div>
          <div className="article_mid2">
            <Paper elevation={0} className="paper">
              <img src={icon1} alt="icon" />
              <div>
                빠르고 안정적인
                <br className="mobile" /> IT 재해 복구 제공
              </div>
              <div>
                수시로 무중단 테스트를 수행하여 IT 재해 복구 소프트웨어의
                예측가능성 및 규정 준수를 보장할 수 있습니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon2} alt="icon" />
              <div>
                다운타임 없는
                <br className="pc" /> 애플리케이션 모빌리티 제공
              </div>
              <div>
                재해 복구 계획을 사용해서 메트로 범위로 분산되어 있는 사이트
                간에 대규모의 가상 머신을 실시간으로 이동함으로써 다운타임 없이
                vSphere의 vCenter 간 vMotion 운영을 조정할 수 있습니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon3} alt="icon" />
              <div>
                간편한 정책기반
                <br className="mobile" /> 관리 사용
              </div>
              <div>
                vSphere Web Client에서 관리되는 중앙 집중식 복구 계획을 사용하여
                수천 대의 가상머신을 손쉽게 보호할 수 있습니다.
              </div>
            </Paper>
          </div>
          <div className="pdf_wrap">
            <p>
              <a
                href="https://www.vmware.com/content/dam/digitalmarketing/vmware/ko/pdf/products/site-recovery-manager/vmware-site-recovery-manager-datasheet.pdf"
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
              <span>SRM Reference</span>
            </div>
            <div>
              <Paper elevation={3} className="paper">
                <iframe
                  src="https://players.brightcove.net/1534342432001/Byh3doRJx_default/index.html?videoId=4699019323001"
                  allowFullScreen
                  frameBorder="0"
                  title="vm4"
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
