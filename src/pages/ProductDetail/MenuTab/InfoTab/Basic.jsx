import React from "react";
import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const Basic = props => {
  const { longitude, latitude } = props;
  return (
    <S.Wrap>
      <S.Title>주차장 정보</S.Title>
      <S.Ul>
        <li>주차가 불가하오니 가능한 대중교통을 이용을 권장드립니다.</li>
        <li>※지하철: 1, 2호선 시청역 4번 출구 도보 3분</li>
        <li>5호선 광화문역 5번 출구 도보 3분</li>
        <li>※버스: 광화문 정류장 서울파이낸스빌딩 방향 도보 5분</li>
        <li>주차장 미보유 숙소입니다. 도보로 이용해 주세요.</li>
      </S.Ul>
      <S.Title>지하철 정보</S.Title>
      <S.Ul>
        <li>2호선 선릉역</li>
        <li>9호선 선정릉역</li>
        <li>9호선 삼성중앙역</li>
        <li>수인분당선 선릉역</li>
      </S.Ul>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: latitude,
          lng: longitude,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={2} // 지도의 확대 레벨
        zoomable={false}
        draggable={false}
      >
        <MapMarker // 마커를 생성합니다
          position={{
            // 마커가 표시될 위치입니다
            lat: latitude,
            lng: longitude,
          }}
        />
      </Map>
    </S.Wrap>
  );
};

export default Basic;

const S = {
  Wrap: styled.div`
    line-height: 30px;
  `,
  Title: styled.h3`
    color: rgba(0, 0, 0, 0.7);
    font-size: 18px;
  `,
  Ul: styled.ul`
    padding-left: 20px;
    list-style-type: square;
    margin-bottom: 20px;
  `,
};
