import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { GrFormClose } from "react-icons/gr";
import variables from "../../../styles/variables";

const { kakao } = window;

const SettingLocation = ({
  setIsMapOpen,
  position,
  setPosition,
  settingLocation,
}) => {
  const [map, setMap] = useState(null);

  const searchRef = useRef();
  const keyword = useRef();

  const saveKeyword = e => {
    keyword.current = e.target.value;
  };

  const closeMap = () => {
    setIsMapOpen(false);
  };

  const searchLocation = () => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword.current, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        data.map(data => {
          bounds.extend(new kakao.maps.LatLng(data.y, data.x));
        });
        map.setBounds(bounds);
      }
    });
  };

  useEffect(() => {
    searchRef.current.focus();
    if (!map) return;
  }, []);

  return (
    <S.MapBackground onMouseDown={closeMap}>
      <S.CloseButton>
        <GrFormClose size="40px" />
      </S.CloseButton>
      <S.MapWrap onMouseDown={e => e.stopPropagation()}>
        <form
          onSubmit={e => {
            e.preventDefault();
            searchLocation();
          }}
        >
          <S.MapSearch type="text" ref={searchRef} onChange={saveKeyword} />
        </form>
        <Map
          id="myMap"
          style={{
            width: "70vw",
            height: "80vh",
          }}
          center={position}
          onClick={(_t, mouseEvent) => {
            setPosition({
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            });
          }}
          onCreate={setMap}
        >
          <MapMarker
            position={position}
            image={{
              src: "/images/MapMarkerIcon/brandcolormarker.png",
              size: {
                width: 26,
                height: 37,
              },
            }}
          />
          <S.ConfirmButton
            onClick={() => {
              settingLocation();
              closeMap();
            }}
          >
            설정 완료
          </S.ConfirmButton>
        </Map>
      </S.MapWrap>
    </S.MapBackground>
  );
};

const S = {
  MapBackground: styled.div`
    ${variables.flex()};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10000;
  `,
  CloseButton: styled.div`
    ${variables.flex()};
    position: absolute;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.7);
    }
  `,
  MapWrap: styled.div`
    position: relative;
  `,
  MapSearch: styled.input`
    position: absolute;
    top: 10px;
    right: 10vw;
    width: 50vw;
    height: 50px;
    padding: 15px;
    border-radius: 50px;
    border: none;
    box-shadow: 1px 1px 1px #eeeeee;
    text-align: center;
    font-size: 20px;
    z-index: 9;
  `,
  ConfirmButton: styled.button`
    position: absolute;
    bottom: 20px;
    right: 20vw;
    width: 30vw;
    height: 60px;
    border: none;
    border-radius: 65px;
    background-color: ${({ theme }) => theme.brandColor};
    color: white;
    font-size: 22px;
    font-family: "Jalnan";
    opacity: 0.8;
    z-index: 9;
    &:hover {
      opacity: 0.9;
    }
  `,
};
export default SettingLocation;
