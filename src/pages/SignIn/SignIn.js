import React from "react";
import styled from "styled-components/macro";
import theme from "../../styles/theme";
import variables from "../../styles/variables";
import { FaSignInAlt } from "react-icons/fa";

const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

const SignIn = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginbtn = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <S.BackGround>
      <S.SignInContainer>
        <S.LogoWrap>어떤데.</S.LogoWrap>
        <img
          src="../../images/kakao_login_large_narrow.png"
          alt="kakaologin"
          onClick={loginbtn}
        />
        <S.OtherSignIn>
          <FaSignInAlt size="40px" />
          <S.OtherTitle>어떤데.계정 로그인</S.OtherTitle>
        </S.OtherSignIn>
        <S.SignInCaution>
          <S.SignInCautionLetter>계정을 잊으셨나요?</S.SignInCautionLetter>
        </S.SignInCaution>
      </S.SignInContainer>
    </S.BackGround>
  );
};

export default SignIn;

const S = {
  Headers: styled.div`
    position: fixed;
    top: 0px;
    height: 211px;
    background-color: ${theme.brandColor};
  `,

  BackGround: styled.div`
    ${variables.flex("center", "center", "column")}
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    z-index: 999999999;
  `,
  SignInContainer: styled.div`
    ${variables.flex("center", "center", "column")}
    width: 1000px;
    height: 935px;
  `,
  LogoWrap: styled.div`
    padding: 70px 0;
    font-family: Jalnan;
    font-size: 80px;
    color: ${theme.brandColor};
  `,
  OtherSignIn: styled.button`
    ${variables.flex("space-between", "center")}
    margin-top: 20px;
    padding: 0px 28px;
    width: 366px;
    height: 90px;
    background-color: #ffffff;
    border: 1px solid #d4d4d4;
    border-radius: 10px;
    font-size: 28px;
    font-weight: 400;
  `,
  OtherTitle: styled.span`
    width: 100%;
    padding-left: 30px;
    color: ${theme.deepGrey};
  `,
  SignInCaution: styled.div`
    padding: 100px 0;
  `,
  SignInCautionLetter: styled.span`
    font-size: 25px;
    color: ${theme.lightGrey};
    text-decoration: underline;
    cursor: pointer;
  `,
};
