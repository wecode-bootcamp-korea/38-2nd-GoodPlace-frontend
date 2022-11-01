import React, { useState } from "react";
import styled from "styled-components";
import variables from "../../styles/variables";
import AgreementList from "./AgreementList";
import UserInfo from "./UserInfo";

const SignUp = () => {
  const [agreeSuccess, setAgreeSuccess] = useState(false);

  return (
    <S.BackGround>
      <S.SignUpWrap>
        {agreeSuccess ? (
          <UserInfo />
        ) : (
          <AgreementList setAgreeSuccess={setAgreeSuccess} />
        )}
      </S.SignUpWrap>
    </S.BackGround>
  );
};

const S = {
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
  SignUpWrap: styled.div`
    ${variables.flex("center", "center", "center")};
    width: 100%;
    label {
      display: inline-block;
      line-height: 26px;
    }
  `,
};

export default SignUp;
