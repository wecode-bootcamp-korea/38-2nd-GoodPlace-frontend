import React from "react";
import styled from "styled-components";
import variables from "../../../../styles/variables";
import StarRate from "./StarRate";

const Review = ({ starRate }) => {
  const ratingMessage = rating => {
    if (rating < 3) {
      return "별로에요";
    } else if (rating < 9) {
      return "추천해요";
    } else {
      return "최고에요";
    }
  };

  return (
    <S.Review>
      <S.Header>
        <S.HeaderTitle>{ratingMessage(starRate)}</S.HeaderTitle>
        <S.StarRateWrap>
          <StarRate starRate={starRate} />
          <S.Rate>{starRate}</S.Rate>
        </S.StarRateWrap>
        <S.ReviewCountWrap>
          <S.ReviewCount>전체 리뷰 1000</S.ReviewCount>
          <S.CenterLine>|</S.CenterLine>
          <S.CommentCount>가맹점 코멘트 500</S.CommentCount>
        </S.ReviewCountWrap>
      </S.Header>
    </S.Review>
  );
};

const S = {
  Review: styled.div`
    width: 1024px;
    height: 200vh;
  `,
  Header: styled.div`
    ${variables.flex("center", "center", "column")};
    width: 1024px;
    height: 200px;
    padding: 44px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.08);
  `,
  HeaderTitle: styled.h4`
    font-size: 25px;
    font-weight: 400;
  `,
  StarRateWrap: styled.div`
    ${variables.flex()};
    margin-top: 10px;
  `,
  Rate: styled.span`
    font-size: 27px;
    margin-left: 10px;
    padding-top: 5px;
  `,
  ReviewCountWrap: styled.div`
    ${variables.flex()};
    width: 1024px;
    margin-top: 20px;
    font-size: 25px;
  `,
  ReviewCount: styled.span`
    width: 500px;
    text-align: right;
  `,
  CommentCount: styled.span`
    width: 500px;
    text-align: left;
  `,
  CenterLine: styled.span`
    width: 4px;
    margin: 0px 10px;
    color: ${({ theme }) => theme.lightGrey};
  `,
};

export default Review;
