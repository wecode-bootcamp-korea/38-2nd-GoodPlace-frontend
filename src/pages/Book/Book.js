import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import variables from "../../styles/variables";
import CheckList from "./CheckList";
import API from "../../config";
import Modal from "../../components/Modal/Modal";

const Book = () => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const isStay = +searchParams.get("isStay");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const dateDiff = searchParams.get("dateDiff");
  const roomId = searchParams.get("roomId");
  const productId = searchParams.get("productId");
  const roomName = searchParams.get("roomName");
  const productName = searchParams.get("productName");
  const price = searchParams.get("price");

  const times = Array(9)
    .fill()
    .map((_, index) => {
      return 12 + index + ":00";
    });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const paymentComplete = () => {
    setIsModalOpen(false);
    setIsPaymentComplete(true);
  };

  const handleSelectTime = time => {
    if (selectedTimes.length === 0) {
      const indexOfTime = times.indexOf(time);
      const sliced = [...times].splice(indexOfTime, 4);
      const selected = Array(4)
        .fill()
        .map((_, i) => {
          return sliced[i];
        });
      setSelectedTimes(selected);
    } else {
      const indexOfSelected = selectedTimes.indexOf(time);
      if (indexOfSelected === 0) {
        setSelectedTimes(selected => [...selected].filter(el => el !== time));
      } else if (indexOfSelected !== -1) {
        const selected = [...selectedTimes];
        selected.splice(indexOfSelected, 3);
        setSelectedTimes(selected);
      }
    }
  };

  const payment = () => {
    const stayPayment = async () => {
      const response = await fetch(`${API.order}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.06nwUbSJ1kqahgDAsp8mL7FTpQdcq_y0DW3ZplelKBM",
        },
        body: JSON.stringify({
          productId: productId,
          roomId: roomId,
          checkIn: `${checkIn} 12:00:00`,
          checkOut: `${checkOut} 20:00:00`,
        }),
      });
      const result = await response.json();
      paymentComplete();
    };
    const timePayment = async () => {
      const response = await fetch(`${API.order}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjF9.06nwUbSJ1kqahgDAsp8mL7FTpQdcq_y0DW3ZplelKBM",
        },
        body: JSON.stringify({
          productId: productId,
          roomId: roomId,
          checkIn: `${checkIn} ${selectedTimes[0]}:00`,
          checkOut: `${checkIn} ${selectedTimes[selectedTimes.length - 1]}:00`,
        }),
      });
      const result = await response.json();
      paymentComplete();
    };
    isStay ? stayPayment() : timePayment();
  };

  return (
    <>
      {isPaymentComplete && (
        <S.WhiteBg>
          <S.PaymentComplete>
            <h1>어떤데.</h1>
            <p>예약이 완료되었습니다.</p>
            <Link to="/booklist">예약 내역</Link>
          </S.PaymentComplete>
        </S.WhiteBg>
      )}

      {isModalOpen && (
        <Modal
          content={"payment"}
          confirm={payment}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <S.Header />
      <S.ShowDiv>
        <S.BookItemWrap>
          <S.Left>
            <S.SectionTitle>이용 정보</S.SectionTitle>
            {!isStay && (
              <>
                <S.TimeTitle>
                  <strong>이용시간</strong>
                  <span>최대 4시간 이용가능</span>
                </S.TimeTitle>
                <S.ButtonWrap>
                  {!isStay &&
                    times.map(time => {
                      return (
                        <S.TimeButton
                          key={time}
                          onClick={() => {
                            handleSelectTime(time);
                          }}
                          isSelected={selectedTimes.find(
                            selected => selected === time
                          )}
                        >
                          {time}
                        </S.TimeButton>
                      );
                    })}
                </S.ButtonWrap>
              </>
            )}
            <S.SectionTitle>예약자 정보</S.SectionTitle>
            <strong>예약자 이름</strong>
            <S.InputWrap>
              <S.NameInput placeholder="체크인시 필요한 정보입니다." />
            </S.InputWrap>
            <strong>휴대폰 번호</strong>
            <S.InputWrap>
              <S.PhoneInput placeholder="체크인시 필요한 정보입니다." />
            </S.InputWrap>
            <CheckList />
          </S.Left>
          <S.Right>
            <S.InfoSection>
              <strong>숙소이름</strong>
              <p>{productName}</p>
              <strong>객실타입/기간</strong>
              <p>
                {roomName} / {isStay ? `${dateDiff}박` : "대실"}
              </p>
              {isStay ? (
                <>
                  <strong>체크인</strong>
                  <p>
                    {checkIn.split("-")[1]}월 {checkIn.split("-")[2]}일
                  </p>
                  <strong>체크아웃</strong>
                  <p>
                    {checkOut.split("-")[1]}월 {checkOut.split("-")[2]}일
                  </p>
                </>
              ) : (
                <>
                  <strong>이용 날짜</strong>
                  <p>
                    {checkIn.split("-")[1]}월 {checkIn.split("-")[2]}일
                  </p>
                  <strong>이용 시간</strong>
                  <p>
                    {selectedTimes[0]}-{selectedTimes[selectedTimes.length - 1]}
                  </p>
                </>
              )}
            </S.InfoSection>
            <S.PriceSection>
              <h4>총 결제 금액</h4>
              <strong>{price}원</strong>
              <ul>
                <li>해당 객실가는 세금, 봉사료가 포함된 금액입니다</li>
                <li>
                  결제완료 후 <span>예약자 이름</span>으로 바로
                  <span>체크인</span> 하시면 됩니다
                </li>
              </ul>
            </S.PriceSection>
            <S.OrderButton onClick={openModal}>결제하기</S.OrderButton>
          </S.Right>
        </S.BookItemWrap>
      </S.ShowDiv>
    </>
  );
};

export default Book;

const S = {
  Header: styled.div`
    width: 100%;
    height: 72px;
    background-color: ${({ theme }) => theme.brandColor}; ;
  `,
  ShowDiv: styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: center;
    width: 1024px;
    margin: auto;
    strong {
      font-size: 18px;
    }
  `,
  BookItemWrap: styled.div`
    ${variables.flex("space-between", "flex-start", "center")}
    width: 1024px;
  `,
  Left: styled.div`
    width: 564px;
  `,
  Right: styled.div`
    width: 310px;
    margin: 40px 31px 0 0;
    border-radius: 0 0 4px 4px;
    background: rgba(0, 0, 0, 0.04);
  `,
  SectionTitle: styled.h3`
    display: block;
    margin: 54px 0 42px 0;
    font-size: 20px;
    font-family: GothicA1;
  `,
  TimeTitle: styled.div`
    width: 100%;
    ${variables.flex("space-between", "ceter", "center")}
    height: 41px;
    padding: 0;
    font-size: 18px;
  `,
  ButtonWrap: styled.div`
    width: 100%;
    ${variables.flex("flex-start", "center", "center")}
    flex-wrap:wrap;
    padding: 10px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.08);
  `,
  TimeButton: styled.button`
    display: inline-block;
    height: 40px;
    margin-right: 5px;
    margin-bottom: 11px;
    padding: 0 11px;
    border: 1px solid
      ${({ isSelected, theme }) => (isSelected ? "white" : theme.brandColor)};
    border-radius: 4px;
    background: ${({ isSelected, theme }) =>
      isSelected ? theme.brandColor : "white"};
    font-size: 14px;
    line-height: 40px;
    color: ${({ isSelected, theme }) =>
      isSelected ? "white" : theme.brandColor};
    box-sizing: border-box;
  `,
  InputWrap: styled.div`
    margin-top: 20px;
    margin-bottom: 60px;
    width: 100%;
    border: 2px solid rgba(0, 0, 0, 0.08);
    border-radius: 5px;
    padding: 7px;
  `,
  NameInput: styled.input`
    border: none;
    width: 100%;
    font-size: 18px;
  `,
  PhoneInput: styled.input`
    border: none;
    width: 100%;
    font-size: 18px;
  `,
  PriceSection: styled.section`
    width: 100%;
    display: block;
    ${variables.flex("center", "flex-start", "column")}
    padding: 39px 24px 33px !important;
    h4 {
      font-family: GothicA1;
    }
    strong {
      color: ${({ theme }) => theme.brandColor};
      font-size: 24px;
      font-family: Jalnan;
      letter-spacing: 3px;
      margin-top: 20px;
      margin-bottom: 30px;
    }
    ul {
      list-style: square;
    }
    li {
      margin-bottom: 10px;
    }
    span {
      color: red;
    }
  `,
  InfoSection: styled.section`
    width: 100%;
    ${variables.flex("center", "flex-start", "column")}
    padding: 39px 24px 33px !important;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    strong {
      color: rgba(0, 0, 0, 0.3);
      margin-top: 30px;
    }
    p {
      margin-top: 20px;
      font-size: 20px;
    }
  `,
  OrderButton: styled.button`
    width: 100%;
    border: none;
    background-color: ${({ theme }) => theme.brandColor};
    color: white;
    font-size: 20px;
    height: 56px;
    border-radius: 0 0 4px 4px; ;
  `,
  WhiteBg: styled.div`
    ${variables.flex()};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    z-index: 10000;
  `,
  PaymentComplete: styled.div`
    ${variables.flex("center", "center", "column")};

    h1 {
      color: ${({ theme }) => theme.brandColor};
      font-size: 50px;
      font-family: Jalnan;
      margin-bottom: 50px;
    }
    p {
      font-size: 25px;
      margin-bottom: 20px;
    }
    a {
      color: black;
      font-size: 20px;
    }
  `,
};
