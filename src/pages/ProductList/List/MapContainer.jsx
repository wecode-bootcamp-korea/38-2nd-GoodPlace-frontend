import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { GrFormClose } from "react-icons/gr";
import styled from "styled-components";
import MapMarkerWrap from "./MapMarkerWrap";
import variables from "../../../styles/variables";

const MapContainer = ({ setIsMapOpen, currentLocation, productList }) => {
  const closeMap = () => {
    setIsMapOpen(false);
  };

  return (
    <S.MapBackground onClick={closeMap}>
      <S.CloseButton>
        <GrFormClose size="40px" />
      </S.CloseButton>
      <S.MapWrap onClick={e => e.stopPropagation()}>
        <Map
          id="myMap"
          style={{
            width: "80vw",
            height: "80vh",
          }}
          center={currentLocation}
        >
          {productList.map(product => {
            return <MapMarkerWrap product={product} key={product.id} />;
          })}
          <MapMarker position={currentLocation} />
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
  MapWrap: styled.div``,
  CurrentLocationMarker: styled.div`
    ${variables.flex()};
    position: relative;
    background: ${({ theme }) => theme.brandColor};
    border-radius: 10px;
  `,
};

export default MapContainer;
