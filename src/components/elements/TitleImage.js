import React from "react";
import Image from "./Image";
import Hero from "../sections/Hero";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styled from "styled-components";

const Slide = styled.div`
  margin: 10px auto;
  position: relative;
`;
const ImageContainer = styled.div`
  width: 100%;
  vertical-align: middle;
`;
const HeroContainer = styled.div`
  padding: 5px 10px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleImage = ({ data }) => {
  return (
    <Slide>
      <ImageContainer>
        <Image src={require('./../../img/slider1.jpg')} alt="image" />
      </ImageContainer>
      <HeroContainer>
        <Hero data={data} />
      </HeroContainer>
    </Slide>
  );
};

export default TitleImage;
