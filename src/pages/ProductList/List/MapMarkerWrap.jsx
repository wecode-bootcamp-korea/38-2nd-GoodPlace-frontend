import React, { useState } from "react";
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";
import variables from "../../../styles/variables";

const MapMarkerWrap = ({ product }) => {
  const { latitude, longitude, name, time_price, stay_price, thumbnail_url } =
    product;

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const openOverlay = () => {
    setIsOverlayOpen(true);
  };
  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  const priceToString = price => {
    if (!price) {
      return "가격정보없음";
    } else {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    }
  };

  const position = { lat: latitude, lng: longitude };

  return (
    <>
      <MapMarker
        position={position}
        onClick={openOverlay}
        image={{
          src: "/images/MapMarkerIcon/brandcolormarker.png",
          size: {
            width: 26,
            height: 37,
          },
        }}
      />
      {isOverlayOpen && (
        <CustomOverlayMap position={position}>
          <S.ProductOverlay>
            <S.Closebutton onClick={closeOverlay}>
              <GrFormClose />
            </S.Closebutton>
            <S.ImageWrap imgurl={thumbnail_url} />
            <S.ContentWrap>
              <S.Name>
                <h4>{name}</h4>
              </S.Name>
              <S.PricesWrap>
                <S.PriceWrap>
                  <S.PriceTag>대실</S.PriceTag>
                  <S.Price>{priceToString(time_price)}</S.Price>
                </S.PriceWrap>
                <S.PriceWrap>
                  <S.PriceTag>숙박</S.PriceTag>
                  <S.Price>{priceToString(stay_price)}</S.Price>
                </S.PriceWrap>
              </S.PricesWrap>
            </S.ContentWrap>
          </S.ProductOverlay>
        </CustomOverlayMap>
      )}
    </>
  );
};

const S = {
  ProductOverlay: styled.div`
    ${variables.flex("flex-start", null, "row")};
    position: relative;
    width: 280px;
    height: 110px;
    padding: 5px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 1px 1px 1px #eeeeee;
  `,
  Closebutton: styled.div`
    ${variables.flex()};
    position: absolute;
    top: 5px;
    right: 5px;
    width: 25px;
    height: 25px;
    background-color: #eeeeee;
    border-radius: 25px;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.lightGrey};
    }
  `,
  ImageWrap: styled.div`
    width: 80px;
    height: 100px;
    background-image: url(${({ imgurl }) => imgurl});
    background-size: cover;
    background-position: center;
  `,
  ContentWrap: styled.div`
    ${variables.flex("space-between", null, "column")};
    width: 100%;
    margin-left: 10px;
    padding-top: 10px;
  `,
  Name: styled.div`
    width: 180px;
    font-size: 20px;
    font-weight: 400;
    text-overflow: ellipsis;
    overflow-x: hidden;
  `,
  PricesWrap: styled.div`
    ${variables.flex("flex-end", null, "column")};
    width: 100%;
    line-height: 20px;
  `,
  PriceWrap: styled.div`
    ${variables.flex("flex-start", "center", "row")};
    padding-right: 25px;
  `,
  PriceTag: styled.span`
    margin-right: 5px;
  `,
  Price: styled.strong`
    font-family: "GothicA1";
  `,
};
export default MapMarkerWrap;
