import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import variables from "../../styles/variables";

const Modal = ({ content, setIsModalOpen, confirm }) => {
  const [switchAnimation, setSwitchAnimation] = useState(true);

  const modalAnimation = switchAnimation ? animation.mount : animation.unmount;
  const bgAnimation = switchAnimation ? animation.bgMount : animation.bgUnmount;

  const closeModal = () => {
    setSwitchAnimation(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  return (
    <S.Background onClick={closeModal} bgAnimation={bgAnimation}>
      <S.Content
        onClick={e => e.stopPropagation()}
        modalAnimation={modalAnimation}
      >
        <S.Text>
          <p>{MODAL_CONTENT[content]}</p>
        </S.Text>
        <S.ButtonWrapper>
          <S.ConfirmButton onClick={confirm || closeModal}>
            확인
          </S.ConfirmButton>
          <S.CancelButton onClick={closeModal}>취소</S.CancelButton>
        </S.ButtonWrapper>
      </S.Content>
    </S.Background>
  );
};

const MODAL_CONTENT = {
  payment: "결제하시겠습니까?",
  signUp: "가입하시겠습니까?",
  needLogin: "로그인이 필요합니다.",
  needDate: "날짜를 선택해주세요",
};

const animation = {
  bgMount: keyframes`
  0%{
    opacity: 0;
  }100%{
    opacity: 1;
  } `,
  mount: keyframes`
  0%{
    scale: 0;
  }100%{
    scale: 1;
  }`,
  bgUnmount: keyframes`
  0%{
    opacity: 1;
  }100%{
    opacity: 0;
  } `,
  unmount: keyframes`
  0%{
    scale: 1;
  }100%{
    scale: 0;
  }`,
};

const S = {
  Background: styled.div`
    ${variables.flex()};
    position: fixed;
    top: 0px;
    right: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    animation: ${({ bgAnimation }) => bgAnimation} 0.3s;
    z-index: 100000000;
  `,
  Content: styled.div`
    ${variables.flex("space-between", "center", "column")};
    width: 400px;
    height: 200px;
    border-radius: 10px;
    background-color: white;
    color: black;
    font-family: "GothicA1";
    font-size: 20px;
    animation: ${({ modalAnimation }) => modalAnimation} 0.3s;
  `,
  Text: styled.div`
    ${variables.flex()};
    height: 150px;
  `,
  ConfirmButton: styled.button`
    width: 200px;
    height: 50px;
    border-bottom-left-radius: 10px;
    border: none;
    background-color: ${({ theme }) => theme.brandColor};
    color: white;
    font-size: 15px;
    &:hover {
      opacity: 0.8;
    }
  `,
  CancelButton: styled.button`
    width: 200px;
    height: 50px;
    border: none;
    border-bottom-right-radius: 10px;
    background-color: lightgrey;
    color: ${({ theme }) => theme.deepGrey};
    font-size: 15px;
    &:hover {
      opacity: 0.8;
    }
  `,
  ButtonWrapper: styled.div`
    width: 400px;
  `,
};

export default Modal;
