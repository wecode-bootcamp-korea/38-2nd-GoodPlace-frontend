import React, { useEffect, useRef, useState } from "react";
import { BsMap } from "react-icons/bs";
import styled from "styled-components";
import PremiumCard from "./PremiumCard";
import ProductCard from "./ProductCard";
import MapContainer from "./MapContainer";
import variables from "../../../styles/variables";

const List = ({
  productList,
  isNearBy,
  sortBy,
  setSortBy,
  setPagination,
  currentLocation,
}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  const observerRef = useRef();

  const openMap = () => {
    setIsMapOpen(true);
  };

  const selectSortBy = sortBy => {
    setSortBy(sortBy);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      () => {
        setPagination(prev => prev + 1);
      },
      {
        rootMargin: "30px",
        threshold: 0.8,
      }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <S.List>
      {isMapOpen && (
        <MapContainer
          setIsMapOpen={setIsMapOpen}
          currentLocation={currentLocation}
          productList={productList}
        />
      )}
      <S.ListHeader>
        <S.Sort isNearBy={isNearBy}>
          {isNearBy ? (
            <S.Distance
              selected={sortBy === "ascDistance"}
              onClick={() => {
                selectSortBy("ascDistance");
              }}
            >
              거리 순
            </S.Distance>
          ) : (
            <S.Popularity
              selected={sortBy === "popularity"}
              onClick={() => {
                selectSortBy("popularity");
              }}
            >
              인기순
            </S.Popularity>
          )}
          <S.PriceLow
            selected={sortBy === "ascPrice"}
            onClick={() => {
              selectSortBy("ascPrice");
            }}
          >
            낮은 가격 순
          </S.PriceLow>
          <S.PriceHigh
            selected={sortBy === "descPrice"}
            onClick={() => {
              selectSortBy("descPrice");
            }}
          >
            높은 가격 순
          </S.PriceHigh>
        </S.Sort>
        {isNearBy && (
          <S.Map onClick={openMap}>
            <BsMap />
            <span>지도</span>
          </S.Map>
        )}
      </S.ListHeader>
      <S.ListWrap>
        <S.PremiumListWrap>
          {productList.map(product => {
            return (
              product.is_premium === 1 && (
                <PremiumCard
                  isNearBy={isNearBy}
                  product={product}
                  key={product.id}
                />
              )
            );
          })}
        </S.PremiumListWrap>
        <S.CommonListWrap>
          {productList.map(product => {
            return (
              product.is_premium === 0 && (
                <ProductCard
                  isNearBy={isNearBy}
                  product={product}
                  key={product.id}
                />
              )
            );
          })}
        </S.CommonListWrap>
      </S.ListWrap>
      <S.Observer ref={observerRef} />
    </S.List>
  );
};

const S = {
  List: styled.div`
    width: 635px;
  `,
  ListHeader: styled.div`
    ${variables.flex("space-between", null, "row")};
  `,
  Sort: styled.div`
    ${variables.flex()};
    width: ${({ isNearBy }) => (isNearBy ? 540 : 635)}px;
    margin-bottom: 30px;
  `,
  Distance: styled.div`
    ${variables.flex()};
    width: 33.3%;
    height: 40px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border: 0.5px solid ${({ theme }) => theme.lightGrey};
    background-color: #fafafa99;
    color: ${({ selected, theme }) =>
      selected ? theme.brandColor : theme.lightGrey};
    cursor: pointer;
  `,
  Popularity: styled.div`
    ${variables.flex()};
    width: 33.3%;
    height: 40px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border: 0.5px solid ${({ theme }) => theme.lightGrey};
    background-color: #fafafa99;
    color: ${({ selected, theme }) =>
      selected ? theme.brandColor : theme.lightGrey};
    cursor: pointer;
  `,
  PriceLow: styled.div`
    ${variables.flex()};
    width: 33.3%;
    height: 40px;
    border: 0.5px solid ${({ theme }) => theme.lightGrey};
    background-color: #fafafa99;
    border-left: none;
    color: ${({ selected, theme }) =>
      selected ? theme.brandColor : theme.lightGrey};
    cursor: pointer;
  `,
  PriceHigh: styled.div`
    ${variables.flex()};
    width: 33.3%;
    height: 40px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border: 0.5px solid ${({ theme }) => theme.lightGrey};
    border-left: none;
    background-color: #fafafa99;
    color: ${({ selected, theme }) =>
      selected ? theme.brandColor : theme.lightGrey};
    cursor: pointer;
  `,
  Map: styled.div`
    ${variables.flex()}
    width: 80px;
    height: 40px;
    border: 0.5px solid ${({ theme }) => theme.lightGrey};
    border-radius: 3px;
    background-color: #fafafa99;
    color: ${({ theme }) => theme.lightGrey};
    cursor: pointer;
    span {
      margin-left: 7px;
    }
  `,
  ListWrap: styled.div`
    min-height: 1325px;
  `,
  PremiumListWrap: styled.ul`
    width: 635px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
  `,
  CommonListWrap: styled.ul`
    width: 635px;
  `,
  Observer: styled.div`
    height: 50px;
  `,
};

export default List;
