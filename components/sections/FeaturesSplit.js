import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import Button from "../elements/Button";
import ButtonGroup from "../elements/ButtonGroup";

const propTypes = {
  ...SectionSplitProps.types
};

const defaultProps = {
  ...SectionSplitProps.defaults
};

const FeaturesSplit = ({
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
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <div className={splitClasses}>
            <div className="split-item">
              <div
                className="split-item-content center-content-mobile"
                data-reveal-container=".split-item"
              >
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  {/* 이것도 걍 없앨까 */}
                </div>
                <h3
                  className="mt-0 mb-12"
                  style={{
                    color: "#000000"
                  }}
                >
                  서비스의 품격과 가치를 높이겠습니다
                </h3>
                <p
                  className="m-0"
                  style={{ fontSize: 0.8 + "rem", color: "#000000" }}
                >
                  고객 여러분께서 쉽게 체감하실 수 있는 실용적인 상품과 서비스를
                  만들겠습니다. 작고 사소한 것이라도 지속적으로 혁신하여, 고객
                  여러분께 꼭 필요한 서비스를 의미 있는 가치로 제공하겠습니다.
                </p>
                {/* <Button
                  tag="a"
                  color="primary"
                  wideMobile
                  href="https://cruip.com/"
                  style={{ marginTop: 50 + "px" }}
                >
                  자세히 보기
                </Button> */}
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src={require("./../../assets/images/features-split-image-01.png")}
                  alt="Features split 01"
                  width={528}
                  height={396}
                />
              </div>
            </div>

            <div className="split-item">
              <div
                className="split-item-content center-content-mobile"
                data-reveal-container=".split-item"
              >
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  {/* 초록초록초록초록 */}
                </div>
                <h3
                  className="mt-0 mb-12"
                  style={{
                    color: "#000000"
                  }}
                >
                  상생과 나눔의 경영을 실천하겠습니다
                </h3>
                <p
                  className="m-0"
                  style={{ fontSize: 0.8 + "rem", color: "#000000" }}
                >
                  사회공헌활동에 더욱 힘쓰고, 열린나눔 플랫폼을 통해 여러분과
                  함께 나눔의 문화를 만들어 가겠습니다. NSworks의 도전과 실천을
                  통해 더 편리하고 더 행복한 내일을 향해 경주하겠습니다.
                </p>
                {/* <Button
                  tag="a"
                  color="primary"
                  wideMobile
                  href="https://cruip.com/"
                  style={{ marginTop: 50 + "px" }}
                >
                  자세히 보기
                </Button> */}
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  src={require("./../../assets/images/features-split-image-02.png")}
                  alt="Features split 02"
                  width={528}
                  height={396}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
