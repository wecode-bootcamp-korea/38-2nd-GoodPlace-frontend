import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import variables from "../../../styles/variables";

const PremiumCard = ({ product, isNearBy, checkIn, checkOut }) => {
  const {
    name,
    time_price,
    stay_price,
    distance,
    thumbnail_url,
    avg_rating,
    count_rating,
  } = product;

  const priceToString = price => {
    if (!price) {
      return "가격정보없음";
    } else {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    }
  };

  const navigate = useNavigate();

  const address = product.address.split(" ");

  const ratingMessage = rating => {
    if (rating < 3) {
      return "별로에요";
    }
    if (rating < 9) {
      return "추천해요";
    }
    return "최고에요";
  };

  const rating = (rating, count) => {
    if (!rating) {
      return "별점 정보 없음";
    }
    return `${Math.round(rating * 10) / 10} ${ratingMessage(
      rating
    )} (${count})`;
  };

  const distanceUnit = distance => {
    if (distance < 0.001) {
      return "10m 이내";
    }
    return distance < 1
      ? Math.round(distance * 1000) + "m"
      : Math.round(distance * 10) / 10 + "Km";
  };

  return (
    <S.PremiumCard
      imgurl={thumbnail_url}
      onClick={() => {
        navigate(
          `/detail/${product.id}?checkIn=${checkIn}&checkOut=${checkOut}`
        );
      }}
    >
      <S.Background>
        <S.Information>
          <S.Name>{name}</S.Name>
          <S.Score>{rating(avg_rating, count_rating)}</S.Score>
          <S.Location>
            {isNearBy && <span>{distanceUnit(distance)} | </span>}
            {address[1]} {address[2]}
          </S.Location>
        </S.Information>
        <S.PricesWrap>
          <S.Price>
            <span>대실</span>
            <strong>{priceToString(time_price)}</strong>
          </S.Price>
          <S.Price>
            <span>숙박</span>
            <strong>{priceToString(stay_price)}</strong>
          </S.Price>
        </S.PricesWrap>
      </S.Background>
    </S.PremiumCard>
  );
};

const S = {
  PremiumCard: styled.li`
    width: 635px;
    height: 265px;
    background-image: url(${({ imgurl }) => imgurl});
    background-size: cover;
    background-position: center;
    cursor: pointer;
  `,
  Background: styled.div`
    ${variables.flex("space-between", "flex-end", "row")};
    height: 100%;
    padding: 130px 24px 24px 24px;
    background-color: rgba(0, 0, 0, 0.5);
  `,
  Information: styled.div`
    ${variables.flex("flex-end", null, "column")};
    height: 100%;
    line-height: 40px;
    color: white;
  `,
  Name: styled.h4`
    ${variables.regularFontWeight};
    color: white;
    font-size: 26px;
    font-family: "GothicA1";
  `,
  Score: styled.span`
    color: orange;
    font-size: 24px;
  `,
  Location: styled.span`
    color: white;
    font-size: 24px;
  `,
  PricesWrap: styled.div`
    line-height: 40px;
  `,
  Price: styled.div`
    ${variables.lightFontWeight};
    color: white;
    font-size: 24px;
    span {
      margin-right: 12px;
    }
    strong {
      font-family: "GothicA1";
    }
  `,
};

export default PremiumCard;
