import React from "react";
import Hero from "./Hero";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styled from "styled-components";

import $ from "jquery";
window.$ = $;


const SlideContainer = styled.div`
  width: 100%;
  /* height: 600px; */
  text-align: center;
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 36%;
  @media (max-width: 960px) {
    padding-top: 100%;
  }
  overflow: hidden;
`;

const HeroContainer = styled.div`
  z-index: 500;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  width: 100%;
  /* margin: -30% auto 0; */
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: auto;
  transition: ${(props) => {
    return props.current ? "all linear 25s" : "all linear 0s 5s";
  }};
  transform: ${(props) => {
    return props.aniStart && props.current && "scale( 1.5 )";
  }};
  @media (max-width: 960px) {
    height: 100%;
    object-fit: cover;
    object-position: ${(props) => props.pos};
  }
`;

const Slide = ({ data, img, pos, current, aniStart }) => {
  const img_src = require('./../../img/banner'+img+'.jpg');
  return (
    <>
      <SlideContainer>
        <ImageContainer>
          <Image
            src={img_src}
            pos={pos}
            current={current}
            aniStart={aniStart}
          />
          <HeroContainer>
            <Hero data={data} />
          </HeroContainer>
        </ImageContainer>
      </SlideContainer>
    </>
  );
};

export default Slide;
