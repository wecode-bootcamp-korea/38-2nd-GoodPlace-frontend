import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { LoginContext } from "../../pages/context/LoginContext";
import variables from "../../styles/variables";

const LoginModal = () => {
  const { switchAnimation, setSwitchAnimation } = useContext(LoginContext);
  const { isLoginModalOpen, setIsLoginModalOpen } = useContext(LoginContext);
  const navigate = useNavigate();

  const modalAnimation = switchAnimation ? animation.mount : animation.unmount;
  const bgAnimation = switchAnimation ? animation.bgMount : animation.bgUnmount;

  const confirmButton = () => {
    navigate("/signin");
    closeModal();
  };

  const closeModal = () => {
    setSwitchAnimation(false);
    setTimeout(() => {
      setIsLoginModalOpen(false);
    }, 300);
  };

  return (
    <>
      {isLoginModalOpen && (
        <S.Background onMouseDown={closeModal} bgAnimation={bgAnimation}>
          <S.Content
            modalAnimation={modalAnimation}
            onMouseDown={e => e.stopPropagation()}
          >
            <S.Text>
              <p>로그인 페이지로 이동하시겠습니까 ?</p>
            </S.Text>
            <S.ButtonWrapper>
              <S.ConfirmButton onMouseDown={confirmButton}>
                확인
              </S.ConfirmButton>
              <S.CancelButton onClick={closeModal}>취소</S.CancelButton>
            </S.ButtonWrapper>
          </S.Content>
        </S.Background>
      )}
    </>
  );
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

export default LoginModal;
