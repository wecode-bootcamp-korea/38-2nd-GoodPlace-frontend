import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookListHeader from "./BookListHeader";
import variables from "../../styles/variables";
import theme from "../../styles/theme";
import { FaPhoneAlt } from "react-icons/fa";

const BookListDetail = () => {
  const [bookDetailData, setbookDetailData] = useState({});

  const params = useParams();

  useEffect(() => {
    fetch(`http://10.58.52.93:3000/order/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    })
      .then(response => response.json())
      .then(data => setbookDetailData(data.orderByUserId[0]));
  }, []);
  const cancel = () => {
    fetch(`http://10.58.52.93:3000/order`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        roomId: bookDetailData.roomId,
        orderId: bookDetailData.orderId,
      }),
    });
  };

  return (
    <>
      <BookListHeader content="예약 상세 내역" />
      <S.BookListDetail>
        <S.BookListDetailContainer>
          <S.BookListDetailContent>
            <S.ConfirmData>
              <S.ProductInfoWrap>
                <S.ProductImg src={bookDetailData.imageUrl} alt="" />
                <S.ProductInfo>
                  <S.Status>{bookDetailData.orderStatus}</S.Status>
                  <S.ProductName>{bookDetailData.productName}</S.ProductName>
                  <S.RoomName>{bookDetailData.name}</S.RoomName>
                </S.ProductInfo>
              </S.ProductInfoWrap>
              <S.CheckInfo>
                <S.TimeInfo>
                  <S.checkIn>
                    <S.SortTitle>체크인</S.SortTitle>
                    {bookDetailData.checkIn}
                  </S.checkIn>

                  <S.CheckOut>
                    <S.SortTitle>체크아웃</S.SortTitle>
                    {bookDetailData.checkOut}
                  </S.CheckOut>
                </S.TimeInfo>

                <S.UserName>
                  <S.SortTitle>예약자 이름</S.SortTitle>
                  {bookDetailData.userName}
                </S.UserName>

                <S.Price>
                  <S.SortTitle>총 결제금액</S.SortTitle>
                  {bookDetailData.price?.toLocaleString()}원
                </S.Price>

                <S.Call>
                  <S.CallLetter>전화문의하기</S.CallLetter>
                  <S.CallButton>
                    <FaPhoneAlt size="24" color="#038676" />
                  </S.CallButton>
                </S.Call>

                <S.CancelButton onMouseDown={cancel}>
                  <S.CancelLetter>예약 취소하기</S.CancelLetter>
                </S.CancelButton>
              </S.CheckInfo>
            </S.ConfirmData>
          </S.BookListDetailContent>
        </S.BookListDetailContainer>
      </S.BookListDetail>
    </>
  );
};

const S = {
  BookListDetail: styled.div`
    ${variables.flex("center", "center", null)};
    padding-top: 55px;
  `,

  BookListDetailContainer: styled.div`
    ${variables.flex("flex-start", "flex-start", null)};
    width: 1024px;
    height: 745px;
  `,

  BookListDetailContent: styled.div`
    ${variables.flex("center", "center", null)};
  `,

  ConfirmData: styled.div`
    ${variables.flex("center", "center", "column")};
    width: 1024px;
  `,

  ProductInfoWrap: styled.div`
    margin: 10px auto;
    position: relative;
  `,

  ProductImg: styled.img`
    position: relative;
    width: 500px;
    height: 200px;
  `,
  ProductInfo: styled.div`
    ${variables.flex("center", "center", "column")};
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 200px;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.38);
  `,

  Status: styled.span`
    padding: 2px;
    margin-bottom: 9px;
    background-color: ${theme.brandColor};
    color: white;
  `,

  ProductName: styled.span`
    margin-bottom: 9px;
    font-size: 24px;
    color: white;
  `,

  RoomName: styled.span`
    margin-bottom: 9px;
    color: white;
  `,

  CheckInfo: styled.div`
    ${variables.flex("center", "space-between", "column")};
    width: 500px;
  `,

  SortTitle: styled.p`
    width: 150px;
    font-size: 21px;
    color: black;
  `,

  TimeInfo: styled.div`
    ${variables.flex("center", "space-between", "column")};
    padding: 15px 0;
    border-bottom: 1px solid #ebebeb;
    line-height: 30px;
  `,

  checkIn: styled.div`
    ${variables.flex("space-between", "center")};
    width: 500px;
    font-size: 20px;
    color: #707070;
  `,

  CheckOut: styled.div`
    ${variables.flex("space-between", "center")};
    font-size: 20px;
    color: #707070;
  `,

  UserName: styled.div`
    ${variables.flex("space-between", "center")};
    padding: 20px 0;
    border-bottom: 1px solid #ebebeb;
    font-size: 20px;
    color: #707070;
  `,

  SubTitle: styled.span`
    font-size: 22px;
  `,

  Price: styled.div`
    ${variables.flex("space-between", "center")};
    color: #707070;
    padding: 20px 0;
    border-bottom: 1px solid #ebebeb;
    font-size: 20px;
  `,

  Call: styled.div`
    ${variables.flex("space-between", "center", "row")};
    padding: 20px 0;
    border-bottom: 1px solid #ebebeb;
  `,

  CallLetter: styled.span`
    font-size: 22px;
  `,

  CallButton: styled.div`
    cursor: pointer;
  `,
  CancelButton: styled.button`
    margin-top: 20px;
    height: 50px;
    background-color: white;
    border: 1px solid ${theme.lightGrey};
    border-radius: 5px;
  `,
  CancelLetter: styled.p`
    font-size: 16px;
    color: ${theme.lightGrey};
  `,
};

export default BookListDetail;
