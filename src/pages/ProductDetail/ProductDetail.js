import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Carousel from "./Carousel/Carousel";
import Info from "./Info/Info";
import theme from "../../styles/theme";
import variables from "../../styles/variables";
import MenuTab from "./MenuTab/MenuTab";
import { addDays } from "date-fns";
import { useParams } from "react-router-dom";
import API from "../../config";

const pastMonth = new Date();

const defaultSelected = {
  from: pastMonth,
  to: addDays(pastMonth, 1),
}; //날짜 기본값

const ProductDetail = () => {
  const [range, setRange] = useState(defaultSelected);
  const [productData, setProductData] = useState([]);
  const [date, setDate] = useState(defaultSelected);

  const params = useParams();

  console.log(params.id);
  const checkIn = date?.from?.toISOString().split("T")[0];
  const checkOut = date?.to?.toISOString().split("T")[0] || checkIn;

  useEffect(() => {
    fetch(`${API.list}/${params.id}?checkIn=${checkIn}&checkOut=${checkOut}`)
      .then(res => res.json())

      .then(data =>
        setProductData({
          ...data.productInfo[0],
          product_images: JSON.parse(data.productInfo[0]?.product_images),
        })
      );
  }, [date]);

  const {
    id,
    name,
    thumbnail_url,
    address,
    description,
    product_images,
    avg_rating,
    count_rating,
    longitude,
    latitude,
  } = productData;

  console.log(avg_rating);
  return (
    <>
      {
        <>
          <S.Headers></S.Headers>
          <S.ContentWrap>
            <S.Content>
              <S.Top>
                <S.Left>
                  <Carousel productImages={product_images} />
                </S.Left>
                <S.Right>
                  <Info
                    id={id}
                    name={name}
                    adress={address}
                    avgRating={avg_rating}
                    countRating={count_rating}
                    description={description}
                  />
                </S.Right>
              </S.Top>
            </S.Content>
            <MenuTab
              productName={name}
              productId={id}
              range={range}
              setRange={setRange}
              setDate={setDate}
              defaultSelected={defaultSelected}
              thumbnailUrl={thumbnail_url}
              starRate={avg_rating}
              checkIn={checkIn}
              checkOut={checkOut}
              longitude={longitude}
              latitude={latitude}
            />
          </S.ContentWrap>
        </>
      }
    </>
  );
};

export default ProductDetail;

const S = {
  Headers: styled.div`
    width: 100%;
    height: 72px;
    background-color: ${theme.brandColor};
  `,
  ContentWrap: styled.div`
    ${variables.flex("center", "center", "column")}
    width: 100%;
    padding-top: 36px;
  `,
  Content: styled.div`
    width: 1024px;
  `,
  Top: styled.div`
    ${variables.flex("space-between", "flex-start", "center")}
    width: 1024px;
    height: 447px;
    padding: 0px 0px;
  `,
  Left: styled.div`
    width: 490px;
    height: 447px;
  `,
  Right: styled.div`
    width: 424px;
    height: 276.5px;
  `,
};
