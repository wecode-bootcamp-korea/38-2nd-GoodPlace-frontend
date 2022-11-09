import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import BookListHeader from "./BookListHeader";
import variables from "../../styles/variables";
import theme from "../../styles/theme";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [bookData, setbookData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://10.58.52.93:3000/order/list`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then(response => response.json())
      .then(({ allOrderByUserId }) => {
        setbookData(allOrderByUserId);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return;

  return (
    <>
      <BookListHeader content="예약 내역" />
      <S.BookList>
        <S.BookListContainer>
          <S.BookListContents>
            <S.BookListContentTitle>예약 내역</S.BookListContentTitle>

            <S.ReservationContent>
              {bookData &&
                bookData.map(order => {
                  return (
                    order.description === "예약중" && (
                      <S.EachReservation
                        key={order.orderId}
                        onClick={() =>
                          navigate(`/booklistdetail/${order.orderId}`)
                        }
                      >
                        <S.ReservationList key={order.orderId}>
                          <S.RoomImg src={order.thumbnail} alt="예약 이미지" />
                          <S.ListData>
                            <S.Status>{order.description}</S.Status>
                            <S.ProductName>{order.productName}</S.ProductName>
                            <S.RoomName>{order.roomName}</S.RoomName>
                            <S.CheckIn>체크인: {order.checkIn}</S.CheckIn>
                            <S.CheckOut>체크아웃: {order.checkOut}</S.CheckOut>
                          </S.ListData>
                        </S.ReservationList>
                      </S.EachReservation>
                    )
                  );
                })}
            </S.ReservationContent>
          </S.BookListContents>
          <S.BookListContents>
            <S.BookListContentUsed>
              <S.BookListContentTitle>이용 내역</S.BookListContentTitle>
              <S.ReservationContent>
                {bookData &&
                  bookData.map(order => {
                    return (
                      order.description === "이용완료" && (
                        <S.EachReservation key={order.orderId}>
                          <S.ReservationList key={order.orderId}>
                            <S.RoomImg
                              src={order.thumbnail}
                              alt="예약 이미지"
                            />
                            <S.ListData>
                              <S.Complete>{order.description}</S.Complete>
                              <S.ProductName>{order.productName}</S.ProductName>
                              <S.RoomName>{order.roomName}</S.RoomName>
                              <S.CheckIn>체크인: {order.checkIn}</S.CheckIn>
                              <S.CheckOut>
                                체크아웃: {order.checkOut}
                              </S.CheckOut>
                            </S.ListData>
                          </S.ReservationList>
                        </S.EachReservation>
                      )
                    );
                  })}
              </S.ReservationContent>
            </S.BookListContentUsed>
          </S.BookListContents>
        </S.BookListContainer>
      </S.BookList>
    </>
  );
};

const S = {
  BookList: styled.div`
    ${variables.flex("center", "center", null)};
    margin: 0 auto;
    padding-top: 54px;
    width: 1024px;
  `,
  BookListContainer: styled.div`
    ${variables.flex("center", "center", "column")};
  `,
  BookListContents: styled.div`
    display: flex;
    flex-direction: column;
    left: start;
    padding: 20px;
    width: 920px;
  `,

  ReservationContent: styled.div`
    ${variables.flex("center", "flex-start", null)};
    flex-wrap: wrap;
    width: 1024px;
  `,
  BookListContentTitle: styled.span`
    margin-left: 110px;
    font-size: 22px;
    color: #252525;
    ${variables.boldFontWeight}
  `,
  ReservationList: styled.div`
    ${variables.flex(null, null, "column")};
    width: 100%;
  `,

  EachReservation: styled.div`
    ${variables.flex("center", null, null)};
    margin-top: 10px;
    margin-right: 40px;
    width: 354px;
    height: 303px;
    border: 1px solid #ebebeb;
  `,
  RoomImg: styled.img`
    width: 353px;
    height: 184px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  `,
  ListData: styled.div`
    ${variables.flex("center", "center", null)};
    display: grid;
    justify-items: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    height: 217px;
    line-height: 20px;
  `,
  Status: styled.span`
    height: 18px;
    background-color: ${theme.brandColor};
    color: white;
  `,
  Complete: styled.span`
    height: 18px;
    background-color: #ebebeb;
  `,
  ProductName: styled.span`
    font-size: 22px;
    font-weight: bold;
  `,
  RoomName: styled.span``,
  CheckIn: styled.span``,
  CheckOut: styled.span``,

  BookListContentUsed: styled.div``,

  BookListContentCanceled: styled.div``,
};

export default BookList;
