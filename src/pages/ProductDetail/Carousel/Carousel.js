import React from "react";
import SwiperSlide from "./SwiperSlide";
import styled from "styled-components";
import "./SwiperSlide.css";

const Carousel = props => {
  const { productImages } = props;

  return (
    <CarouseleWrap>
      <SwiperSlide
        className="MainCarousel"
        productImages={productImages}
      ></SwiperSlide>
    </CarouseleWrap>
  );
};
const CarouseleWrap = styled.div`
  width: 490px;
  height: 447px;
`;
export default Carousel;
