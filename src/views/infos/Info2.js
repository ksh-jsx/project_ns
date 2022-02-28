import React from "react";
import classNames from "classnames";

import "../../css/info.css";

import item1 from "./../../img/item1.jpg";
import item2 from "./../../img/item2.jpg";

import $ from "jquery";
window.$ = $;

const GreetingSplit = ({
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
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8" />
                <h3
                  className="mt-0 mb-12"
                  style={{
                    color: "#000000",
                    wordBreak: "keep-all",
                    textAlign: "center"
                  }}
                >
                  서비스의 품격과 가치를 높이겠습니다
                </h3>
                <p
                  className="m-0"
                  style={{
                    fontSize: 0.8 + "rem",
                    color: "#000000",
                    wordBreak: "keep-all"
                  }}
                >
                  고객 여러분께서 쉽게 체감하실 수 있는 실용적인 상품과 서비스를
                  만들겠습니다. 작고 사소한 것이라도 지속적으로 혁신하여, 고객
                  여러분께 꼭 필요한 서비스를 의미 있는 가치로 제공하겠습니다.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <img src={item1} style={{width:'100%'}} alt="1" />
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
                    wordBreak: "keep-all",
                    textAlign: "center"
                  }}
                >
                  상생과 나눔의 경영을 실천하겠습니다
                </h3>
                <p
                  className="m-0"
                  style={{
                    fontSize: 0.8 + "rem",
                    color: "#000000",
                    wordBreak: "keep-all"
                  }}
                >
                  사회공헌활동에 더욱 힘쓰고, 열린나눔 플랫폼을 통해 여러분과
                  함께 나눔의 문화를 만들어 가겠습니다. NSworks의 도전과 실천을
                  통해 더 편리하고 더 행복한 내일을 향해 경주하겠습니다.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <img src={item2} style={{width:'100%'}} alt="2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Info2() {
  $(document).ready(function () {
    var count = 0;
    do_ani(".info_container > div > div", count);
    do_ani(".split-item", count);
    $(window).scroll(function () {
      do_ani(".info_container > div > div", count);
      do_ani(".split-item", count);
    });
  });

  const do_ani = (target, count) => {
    $(target).each(function (i) {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if (bottom_of_window > bottom_of_object / 1.1) {
        $(this).animate({ opacity: "1", "animation-duration": "0s" }, 1000);
      }
    });
  };

  return (
    <div>
      {/* {window.location.href.indexOf("info") === 22 ? (
        <TopImage data={img_data} />
      ) : (
        <div />
      )} */}
      <div className="info_container" id="info_container2" style={{maxHeight:1750}}>
        <div className="article" id="article2">
          <div className="article_top">
            <div>
              <span>CEO 인사말</span>
            </div>
          </div>
          <div className="atricle_mid">
            <div className="greeting_container">
              <h3 style={{ wordBreak: "keep-all" }}>
                새로운 기술, 새로운 인재와 함께 하는 젊은 기업입니다.
              </h3>
              <div>
                <p>
                  네트워크를 통한 정보의 연결과 이동은 보다 나은 삶의 발전과
                  인간의 소중한 가치를 실현하는데 의의가 있습니다. NSworks는
                  이러한 프레임워크와 함께 고객과 만납니다.
                  <br />
                  <br />
                  신뢰와 정성으로 네트워크 기반 통합 비즈니스 환경을 구현하기
                  위하여 우수한 기술 인력을 바탕으로 최고의 서비스 품질을
                  제공합니다. 인간 존중과 미래지향의 가치를 위하여 가장 안전하고
                  효율적인 방식과 기법으로 고객만족에 부응하고자 합니다.
                  <br />
                  <br />
                  더불어 NSworks가 추구하고자 하는 네트워크와 정보통신에 대한
                  모든 기여와 봉사는 궁극적인 파트너십에서 출발합니다.
                </p>
                <p>
                  귀사의 발전에 <br className="mobile" />
                  NSworks가 함께 하겠습니다. <br />
                  감사합니다.
                </p>
                <div className="sign">
                  <img src={require("./../../img/logo.png")} alt="sign" />
                  <span>대표이사 공학박사</span>
                  <img
                    src={require("./../../img/ceo2.png")}
                    style={{
                      maxWidth: "100px"
                    }}
                    alt="logo"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="atricle_mid">
            <GreetingSplit />
          </div>
        </div>
      </div>
    </div>
  );
}
