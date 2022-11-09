import React from "react";
import styled from "styled-components";

const Host = () => {
  return (
    <S.Wrap>
      <S.Title>상호</S.Title>
      <S.Ul>
        <li>(주)WECODE</li>
      </S.Ul>
      <S.Title>대표자명</S.Title>
      <S.Ul>
        <li>최현, 김솔</li>
        <li>모유진, 이현태</li>
        <li>정해만, 정재욱</li>
      </S.Ul>
      <S.Title>주소</S.Title>
      <S.Ul>
        <li>서울특별시 강남구</li>
      </S.Ul>
      <S.Title>전화번호</S.Title>
      <S.Ul>
        <li>010-1234-1234</li>
        <li>02-123-1234</li>
      </S.Ul>
      <S.Title>이메일</S.Title>
      <S.Ul>
        <li>qwer1234@wecode.com</li>
      </S.Ul>
    </S.Wrap>
  );
};

export default Host;

const S = {
  Wrap: styled.div`
    line-height: 30px;
  `,
  Title: styled.h3`
    color: rgba(0, 0, 0, 0.7);
    font-size: 18px;
  `,
  Ul: styled.ul`
    padding-left: 20px;
    list-style-type: square;
    margin-bottom: 20px;
  `,
};
