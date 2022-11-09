import React from "react";
import styled from "styled-components";
import variables from "../../../styles/variables";
import theme from "../../../styles/theme";
import { useState, useEffect } from "react";

const Info = props => {
  const { address, name, avgRating, countRating, description } = props;
  const [moreText, setMoreText] = useState(true);

  const moreClick = () => {
    setMoreText(!moreText);
  };

  return (
    <S.Info>
      <S.ProductName>{name}</S.ProductName>
      <S.Scrore>
        <S.Span>{Math.round(avgRating * 10) / 10}</S.Span>
        추천해요
        <b>
          리뷰 <em>{countRating}</em>개
        </b>
      </S.Scrore>
      <p>{address}</p>
      <S.Benefit>
        <span>예약취소가능</span>
      </S.Benefit>
      <S.Comment>
        <S.Strong>사장님 한마디</S.Strong>
        <S.More onMouseDown={moreClick}>더보기</S.More>
        <S.Clamp moreText={moreText}>{description}</S.Clamp>
      </S.Comment>
    </S.Info>
  );
};
const S = {
  Info: styled.div`
    width: 424px;
    height: 125.5px;
    padding: 5px;
    p {
      margin-top: 8px;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.58);
    }
  `,
  ProductName: styled.h2`
    font-family: "GothicA1";
    font-size: 28px;
  `,
  Scrore: styled.div`
    width: 100%;
    height: 19.5px;
    font-size: 18px;
    color: #ffa726;
    line-height: 1;
    margin-top: 8px;
    b,
    em {
      font-size: 15px;
      color: rgba(0, 0, 0, 0.38);
      margin-left: 5px;
    }
  `,
  Span: styled.span`
    position: relative;
    top: -3px;
    display: inline-block;
    height: 18px;
    margin-right: 7px;
    padding: 0 3px;
    border-radius: 4px;
    background: rgb(255, 167, 38);
    font-size: 14px;
    line-height: 17px;
    color: #fff;
  `,
  Benefit: styled.div`
    span {
      display: inline-block;
      margin-top: 8px;
      padding: 3px 2px 2px 2px;
      background: #f4f4f4;
      line-height: normal;
      color: rgba(0, 0, 0, 0.56);
    }
  `,
  Comment: styled.div`
    width: 424px;
    height: 135px;
    position: relative;
    margin-top: 16px;
    padding: 26px 24px;
    background: #fafafa;
  `,
  Strong: styled.strong`
    display: block;
    margin-bottom: 15px;
    font-size: 16px;
    ${variables.boldFontWeight};
    color: rgba(0, 0, 0, 0.87);
  `,
  More: styled.button`
    position: absolute;
    top: 24px;
    right: 24px;
    background: none;
    border: none;
    font-size: 16px;
    color: rgb(0, 121, 107);
  `,
  Clamp: styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: ${({ moreText }) => (moreText ? "hidden" : "")};
    color: rgba(0, 0, 0, 0.56);
  `,
};
export default Info;
