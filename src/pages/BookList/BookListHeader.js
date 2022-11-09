import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

const BookListTopHeader = ({ content }) => {
  return (
    <S.BookListTopHeader>
      <S.BookListTopHeaderContent>
        <S.BookListTopHeaderTitle>{content}</S.BookListTopHeaderTitle>
      </S.BookListTopHeaderContent>
    </S.BookListTopHeader>
  );
};
const S = {
  BookListTopHeader: styled.div`
    min-width: 1024px;
    height: 211px;
    background-color: ${theme.brandColor};
  `,
  BookListTopHeaderContent: styled.div`
    display: flex;
    justify-content: center;
    padding: 100px 887px 0 0;
    background-color: ${theme.brandColor};
  `,
  BookListTopHeaderTitle: styled.span`
    font-size: 38px;
    letter-spacing: -1px;
    color: #ffffff;
  `,
};
export default BookListTopHeader;
