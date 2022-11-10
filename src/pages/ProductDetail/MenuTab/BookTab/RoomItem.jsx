import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import variables from "../../../../styles/variables";
import theme from "../../../../styles/theme";
import RoomSwiper from "./RoomSwiper";
import API from "../../../../config";

const RoomItem = props => {
  const {
    roomName,
    roomThumbnailUrl,
    timePrice,
    stayPrice,
    roomId,
    checkIn,
    checkOut,
    productName,
    dateDiff,
  } = props;
  const [isHidden, setIsHidden] = useState(true);
  const [roomImages, setRoomImages] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const hiddenToggle = () => {
    setIsHidden(!isHidden);
  };

  const hoverFetch = roomId => {
    fetch(`${API.list}/roomimage?productId=${params.id}&roomId=${roomId}`)
      .then(res => res.json())
      .then(({ roomImage }) => setRoomImages(roomImage));
  };

  return (
    <S.Room isHidden={isHidden}>
      <p onMouseDown={hiddenToggle}>
        <S.ThumbNail
          src={roomThumbnailUrl}
          onMouseEnter={() => hoverFetch(roomId)}
          alt="숙소 썸네일 사진"
        />
      </p>
      <S.TitleWrap>
        <S.Title>{roomName}</S.Title>
      </S.TitleWrap>
      <S.Info>
        <S.Time>
          <S.Title>대실</S.Title>
          <S.Price>{timePrice !== null ? timePrice : "가격 정보 없음"}</S.Price>
          <dl>
            <dt>이용시간</dt>
            <dd>4시간</dd>
          </dl>
          <dl>
            <dt>마감시간</dt>
            <dd>최대 22시까지</dd>
          </dl>
          <S.Book
            onClick={() =>
              navigate(
                `/book?isStay=0&productId=${params.id}&roomId=${roomId}&checkIn=${checkIn}&checkOut=${checkOut}&roomName=${roomName}&productName=${productName}&dateDiff=${dateDiff}&price=${timePrice}`
              )
            }
          >
            숙소문의
          </S.Book>
        </S.Time>
        <S.Stay>
          <S.Title>숙박</S.Title>
          <S.Price>{stayPrice !== null ? stayPrice : "가격 정보 없음"}</S.Price>
          <dl>
            <dt>입실시간</dt>
            <dd>15:00부터</dd>
          </dl>
          <dl>
            <dt>퇴실시간</dt>
            <dd>익일12:00</dd>
          </dl>
          <S.Book
            onClick={() =>
              navigate(
                `/book?isStay=1&productId=${params.id}&roomId=${roomId}&checkIn=${checkIn}&checkOut=${checkOut}&roomName=${roomName}&productName=${productName}&dateDiff=${dateDiff}&price=${stayPrice}`
              )
            }
          >
            숙소문의
          </S.Book>
        </S.Stay>
      </S.Info>
      <S.HiddenButton onMouseDown={hiddenToggle}>X</S.HiddenButton>
      <RoomSwiper roomImages={roomImages} />
    </S.Room>
  );
};
export default RoomItem;

const S = {
  Room: styled.div`
    overflow: hidden;
    height: ${({ isHidden }) => (isHidden ? "273px" : "")};
    position: relative;
    margin: 0 0 24px 0;
    background: #fff;
    padding: 24px 24px 24px 424px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    p {
      display: inline-block;
      position: absolute;
      top: 23px;
      left: 23px;
      width: 376px;
      height: 226px;
      cursor: pointer;
      ::after {
        display: inline-block;
        content: "";
        position: absolute;
        bottom: 16px;
        right: 16px;
        z-index: 10;
        width: 24px;
        height: 24px;
        background: url(//image.goodchoice.kr/images/web_v3/ico_picview.png) 0 0
          no-repeat;
        background-size: 24px auto;
      }
    }
  `,
  ThumbNail: styled.img`
    width: 376px;
    height: 236px;
  `,
  TitleWrap: styled.div`
    padding-left: 48px;
    strong {
      font-size: 25px;
    }
  `,
  Title: styled.strong`
    display: block;
    width: 100%;
    height: 37px;
    padding: 0;
    font-size: 20px;
    ${variables.boldFontWeight};
    line-height: 1;
    margin-left: 3px;
  `,
  Info: styled.div`
    ${variables.flex("center", "center", "center")}
    width: 512px;
    height: 198px;
    margin-left: 30px;
    dl {
      margin-top: 10px;
      ${variables.flex("space-between")}
    }
  `,
  Time: styled.div`
    padding: 5px 5px 5px 5px;
    width: 45%;
    height: 100%;
  `,
  Stay: styled.div`
    padding: 5px 5px 5px 15px;
    margin-left: 10px;
    width: 47%;
    height: 100%;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  `,
  Price: styled.div`
    margin-top: 20px;
    padding-bottom: 10px;
    font-size: 20px;
    text-align: right;
    ${variables.boldFontWeight};
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  `,
  Book: styled.button`
    display: block;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 4px;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: normal;
    color: #fff;
    text-align: center;
    background-color: ${theme.brandColor};
  `,
  CantBook: styled.button`
    display: block;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 4px;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: normal;
    color: #fff;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
  `,
  HiddenButton: styled.button`
    position: relative;
    top: 90px;
    right: -490px;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    font-size: 20px;
    z-index: 9;
  `,
};
