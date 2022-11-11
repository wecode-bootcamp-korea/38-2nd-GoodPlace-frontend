import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BigImage from "./BigImage";
import variables from "../../../../styles/variables";

const ReviewComments = ({ review }) => {
  const [nickName, setNickName] = useState("");
  const [isBigImageOpen, setIsBigImageOpen] = useState(false);

  const ratingMessage = rating => {
    if (rating < 3) {
      return "별로에요";
    }
    if (rating < 9) {
      return "추천해요";
    }
    return "최고에요";
  };

  const reviewTitle = rating => {
    if (rating < 3) {
      return "조금만 더 신경 써 주세요.";
    }
    if (rating < 9) {
      return "전체적으로 만족스러웠어요.";
    }
    return "여기만한 곳은 어디에도 없을 거예요.";
  };

  const openBigImage = () => {
    setIsBigImageOpen(true);
  };

  useEffect(() => {
    const getNickNames = async () => {
      const response = await fetch("/data/nickname.json");
      const data = await response.json();
      const randomNumber = parseInt(Math.random() * data.length);
      setNickName(data[randomNumber]);
    };
    getNickNames();
  }, []);

  return (
    <S.CommentWrap>
      {isBigImageOpen && (
        <BigImage
          imageUrl={review.imageUrl}
          setIsBigImageOpen={setIsBigImageOpen}
        />
      )}
      <S.Guest>
        <div>
          <S.GuestIcon
            src="//image.goodchoice.kr/profile/ico/ico_22.png"
            alt="손님 아이콘"
          />
          <S.GuestTitle>{reviewTitle(review.rating)}</S.GuestTitle>
          <S.ScoreWrap>
            <S.Star>{review.rating}</S.Star>
            <span>{ratingMessage(review.rating)}</span>
          </S.ScoreWrap>
          <S.Name>{nickName}</S.Name>
          <S.UserTxt>{review.content}</S.UserTxt>
        </div>
        <S.ReviewImageWrap onClick={openBigImage}>
          <img alt="review image" src={review.imageUrl} />
        </S.ReviewImageWrap>
      </S.Guest>
      {!review.comment || (
        <S.Host>
          <S.HostIcon
            src="//image.goodchoice.kr/profile/ico/ico_owner.png"
            alt="사장님 아이콘"
          />
          <S.HostTitle>제휴점 답변</S.HostTitle>
          <S.HostText>{review.comment}</S.HostText>
        </S.Host>
      )}
    </S.CommentWrap>
  );
};

export default ReviewComments;

const S = {
  CommentWrap: styled.li`
    width: 962px;
    padding: 47px 0 28px 0;
    margin-top: 50px 0 50px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.08);
    list-style: none;
  `,
  Guest: styled.div`
    ${variables.flex("space-between")};
    position: relative;
    width: 100%;
  `,
  GuestIcon: styled.img`
    width: 56px;
    height: 56px;
    display: inline-block;
    position: absolute;
    top: -5px;
    left: 20px;
  `,
  HostIcon: styled.img`
    width: 56px;
    height: 56px;
    display: inline-block;
    position: absolute;
    top: 30px;
    left: 20px;
  `,

  ScoreWrap: styled.div`
    ${variables.flex("flex-start", "center", "center")}
    margin-left: 96px;
  `,
  Star: styled.div`
    ${variables.flex()};
    width: 26px;
    height: 17px;
    padding-top: 2px;
    margin-right: 5px;
    border-radius: 3px;
    background-color: orange;
    color: white;
  `,
  Score: styled.div``,
  Host: styled.div`
    position: relative;
    margin: 28px 0 0 96px;
    padding: 45px 40px 28px 96px;
    border-radius: 4px;
    background: rgb(250, 250, 250);
  `,
  GuestTitle: styled.strong`
    padding: 0 16px 8px 96px;
    display: block;
    font-family: GothicA1;
    font-size: 18px;
    line-height: normal;
  `,
  HostTitle: styled.strong`
    display: block;
    font-family: GothicA1;
    font-size: 18px;
    line-height: normal;
  `,
  Name: styled.div`
    padding-top: 18px;
    margin-left: 96px;
    color: rgba(0, 0, 0, 0.56);
  `,
  UserTxt: styled.div`
    margin-top: 11px;
    margin-left: 96px;
    line-height: 26px;
  `,
  GuestDate: styled.span`
    display: inline-block;
    margin-left: 96px;
    padding-top: 13px;
  `,
  HostText: styled.div`
    margin: 15px 0 13px 0;
    line-height: 26px;
  `,
  HostDate: styled.div`
    display: inline-block;
  `,
  ReviewImageWrap: styled.div`
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }
  `,
};
