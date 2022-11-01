import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import variables from "../../styles/variables";

const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

const SignIn = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginbtn = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <S.BackGround>
      <img
        src="../../images/kakao_login_large_narrow.png"
        alt="kakaologin"
        onClick={loginbtn}
      ></img>
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
    ${variables.flex("center", "center", "center")}
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    z-index: 999999999;
  `,
};
