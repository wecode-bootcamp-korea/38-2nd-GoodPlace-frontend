import React from "react";
import styled from "styled-components";
import variables from "../../../../styles/variables";

const ReviewComments = () => {
  return (
    <Div>
      <ul>
        <li>
          <S.CommentWrap>
            <S.Guest>
              <S.GuestIcon
                src="//image.goodchoice.kr/profile/ico/ico_22.png"
                alt="잠잠한그레이하운드"
              />
              <S.GuestTitle>비내리는 호남선</S.GuestTitle>
              <S.ScoreWrap>
                <S.Star>ㅎㅎㅎㅎㅎ</S.Star>
                <S.Score>10</S.Score>
              </S.ScoreWrap>
              <S.Name>예약한 방 이름 </S.Name>
              <S.UserTxt>
                너무 좋아연.너무 좋아연.너무 좋아연.너무 좋아연.너무 좋아연.너무
                좋아연.너무 좋아연.너무 좋아연.너무 좋아연.너무 좋아연.너무
                좋아연.너무 좋아연.너무 좋아연.너무 좋아연.너무 좋아연.
              </S.UserTxt>
              <S.GuestDate>11 개월 전</S.GuestDate>
            </S.Guest>
            <S.Host>
              <S.HostIcon
                src="//image.goodchoice.kr/profile/ico/ico_owner.png"
                alt="제휴점 답변"
              />
              <S.HostTitle>제휴점 답변</S.HostTitle>
              <S.HostText>
                감사해연. 감사해연. 감사해연. 감사해연. 감사해연. 감사해연.
                감사해연. 감사해연. 감사해연. 감사해연. 감사해연. 감사해연.
                감사해연. 감사해연. 감사해연. 감사해연. 감사해연. 감사해연.
                감사해연. 감사해연. 감사해연.
              </S.HostText>
              <S.HostDate>11 개월 전</S.HostDate>
            </S.Host>
          </S.CommentWrap>
        </li>
      </ul>
    </Div>
  );
};

export default ReviewComments;

const S = {
  CommentWrap: styled.div`
    margin-top: 100px;
    width: 962px;
    padding: 47px 0 28px 0;
    border-bottom: 2px solid rgba(0, 0, 0, 0.08);
  `,
  Guest: styled.div`
    width: 100%;
  `,
  GuestIcon: styled.img`
    width: 56px;
    height: 56px;
    display: inline-block;
    position: absolute;
    top: 135px;
    left: 175px;
  `,
  HostIcon: styled.img`
    width: 56px;
    height: 56px;
    display: inline-block;
    position: absolute;
    top: 370px;
    left: 275px;
  `,

  ScoreWrap: styled.div`
    ${variables.flex("flex-start", "center", "center")}
    margin-left: 96px;
  `,
  Star: styled.div``,
  Score: styled.div``,
  Host: styled.div`
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
    font-size: 16px;
    color: rgba(0, 0, 0, 0.56);
  `,
  UserTxt: styled.div`
    margin-top: 11px;
    margin-left: 96px;
    font-size: 16px;
    line-height: 26px;
  `,
  GuestDate: styled.span`
    display: inline-block;
    margin-left: 96px;
    padding-top: 13px;
  `,
  HostText: styled.div`
    margin: 15px 0 13px 0;
    font-size: 16px;
    line-height: 26px;
  `,
  HostDate: styled.div`
    display: inline-block;
  `,
};

const Div = styled.div`
  ${variables.flex("center", "center", "center")}
`;
