import React, { useState, useEffect, useRef, useCallback } from "react";
import Slide from "./Slide";
import styled, { css } from "styled-components";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const Container = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index:1
`;
const PrevButton = styled.button`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: #999999;
  opacity: 50%;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
  outline: none;
  border: 0px;
  z-index: 99999999;
  & * {
    font-size: 90px;
    font-weight: 50;
  }
  &:hover {
    transition: all 0.3s ease-in-out;
    color: #fff;
  }
`;
const NextButton = styled.button`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translate(-100%, -50%);
  text-align: center;
  color: #999999;
  opacity: 50%;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
  outline: none;
  border: 0px;
  & * {
    font-size: 90px;
    font-weight: 50;
  }
  &:hover {
    transition: all 0.3s ease-in-out;
    color: #fff;
  }
`;
const SliderContainer = styled.div`
  width: 500%;
  display: flex;
  align-items: center;
`;
const BulletContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const Bullet = styled.button`
  all: unset;
  width: 20px;
  height: 20px;
  cursor: pointer;
  background: #ccc;
  border: 0;
  border-radius: 30px;
  transition: all ease-out 0.3s;
  & + & {
    margin-left: 5px;
  }
  &:hover {
    background: #6bbf24;
    opacity: 100%;
    transform: scale(1.2);
  }
  ${(props) => {
    if (props.current) {
      return css`
        background: #6bbf24;
        opacity: 100%;
      `;
    }
  }}
`;

const TOTAL_SLIDES = 4;
export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [aniStart, setAniStart] = useState(false);
  const slideRef = useRef(null);

  const nextSlide = useCallback(() => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  }, [currentSlide]);
  const prevSlide = useCallback(() => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  }, [currentSlide]);

  const nextSlideTimeout = useRef();

  const handleMouseOver = useCallback(() => {
    clearTimeout(nextSlideTimeout.current);
  }, []);

  const handleMouseOut = useCallback(() => {
    nextSlideTimeout.current = setTimeout(nextSlide, 5000);
  }, [nextSlide]);

  const handleClickBullet = (index) => () => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    setAniStart(true);
    return () => {
      setAniStart(false);
    };
  }, []);

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide * 20}%)`;
    nextSlideTimeout.current = setTimeout(nextSlide, 5000);
    return () => {
      clearTimeout(nextSlideTimeout.current);
    };
  }, [currentSlide, nextSlide]);
  return (
    <>
      <Container id="cti">
        <SliderContainer
          ref={slideRef}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <Slide
            data={{
              image: "banner1.jpg",
              title: "NSworks",
              subtitle: "Virtualizing Your Information Infrastructure",
              description: `가상화 서비스를 통해 고객의 비즈니스 효율성을 높이며 <br className="pc" /> 자본 비용과 운용 비율의 절감을 극대화 할 수 있게 하겠습니다`,
              href: ""
            }}
            img="1"
            pos="30% 50%"
            current={currentSlide === 0}
            aniStart={aniStart}
          />
          <Slide
            data={{
              image: "banner3.jpg",
              title: "Virtual Infrastructure",
              subtitle: "",
              description: `압도적인 시장 점유율과 높은 신뢰성 및 안전성을 가진 <br className="pc" />VMware 기반 가상화를 구현합니다`,
              href: "/vm/server"
            }}
            img="3"
            current={currentSlide === 1}
            aniStart={aniStart}
          />
          <Slide
            data={{
              image: "banner4.jpg",
              title: "Hardware Infrastructure",
              subtitle: "",
              description: `가장 유연하고, 안정적이며, 최적화된 성능을 낼 수 있는 제품군으로<br className="pc" />
     가상화 및 클라우드 컴퓨팅의 솔루션을 제공합니다`,
              href: "/hw/server"
            }}
            img="4"
            current={currentSlide === 2}
            aniStart={aniStart}
          />
          <Slide
            data={{
              image: "banner5.jpg",
              title: "Technical Support",
              subtitle: "",
              description: `전문 엔지니어의 풍부한 경험으로 차별화된 서비스를 지원합니다`,
              href: "/mt/engineer"
            }}
            img="5"
            current={currentSlide === 3}
            aniStart={aniStart}
          />
          <Slide
            data={{
              image: "banner2.jpg",
              title: "IT Consulting",
              subtitle: "",
              description: `고객의 요구 사항에 맞는 맞춤형 최적 솔루션을 제공하겠습니다`,
              href: "/mt/question"
            }}
            img="2"
            pos="80% 50%"
            current={currentSlide === 4}
            aniStart={aniStart}
          />
        </SliderContainer>

        <PrevButton onClick={prevSlide}>
          <NavigateBeforeIcon />
        </PrevButton>
        <NextButton onClick={nextSlide}>
          <NavigateNextIcon />
        </NextButton>
      </Container>

      <BulletContainer>
        <Bullet current={currentSlide === 0} onClick={handleClickBullet(0)} />
        <Bullet current={currentSlide === 1} onClick={handleClickBullet(1)} />
        <Bullet current={currentSlide === 2} onClick={handleClickBullet(2)} />
        <Bullet current={currentSlide === 3} onClick={handleClickBullet(3)} />
        <Bullet current={currentSlide === 4} onClick={handleClickBullet(4)} />
      </BulletContainer>
    </>
  );
}
