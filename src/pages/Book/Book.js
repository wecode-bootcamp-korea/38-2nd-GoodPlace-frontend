import React from "react";
import styled from "styled-components";
import variables from "../../styles/variables";
import CheckList from "./CheckList";

const Book = () => {
  return (
    <>
      <S.Header></S.Header>
      <S.ShowDiv>
        <S.BookItemWrap>
          <S.Left>
            <S.SectionTitle>이용 정보</S.SectionTitle>
            <S.TimeTitle>
              <strong>이용시간</strong>
              <span>최대 4시간 이용가능</span>
            </S.TimeTitle>
            <S.ButtonWrap>
              <S.TimeButton>11:00</S.TimeButton>
              <S.TimeButton>12:00</S.TimeButton>
              <S.TimeButton>13:00</S.TimeButton>
              <S.TimeButton>14:00</S.TimeButton>
              <S.TimeButton>15:00</S.TimeButton>
              <S.TimeButton>16:00</S.TimeButton>
              <S.TimeButton>17:00</S.TimeButton>
              <S.TimeButton>18:00</S.TimeButton>
              <S.TimeButton>11:00</S.TimeButton>
              <S.TimeButton>12:00</S.TimeButton>
              <S.TimeButton>13:00</S.TimeButton>
              <S.TimeButton>14:00</S.TimeButton>
            </S.ButtonWrap>
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
              <p>종로 종로 호텔</p>
              <strong>객실타입/기간</strong>
              <p>디럭스/대실</p>
            </S.InfoSection>
            <S.PriceSection>
              <strong>총 결제 금액</strong>
              <span>32000원</span>
              <ul>
                <li>해당 객실가는 세금, 봉사료가 포함된 금액입니다</li>
                <li>
                  결제완료 후 <d>예약자 이름</d>으로 바로 <d>체크인</d> 하시면
                  됩니다
                </li>
              </ul>
            </S.PriceSection>
            <S.OrderButton>결제하기</S.OrderButton>
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
    height: 532px;
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
    border: 1px solid #e61c51;
    border-radius: 4px;
    background: #fff;
    font-size: 14px;
    line-height: 40px;
    color: #e61c51;
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
    strong {
      font-family: GothicA1;
    }
    span {
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
    d {
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
};
