import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import variables from "../../../../styles/variables";

const BigImage = ({ imageUrl, setIsBigImageOpen }) => {
  const [animation, setAnimation] = useState(true);

  const closeBigImage = () => {
    setAnimation(false);
    setTimeout(() => {
      setIsBigImageOpen(false);
      setAnimation(true);
    }, 300);
  };

  return (
    <S.Background onClick={closeBigImage} animation={animation}>
      <S.BigImageWrap animation={animation}>
        <img alt="big image" src={imageUrl} />
      </S.BigImageWrap>
    </S.Background>
  );
};

const Animation = {
  bgMount: keyframes`
    0%{
      opacity: 0;
    } 100% {
      opacity: 1;
    }
  `,
  bgUnmount: keyframes`
    0%{
      opacity: 1;
    } 100%{
      opacity: 0;
    }
  `,
  imageMount: keyframes`
    0%{
      scale: 0;
    } 100%{
      scale: 1;
    }
  `,
  imageUnmount: keyframes`
    0%{
      scale: 1;
    } 100%{
      scale: 0;
    }
  `,
};

const S = {
  Background: styled.div`
    ${variables.flex()};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    animation: ${({ animation }) =>
        animation ? Animation.bgMount : Animation.bgUnmount}
      0.3s;
    z-index: 9999999;
  `,
  BigImageWrap: styled.div`
    width: 70vw;
    height: 70vh;
    animation: ${({ animation }) =>
        animation ? Animation.imageMount : Animation.imageUnmount}
      0.3s;
    img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }
  `,
};

export default BigImage;
