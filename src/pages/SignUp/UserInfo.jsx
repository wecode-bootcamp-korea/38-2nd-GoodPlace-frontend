import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import variables from "../../styles/variables";
import theme from "../../styles/theme";
import NICKNAMES from "./NICKNAMES";
import { LoginContext } from "../context/LoginContext";
import API from "../../config";

const UserInfo = () => {
  const [nickName, setNickName] = useState(NICKNAMES[0]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [selectdeType, setSelectedType] = useState("");
  const { kakaoResponse } = useContext(LoginContext);
  const randomNum = Math.floor(Math.random() * (399 - 0) + 1);
  const navigate = useNavigate();

  const validation = nickName.length > 0 && phoneNumber.length > 10;

  const signUp = () => {
    fetch(`${API.user}/kakao/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        // kakaoId: kakaoResponse.id,
        // email: kakaoResponse.email,
        kakaoId: "2510471894",
        email: "",
        nickName: nickName,
        phoneNumber: phoneNumber,
        userType: "user",
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.data === "create user success") {
          alert("회원가입 성공");
          navigate("/");
        }
      });
  };

  const selectType = event => {
    setSelectedType(event.target.name);
  };

  const newNickName = () => {
    setNickName(NICKNAMES[randomNum]);
  };
  const savePhoneNumber = event => {
    const onlyNumber = event.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(onlyNumber);
  };

  return (
    <S.Section>
      <S.BrandTitle>어떤데.</S.BrandTitle>
      <S.InputTitle>닉네임</S.InputTitle>
      <S.FormWrap>
        <S.InputWrap>
          <S.NickNameInput value={nickName} />
        </S.InputWrap>
        <S.NickNameResetButton onClick={newNickName}>
          딴거할래요
        </S.NickNameResetButton>
      </S.FormWrap>
      <S.InputTitle>휴대폰 번호</S.InputTitle>
      <S.FormWrap>
        <S.NumberInputWrap>
          <S.NumberInput
            onChange={savePhoneNumber}
            value={phoneNumber}
            placeholder="휴대폰 번호"
          />
        </S.NumberInputWrap>
      </S.FormWrap>
      <S.InputTitle>회원 유형</S.InputTitle>
      <S.FormWrap>
        <S.HostType
          color={theme.brandColor}
          name="host"
          select={selectdeType}
          onClick={selectType}
        >
          호스트
        </S.HostType>
        <S.GuestType
          color={theme.brandColor}
          name="guest"
          select={selectdeType}
          onClick={selectType}
        >
          게스트
        </S.GuestType>
      </S.FormWrap>
      <S.SignUpButton disabled={!validation} onClick={signUp}>
        회원 가입
      </S.SignUpButton>
    </S.Section>
  );
};

const S = {
  Section: styled.section`
    width: 336px;
    height: 477px;
    margin-bottom: 50px;
  `,
  BrandTitle: styled.strong`
    display: inline-block;
    ${variables.boldFontWeight};
    width: 100%;
    height: 44px;
    text-align: center;
    font-family: "Jalnan";
    font-size: 24px;
    color: ${theme.brandColor};
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  `,
  FormWrap: styled.div`
    ${variables.flex("space-between", "center", "center")};
    width: 100%;
    margin-bottom: 15px;
  `,
  InputTitle: styled.strong`
    display: block;
    font-size: 16px;
    margin-bottom: 16px;
  `,
  InputWrap: styled.div`
    width: 226px;
    height: 48px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 8px 14px 8px 16px;
  `,
  NickNameInput: styled.input`
    width: 198px;
    height: 22px;
    font-size: 18px;
    border: none;
    margin-top: 5px;
  `,
  NickNameResetButton: styled.button`
    width: 100px;
    height: 44px;
    border: none;
    border-radius: 4px;
    background: ${theme.brandColor};
    opacity: 0.9;
    font-size: 17px;
    font-weight: normal;
    color: white;
    margin-left: 10px;
  `,
  NumberInput: styled.input`
    width: 100%;
    height: 22px;
    font-size: 18px;
    border: none;
    margin-top: 5px;
  `,
  NumberInputWrap: styled.div`
    width: 100%;
    height: 48px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 8px 14px 8px 16px;
  `,
  HostType: styled.button`
    ${variables.flex("center", "center", "center")}
    width: 160px;
    height: 44px;
    text-align: center;
    font-family: "Jalnan";
    font-size: 20px;
    border: none;
    border-radius: 10px;
    opacity: 0.8;
    color: ${({ select }) => (select === "host" ? "white" : "black")};
    background-color: ${({ select }) =>
      select === "host" ? theme.brandColor : "rgba(0, 0, 0, 0.08)"};
  `,
  GuestType: styled.button`
    ${variables.flex("center", "center", "center")}
    width: 160px;
    height: 44px;
    text-align: center;
    font-family: "Jalnan";
    font-size: 20px;
    border: none;
    border-radius: 10px;
    opacity: 0.8;
    color: ${({ select }) => (select === "guest" ? "white" : "black")};
    background-color: ${({ select }) =>
      select === "guest" ? theme.brandColor : "rgba(0, 0, 0, 0.08)"};
  `,
  SignUpButton: styled.button`
    width: 100%;
    height: 44px;
    text-align: center;
    font-family: "Jalnan";
    font-size: 20px;
    border: none;
    border-radius: 10px;
    opacity: 0.8;
    color: white;
    background-color: ${theme.brandColor};
    &:disabled {
      opacity: 0.1;
      cursor: not-allowed;
    }
  `,
};

export default UserInfo;
