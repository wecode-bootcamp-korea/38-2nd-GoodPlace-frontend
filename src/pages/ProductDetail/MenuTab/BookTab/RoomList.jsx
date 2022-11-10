import React, { useState, useEffect } from "react";
import styled from "styled-components";
import variables from "../../../../styles/variables";
import theme from "../../../../styles/theme";
import RoomItem from "./RoomItem";
import { useParams } from "react-router-dom";

const RoomList = props => {
  const { checkIn, checkOut, productName, dateDiff } = props;
  const [isHidden, setIsHidden] = useState(true);

  const [roomData, setRoomData] = useState([]);
  const params = useParams();

  // 룸 썸네일 사진 / 가격받아오는 fetch
  useEffect(() => {
    fetch(
      `http://10.58.52.64:3000/product/roominfo?productId=${params.id}&checkIn=${checkIn}&checkOut=${checkOut}`
    )
      .then(res => res.json())
      .then(data => setRoomData(data.roomInfo));
  }, []);

  // 룸 상세사진 캐러셀에 들어가는 사진 받아오는 fetch

  return (
    <form>
      {roomData.map(
        ({ roomName, roomThumbnailUrl, timePrice, stayPrice, roomId }) => {
          return (
            <RoomItem
              roomName={roomName}
              roomThumbnailUrl={roomThumbnailUrl}
              timePrice={timePrice}
              stayPrice={stayPrice}
              roomId={roomId}
              checkIn={checkIn}
              checkOut={checkOut}
              productName={productName}
              dateDiff={dateDiff}
            />
          );
        }
      )}
    </form>
  );
};

export default RoomList;

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
