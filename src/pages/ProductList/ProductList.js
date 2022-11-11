import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import variables from "../../styles/variables";
import Header from "./Header/Header";
import Filter from "./Filter/Filter";
import List from "./List/List";
import { CATEGORIES } from "./CATEGORIES";
import { addDays } from "date-fns";
import { LoginContext } from "../../pages/context/LoginContext";
import API from "../../config";

const pastMonth = new Date();

const ProductList = () => {
  const { list } = useParams();

  const isNearBy = list === "nearby";
  const defaultLocation = { lat: 37.506216, lng: 127.0539 }; // 좌표 기본값
  const defaultSelected = {
    from: pastMonth,
    to: addDays(pastMonth, 1),
  }; //날짜 기본값

  const [distanceRange, setDistanceRange] = useState(30000); // 거리
  const [sortBy, setSortBy] = useState(isNearBy ? "ascDistance" : "popularity");
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [filter, setFilter] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [productList, setProductList] = useState([]);
  const [date, setDate] = useState(defaultSelected);
  const [currentPage, setCurrentPage] = useState(list);

  const { setNavListName, navListName } = useContext(LoginContext);

  setNavListName(!isNearBy);

  const limit = pagination * 5;

  const checkIn = date?.from?.toISOString().split("T")[0];
  const checkOut = date?.to?.toISOString().split("T")[0] || checkIn;

  const currentCity =
    isNearBy ||
    CATEGORIES.find(
      city =>
        city.subcategories.find(sub => sub.subCategoryId === parseInt(list)) !==
        undefined
    );

  const currentSubCategory =
    isNearBy ||
    currentCity.subcategories.find(sub => sub.subCategoryId === parseInt(list));

  useEffect(() => {
    setPagination(1);
  }, []);

  useEffect(() => {
    isNearBy ? setSortBy("ascDistance") : setSortBy("popularity");
  }, [isNearBy]);

  useEffect(() => {
    setCurrentPage(list);
  }, [list]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        isNearBy
          ? `${API.list}/distance?latitude=${currentLocation.lat}&longitude=${
              currentLocation.lng
            }&distanceMeter=${distanceRange}&optionArray=${JSON.stringify(
              filter
            )}&sortBy=${sortBy}&checkIn=${checkIn}&checkOut=${checkOut}&limit=${limit}&offset=0`
          : `${
              API.list
            }/list?subCategoryId=${list}&offset=0&limit=${limit}&sortBy=${sortBy}&optionArray=${JSON.stringify(
              filter
            )}&checkIn=${checkIn}&checkOut=${checkOut}`
      );
      const { productInfo } = await response.json();
      setProductList(productInfo);
    })();
  }, [
    sortBy,
    filter,
    currentLocation,
    distanceRange,
    pagination,
    date,
    currentPage,
  ]);

  return (
    <>
      <Header
        list={list}
        isNearBy={isNearBy}
        city={currentCity?.name}
        subCategory={currentSubCategory?.name}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />
      <S.Body>
        <S.BodyContainer>
          <Filter
            isNearBy={isNearBy}
            setFilter={setFilter}
            distanceRange={distanceRange}
            setDistanceRange={setDistanceRange}
            pastMonth={pastMonth}
            defaultSelected={defaultSelected}
            setDate={setDate}
          />
          <List
            productList={productList}
            isNearBy={isNearBy}
            sortBy={sortBy}
            setSortBy={setSortBy}
            defaultLocation={defaultLocation}
            setPagination={setPagination}
            currentLocation={currentLocation}
            checkIn={checkIn}
            checkOut={checkOut}
          />
        </S.BodyContainer>
      </S.Body>
    </>
  );
};

const S = {
  Body: styled.div`
    ${variables.flex("center", "center", "column")};
  `,
  BodyContainer: styled.div`
    ${variables.flex("space-between", null, "row")};
    width: 1024px;
    margin: 50px;
  `,
};

export default ProductList;
