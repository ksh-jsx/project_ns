import React from "react";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper";
import TopImage from "../../components/sections/TopImage";
import classNames from "classnames";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import hp3 from "./../../img/hp02_01.jpg";
import dell1 from "./../../img/dell01_01.jpg";

import icon1 from "./../../img/icon/31.png";
import icon2 from "./../../img/icon/34.png";
import icon3 from "./../../img/icon/19.png";
import icon4 from "./../../img/icon/40.png";
import icon5 from "./../../img/icon/17.png";
import icon6 from "./../../img/icon/22.png";
import icon7 from "./../../img/icon/3.png";
import icon8 from "./../../img/icon/16.png";
import icon9 from "./../../img/icon/38.png";
import icon10 from "./../../img/icon/18.png";
import icon11 from "./../../img/icon/19.png";
import icon12 from "./../../img/icon/21.png";
import icon13 from "./../../img/icon/9.png";
import icon14 from "./../../img/icon/35.png";
import icon15 from "./../../img/icon/39.png";

import "../../css/hardware.css";
import $ from "jquery";
window.$ = $;
const img_data = {
  image: "banner4.jpg",
  title: "서버",
  menu1: "하드웨어인프라",
  menu2: "서버"
};

const useStyles = makeStyles((theme) => ({
  left: {
    textAlign: "left !important"
  },
  justify: {
    textAlign: "justify !important"
  },
  center: {
    textAlign: "center !important"
  }
}));

const HpeSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  data,
  ...props
}) => {
  const outerClasses = classNames(
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color"
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  return (
    <section
      {...props}
      className={outerClasses}
      style={{
        marginTop: 0
      }}
    >
      <div className="container">
        <div className={innerClasses}>
          <div className={splitClasses}>
            <div className="split-item">
              <div
                className="split-item-content center-content-mobile"
                data-reveal-container=".split-item"
              >
                <p
                  className="m-0"
                  style={{ fontSize: 0.8 + "rem", textAlign: "left" }}
                >
                  데이터센터의 60% 파워와 40%의 쿨링 비용이 Compute를 위해{" "}
                  사용됩니다. Compute를 위한 서버는 데이터센터 상면의 60%를
                  차지하며, 나머지 40%가 스토리지와 네트워크를 차지합니다.{" "}
                  <br className="pc" />
                  Compute는 데이터센터의 핵심이며, 서버는 Compute를 위한 핵심
                  요소입니다.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <img src={require("./../../img/hp01_01.jpg")} alt="1" />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile"
                data-reveal-container=".split-item"
              >
                <p
                  className="m-0"
                  style={{ fontSize: 0.8 + "rem", textAlign: "left" }}
                >
                  IT는 비즈니스의 가치를 보다 빠르고 효과적으로 전달할 수 있도록{" "}
                  변화해야 합니다. 일반적으로 서버는 기술중심적이고, 엔지니어의
                  수작업에 의해 개별적으로 운영되어 왔습니다.
                  <br />
                  새로운 Compute 시대에는 인프라가 기업의 서비스를 차별화 할 수
                  있는 중요한 부분이라는 점을 인식해야 합니다. ‘소프트웨어 정의
                  인프라’ 또는 ‘클라우드 기반의 컨버전스’나 ‘워크로드에 최적화된
                  인프라’가 비즈니스의 성과를 위해 필요합니다.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <img src={require("./../../img/hp01_02.jpg")} alt="2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DellSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  data,
  ...props
}) => {
  const outerClasses = classNames(
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color"
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  return (
    <section
      {...props}
      className={outerClasses}
      style={{
        marginTop: 0
      }}
    >
      <div className="container">
        <div className={innerClasses}>
          <div className={splitClasses}>
            <div className="split-item">
              <div
                className="split-item-content center-content-mobile"
                data-reveal-container=".split-item"
              >
                <h3
                  className="mt-0 mb-12"
                  style={{
                    color: "#000000",
                    fontSize: 1.2 + "rem",
                    wordBreak: "keep-all"
                  }}
                >
                  가상 및 프라이빗 클라우드 데이터에
                  <br className="pc" /> 권장되는 솔루션
                </h3>
                <p
                  className="m-0"
                  style={{ fontSize: 0.8 + "rem", textAlign: "left" }}
                >
                  컴퓨팅 노드당 최고 수준의 VM 성능과 집적도가 요구되는 대규모
                  가상화 환경에는 4소켓 R930와 FC830이 가장 적합합니다. 랜덤
                  입출력 워크로드에 최적화된 R930은 탁월한 입출력 성능과
                  처리량으로 미션 크리티컬 애플리케이션을 지원하며, 1U FC830은
                  집적도를 두 배로 높입니다. <br />올 플래시 구성의 초고집적 1U
                  2소켓 R630은 공간이 협소한 환경에서 비슷한 성능의 서버와
                  비교하여 절반의 공간만으로도 대용량 메모리와 최고 수준의
                  입출력 성능을 제공합니다. FC630은 높은 집적도와 향상된
                  인프라스트럭처 유연성을 제공 합니다. <br />
                  컨버지드 인프라스트럭처를 구축하여 효율성과 성능을 높이고 냉각
                  비용을 절감하려는 기업에는 M1000e 블레이드 서버 솔루션이
                  제격입니다.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <img src={require("./../../img/dell02_01.jpg")} alt="1" />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile"
                data-reveal-container=".split-item"
              >
                <h3
                  className="mt-0 mb-12"
                  style={{
                    color: "#000000",
                    fontSize: 1.2 + "rem",
                    wordBreak: "keep-all"
                  }}
                >
                  서버 및 데스크톱 가상화용으로 권장되는 솔루션
                </h3>
                <p
                  className="m-0"
                  style={{ fontSize: 0.8 + "rem", textAlign: "left" }}
                >
                  최대 3TB의 메모리와 가상 데스크톱 인프라스트럭처에 최적화된
                  입출력 옵션을 갖춘 R730은 최고 수준의 VDI 확장성을 보장합니다.
                  확장된 GPU 옵션은 더 나은 성능을 위해 CAD/CAM 같은 그래픽
                  집약적인 VDI 구축 환경을 지원합니다. PowerEdge M630 또는 M830
                  블레이드 노드를 장착할 경우 PowerEdge VRTX는 다양한 기능과
                  강력한 성능을 갖춘 서버 또는 데스크톱 가상화용 플랫폼이
                  됩니다. FC630은 가상 데스크톱 환경에서도 그 성능이
                  입증되었습니다.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <img src={require("./../../img/dell02_02.jpg")} alt="2" />
              </div>
            </div>
            <div className="split-item">
              <div
                className="split-item-content center-content-mobile"
                data-reveal-container=".split-item"
              >
                <h3
                  className="mt-0 mb-12"
                  style={{
                    color: "#000000",
                    fontSize: 1.2 + "rem",
                    wordBreak: "keep-all"
                  }}
                >
                  소프트웨어 정의 가상 스토리지에 권장되는 솔루션
                </h3>
                <p
                  className="m-0"
                  style={{ fontSize: 0.8 + "rem", textAlign: "left" }}
                >
                  Microsoft Storage Spaces, VMware Virtual SAN OpenStack™ Ceph
                  등의 소프트웨어 정의 스토리지 솔루션과 호환되며, 가상화된
                  스토리지 플랫폼으로 이상적인 서버 솔루션입니다. DAS 스토리지
                  어레이를 함께 사용하면 비용 효율적인 가상화 스토리지 풀을 더
                  큰 규모로 구축할 수 있습니다.{" "}
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <img src={require("./../../img/dell02_03.jpg")} alt="2" id="none_img"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Hardware1() {
  const classes = useStyles();
  $(document).ready(function () {
    var count = 0;
    do_ani(".article > div > *", count);
    do_ani(".split-item", count);
    $(window).scroll(function () {
      do_ani(".article > div > *", count);
      do_ani(".split-item", count);
    });

    $('.engineerIcon').height($('.engineerIcon').width())
  });

  const do_ani = (target, count) => {
    $(target).each(function (i) {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if (bottom_of_window > bottom_of_object / 1.1) {
        $(this).animate({ opacity: "1" }, 1000, function () {
          $(this).css("animation-duration", "0s");
        });
      }
    });
  };
  return (
    <div>
      <Header />
      <TopImage data={img_data} />
      <div className="hardware_container">
        <div className="article">
          <div className="article_top">
            <div>
              <span>HPE Server</span>
            </div>
            <div>
              <div className="highlight">Compute는 IT 인프라의 핵심입니다.</div>
              새로운 기회가 여기 있습니다.
            </div>
          </div>
          <div className="article_mid">
            <div className="paragraph">
              클라우드, 모빌리티, 빅 데이터, 보안이라는 4가지의 메가 트렌드는
              새로운 비즈니스 기회를 만들어 줍니다. <br className="mobile" />
              오늘날 이 새로운 기회에 도전하기 위해서는 보다 빠르게 서비스를
              제공하고, 운영의 효율성을 보여주어야 시장을 점유하고 수익을 창출할
              수 있습니다. IT는 새로운 기술을 활용하여, 비즈니스 성장을 이끌어
              주어야 합니다. <br className="mobile" />
              불행하게도 오늘날 IT인프라는 비효율적인 면이 존재하며 최적화되지
              않고 개별적으로 운영됩니다. 그 결과, 비즈니스 혁신을 위한
              요구사항을 만족시키지 못할 뿐만 아니라, 기본적인 비즈니스
              요구사항도 충족시키지 못해 어려움을 겪고 있습니다. 더 빠른
              비즈니스 성과를 효과적으로 도출하고, 달성하기 위해서는 IT인프라와
              비즈니스 요구사항간의 간극을 줄이는 것이 필수적입니다. 이제 새로운
              접근 방법을 통해 비즈니스 요구사항과 IT인프라의 간격을 줄일 때
              입니다. 인프라스트럭쳐의 핵심인 Compute에 대해 새롭게 접근할
              필요가 있습니다. 비즈니스의 혁신은 Compute에 대한 새로운 접근을
              통해 이루어 질 수 있습니다.
            </div>

            <HpeSplit />
          </div>
          <div className="article_top">
            <div />
            <div className="highlight">
              HPE ProLiant Server 랙 및 타워형 포트폴리오
            </div>
            <div className="left_mobile">
              ProLiant Gen9 랙형, 타워형 서버는 가장 유연하고, 안정적이며,
              최적화된 성능을 낼 수 있는 제품입니다.
            </div>
          </div>
          <div className="article_mid">
            <img src={hp3} alt="hp" />
          </div>
          <div className="pdf_wrap">
            <p>
              <a
                href="http://nsworks.ns7.biz/data_sheet/HPE_Server_Gen9_Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="PDF_link"
              >
                HPE Server DataSheet Download
              </a>
            </p>
          </div>
          <div className="article_top">
            <div>
              <span>Dell EMC Server</span>
            </div>
            <div className={classes.left}>
              <div className="highlight">차세대 POWEREDGE 서버 기술</div>
              <br />
              13세대 PowerEdge 서버는 Dell EMC가 제공하는 가장 발전된 형태의 랙,
              타워형 및 모듈식 인프라스트럭처 플랫폼 제품군으로서 웹,
              엔터프라이즈 및 하이퍼스케일 애플리케이션을 다른 어떤 제품보다
              폭넓게 지원하도록 설계되었습니다. 이 시스템의 차원이 다른 유연성,
              효율성, 성능은 다음과 같은 이점을 IT 조직에 제공합니다.
            </div>
          </div>
          <div className="article_mid2">
            <Paper elevation={0} className="paper">
              <img src={icon1} alt="icon" className="engineerIcon"/>
              <div className="card_title_wide">
                확장성과 적응성이 뛰어난 <br className="pc" /> 인프라스트럭처
                구축
              </div>
              <div className={classes.left}>
                확장성과 적응성이 뛰어난 PowerEdge 서버의 포트폴리오를 모듈식
                빌딩 블록으로 사용하여 원격 사무소에서 대규모 데이터 센터에
                이르기까지 다양한 환경에 대응 능력이 뛰어나고 미래 지향적인
                인프라스트럭처를 구축할 수 있습니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon2} alt="icon" className="engineerIcon"/>
              <div className="card_title_wide">
                확장된 자동화 기능과 <br className="pc" /> 새로운 액세스
                옵션으로
                <br className="pc" /> 장소에 구애받지 않는 관리 작업
              </div>
              <div className={classes.left}>
                시스템 관리 툴인 OpenManage 포트폴리오로 자동화 기능을 확대하고
                툴을 간소화하며 모바일 디바이스 액세스를 지원하면서 엔터프라이즈
                관리 작업을 더욱 간소화하고 더 높은 효율성을 제공하게
                되었습니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon3} alt="icon" className="engineerIcon"/>
              <div className="card_title_wide">
                확장성과 효율성이 뛰어난
                <br className="pc" /> 서버 스토리지로 <br className="pc" />
                애플리케이션 성능 향상
              </div>
              <div className={classes.left}>
                다양한 기능과 강력한 성능을 제공하는 서버 스토리지는 데이터 센터
                효율성을 극대화하도록 설계된 유연한 구성과 함께 대상
                애플리케이션의 성능을 높일 수 있습니다.
              </div>
            </Paper>
          </div>

          <div className="article_mid" />
          <div className="article_top">
            <div>
              <div className="highlight">
                PowerEdge 서버: 업계 최신 기술과 Dell EMC 혁신 기술의 만남
              </div>
            </div>
          </div>
          <div className="article_mid2">
            <img src={dell1} alt="icon" />
            <Paper elevation={0} className="paper">
              <img src={icon4} alt="icon" />
              <div>더 큰 처리 능력</div>
              <div>
                최신 세대 Intel® Xeon® 프로세서는 가상화 환경과 높은 성능을
                요구하는 비즈니스 애플리케이션의 성능을 강화합니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon5} alt="icon" />
              <div>대용량 저전력 메모리</div>
              <div className={classes.left}>
                DDR4 메모리로 ERP 및 데이터베이스 애플리케이션과 같은 워크로드의
                처리 속도를 개선합니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon6} alt="icon" />
              <div style={{ textAlign: "center" }}>
                확장성 및 효율성이 뛰어난 <br className="pc" />
                로컬 스토리지
              </div>
              <div>
                다양한 서버 내 스토리지 옵션은 올 플래시 구성, 인박스(In-box)
                하이브리드 계층형 솔루션, 저가의 고집적 대용량 플랫폼을 모두
                지원하며, 서버 기반 스토리지는 최상의 성능과 가치에 대한
                애플리케이션 요구사항을 충족합니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon7} alt="icon" />
              <div>간소화된 지능형 관리 환경</div>
              <div>
                OpenManage 툴은 향상된 로컬 액세스와 핸드헬드 디바이스에서
                데이터 센터를 안전하게 모니터링할 수 있는 새로운 모바일 디바이스
                및 자동화된 새로운 프로세스로 일상적인 작업에 소요되는 시간과
                비용을 줄여 운영 개시까지의 소요 기간을 단축해 줍니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon8} alt="icon" />
              <div>에너지 효율</div>
              <div>
                최대 40°C의 일정한 온도로 데이터 센터를 운영할 수 있는 Fresh Air
                2.0 등의 혁신적인 전원 및 냉각 기술로 냉각 요구 사항을 줄이고
                운영 비용을 대폭 절감해 줍니다.
              </div>
            </Paper>
          </div>
          <div className="article_top">
            <div>
              <div className="highlight">가상화 및 클라우드 컴퓨팅</div>
            </div>
            <div>인프라스트럭처 최적화용 DELL EMC 솔루션</div>
          </div>
          <div className="article_mid2 paper_wide paper_wide_left">
            <Paper elevation={0} className="paper">
              <div>대규모 가상화 환경의 이점</div>
              <div>
                가상화 기술은 물리적 컴퓨터 1대에서 실행되는 몇 대의 가상
                머신부터 여러 대의 루트 서버에 걸쳐 구축된 전체 서버 팜에
                이르기까지 다양한 규모의 환경에서 무분별한 서버 증가를
                최소화하여 하드웨어 및 네트워크 인프라스트럭처에 대한 투자
                효율성을 최적화합니다. 또한 가상화 기술은 활용도를 극대화하고,
                지원 리소스를 최적화하고, 설치 공간과 전력 비용을 절감하는 등
                대규모 구축 환경의 이점을 실현하는 한편, 더 높은 가용성과 복구
                성능을 보장할 수 있는 강력한 인프라스트럭처를 제공하는데 도움이
                됩니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <div>애플리케이션 요구 사항</div>
              <div>
                데스크톱 가상화 또는 프라이빗 클라우드와 같은 워크로드를
                처리하려면 효율적인 고성능 IT 인프라스트럭처가 필요합니다. VDI
                구축 환경에서는 통합, 집적도 및 성능이 무엇보다 중요합니다.
                가상화 플랫폼은 VM에 리소스를 충분히 할당할 수 있을 만큼 많은
                코어 수, 막대한 메모리 집적도, 유연한 입출력 옵션을 제공해야
                합니다.
              </div>
            </Paper>
            <Paper elevation={0} className="paper">
              <div>가상화 환경용 PowerEdge 서버</div>
              <div>
                PowerEdge 서버는 소켓당 최대 24개의 프로세싱 코어, 높은 메모리
                집적도 및 유연한 입출력 옵션으로 가상화 환경에서 탁월한 성능을
                실현하며
                <br className="pc" /> 다음과 같은 이점도 제공합니다.
              </div>
            </Paper>
          </div>
          <div className="article_mid2 paper_slim">
            <Paper elevation={0} className="paper">
              <img src={icon9} alt="icon" />
              <div className={classes.center}>운영 중단 없는 확장</div>
            </Paper>
            <Paper elevation={0} className="paper">
              <img src={icon10} alt="icon" />
              <div className={classes.center}>
                VDI 환경에서 그래픽 집약적인 애플리케이션을 효과적으로 지원<br/>
              </div>
            </Paper>

            <Paper elevation={0} className="paper">
              <img src={icon11} alt="icon" />
              <div className={classes.center}>서버당 더 많은 수의 VM 지원</div>
            </Paper>

            <Paper elevation={0} className="paper">
              <img src={icon12} alt="icon" />
              <div className={classes.left}>
                스위치에 구애받지 않는 파티셔닝 기술로 VM 간에 유연하게 리소스
                할당
              </div>
            </Paper>

            <Paper elevation={0} className="paper">
              <img src={icon13} alt="icon" />
              <div className={classes.left}>
                VMware® Virtual SAN™, Microsoft Storage Spaces 등의 가상
                스토리지 솔루션에 대한 완벽한 지원 및 호환성{" "}
              </div>
            </Paper>

            <Paper elevation={0} className="paper">
              <img src={icon14} alt="icon" />
              <div className={classes.left}>
                이중화된 하이퍼바이저 및 무장애 메모리 장애 격리 기능을 통한
                자동 페일오버로 애플리케이션 가동 시간 최대화
              </div>
            </Paper>

            <Paper elevation={0} className="paper">
              <img src={icon15} alt="icon" />
              <div className={classes.left}>
                OpenManage Integration Suite for Microsoft System Center 및
                OpenManage Integration for VMware vCenter™ 가상화 콘솔을 통한
                효율적인 관리 및 제어
              </div>
            </Paper>
          </div>
          <DellSplit />
          <div className="pdf_wrap">
            <p>
              <a
                href="http://nsworks.ns7.biz/data_sheet/Dell_poweredge-server-portfolio-brochure-revid.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="PDF_link"
              >
                Dell Server DataSheet Download
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
