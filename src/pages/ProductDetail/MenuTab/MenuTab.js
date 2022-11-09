import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../../styles/theme";
import BookTab from "./BookTab/BookTab";
import InfoTab from "./InfoTab/InfoTab";
import Review from "./ReviewTab/Review";

const MenuTab = props => {
  const {
    range,
    setRange,
    setDate,
    defaultSelected,
    starRate,
    checkIn,
    checkOut,
    productId,
    productName,
    longitude,
    latitude,
  } = props;
  const [selectedMenu, setSelectedMenu] = useState("book");
  console.log(selectedMenu);
  const selectMenu = menuName => () => {
    setSelectedMenu(menuName);
  };

  return (
    <S.TabWrap>
      <S.MenuTab>
        <S.ButtonTab
          onClick={selectMenu("book")}
          isSelected={selectedMenu === "book"}
        >
          <span>객실안내/예약</span>
        </S.ButtonTab>
        <S.ButtonTab
          onClick={selectMenu("info")}
          isSelected={selectedMenu === "info"}
        >
          <span>숙소정보</span>
        </S.ButtonTab>
        <S.ButtonTab
          onClick={selectMenu("review")}
          isSelected={selectedMenu === "review"}
        >
          <span>리뷰</span>
        </S.ButtonTab>
      </S.MenuTab>
      {selectedMenu === "book" && (
        <BookTab
          range={range}
          setRange={setRange}
          defaultSelected={defaultSelected}
          setDate={setDate}
          checkIn={checkIn}
          checkOut={checkOut}
          productId={productId}
          productName={productName}
        />
      )}
      {selectedMenu === "info" && (
        <InfoTab longitude={longitude} latitude={latitude} />
      )}
      {selectedMenu === "review" && <Review starRate={starRate} />}
    </S.TabWrap>
  );
};

export default MenuTab;

const S = {
  TabWrap: styled.div`
    width: 1024px;
  `,
  MenuTab: styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 16px;
    margin-top: 32px;
  `,
  ButtonTab: styled.button`
    float: none;
    width: auto;
    height: 72px;
    margin-right: 24px;
    padding: 0;
    border: none;
    border-bottom: 3px solid
      ${({ isSelected, theme }) => (isSelected ? theme.brandColor : "none")};
    background: none;
    font-size: 18px;
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.brandColor : "rgba(0, 0, 0, 0.38)"};
  `,
};
