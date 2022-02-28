import React from "react";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/captioned.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styled from "styled-components";
import NavBar from "./NavBar";
import $ from "jquery";
window.$ = $;

const SlideContainer = styled.div`
  position: relative;
  left: 0;
  width: 100%;
  z-index:-1;
  height: 300px;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index:5;
`;

const Image = styled.img`
  max-width: 3840px;
  width: 100%;
  min-height: 300px;
  min-width: 663px;
`;

const TextContainer = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`;

var Title = styled.div`
  font-size: 50px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  @media (max-width: 960px) {
    font-size: 30px;
  }
`;

if ($(window).width() < 600) {
  Title = styled.div`
    font-size: 35px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
  `;
}

const Subtitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-top: 16px;
`;

const TopImage = ({ data }) => {
  return (
    <>
      <SlideContainer>
        <ImageContainer>
          <Image src={require("./../../img/" + data.image)} alt="image" />
        </ImageContainer>
        <TextContainer>
          <Title>{data.title}</Title>
          <Subtitle>{data.subtitle}</Subtitle>
        </TextContainer>
      </SlideContainer>
      <NavBar menu1={data.menu1} menu2={data.menu2} />
    </>
  );
};

export default TopImage;
