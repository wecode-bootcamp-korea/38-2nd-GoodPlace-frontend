import React, { useEffect, useState } from "react";
import styled from "styled-components";
import variables from "../../../styles/variables";
import { AiFillCaretDown } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa";
import SettingLocation from "./SettingLocation";
import CategoryBox from "./CategoryBox";

const { kakao } = window;

const Header = ({
  isNearBy,
  list,
  city,
  subCategory,
  currentLocation,
  setCurrentLocation,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categoryAnimation, setCategoryAnimation] = useState(true);
  const [position, setPosition] = useState(currentLocation);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [address, setAddress] = useState({
    region_2depth_name: "강남구",
    region_3depth_name: "삼성동",
  });

  const openMap = () => {
    setIsMapOpen(true);
  };

  const openCategory = () => {
    setIsCategoryOpen(true);
  };

  const closeCategory = () => {
    setCategoryAnimation(false);
    setTimeout(() => {
      setIsCategoryOpen(false);
      setCategoryAnimation(true);
    }, 100);
  };

  const settingLocation = () => {
    setCurrentLocation(position);
  };

  const geocoder = new kakao.maps.services.Geocoder();

  const searchAddrFromCoords = (coords, callback) => {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.lng, coords.lat, callback);
  };

  const getAddress = () => {
    searchAddrFromCoords(currentLocation, result => {
      setAddress(result[0]);
    });
  };

  useEffect(() => {
    getAddress();
  }, [currentLocation]);

  return isNearBy ? (
    <S.Header>
      {isMapOpen && (
        <SettingLocation
          setIsMapOpen={setIsMapOpen}
          position={position}
          setPosition={setPosition}
          setCurrentLocation={setCurrentLocation}
          settingLocation={settingLocation}
        />
      )}
      <S.HeaderContainer>
        <S.HeaderTitle>내주변</S.HeaderTitle>
        <S.HeaderContent>
          <S.HeaderContentLocation>
            {address.region_2depth_name} {address.region_3depth_name}
          </S.HeaderContentLocation>
          <S.HeaderContentLocationChange onClick={openMap}>
            내 위치 재설정
          </S.HeaderContentLocationChange>
        </S.HeaderContent>
      </S.HeaderContainer>
    </S.Header>
  ) : (
    <S.Header>
      <S.HeaderContainer>
        <S.HeaderTitle>지역별</S.HeaderTitle>
        <S.HeaderContent>
          <S.SelectCategories onMouseEnter={openCategory}>
            <span>{city}</span>
            <span>
              <FaChevronRight />
            </span>
            <span>{subCategory}</span>
            {isCategoryOpen && (
              <CategoryBox
                list={list}
                closeCategory={closeCategory}
                categoryAnimation={categoryAnimation}
              />
            )}
            <S.DownIconWrap>
              <AiFillCaretDown />
            </S.DownIconWrap>
          </S.SelectCategories>
        </S.HeaderContent>
      </S.HeaderContainer>
    </S.Header>
  );
};

const S = {
  Header: styled.div`
    ${variables.flex()};
    height: 211px;
    background-color: ${props => props.theme.brandColor};
  `,
  HeaderContainer: styled.div`
    width: 1024px;
    height: 211px;
    padding-top: 72px;
  `,
  HeaderTitle: styled.div`
    ${variables.regularFontWeight};
    margin: 21px 0 0 31px;
    font-size: 38px;
    color: white;
  `,
  HeaderContent: styled.div`
    ${variables.flex("flex-start", "center", "row")};
    position: relative;
    height: 34px;
    margin: 21px 0 0 31px;
  `,
  HeaderContentLocation: styled.p`
    ${variables.boldFontWeight};
    margin-right: 10px;
    color: white;
    font-size: 18px;
    vertical-align: middle;
  `,
  HeaderContentLocationChange: styled.button`
    width: 94px;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.05);
    border: 0.5px solid rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    color: white;
    font-size: 13px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `,
  SelectCategories: styled.div`
    ${variables.flex()}
    position: absolute;
    left: 0;
    height: 32px;
    padding: 3px 36px 0 12px;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    color: white;
    font-size: 15px;
    font-family: "GothicA1";
    font-weight: 400;
    span {
      margin-right: 10px;
    }
  `,
  DownIconWrap: styled.div`
    position: absolute;
    right: 10px;
  `,
};
export default Header;
