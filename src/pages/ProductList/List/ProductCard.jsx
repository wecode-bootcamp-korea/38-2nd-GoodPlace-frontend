import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import variables from "../../../styles/variables";

const ProductCard = ({ product, isNearBy, checkIn, checkOut }) => {
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

  const address = product !== undefined ? product.address.split(" ") : null;

  const ratingMessage = rating => {
    if (rating < 3) {
      return "별로에요";
    }
    if (rating < 9) {
      return "추천해요";
    }
    return "최고에요";
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
    <S.ProductCard
      onClick={() => {
        navigate(
          `/detail/${product.id}?checkIn=${checkIn}&checkOut=${checkOut}`
        );
      }}
    >
      <S.ImgWrap imgurl={thumbnail_url} />
      <S.ContentWrap>
        <S.Information>
          <S.Name>{name}</S.Name>
          {!avg_rating ? (
            <S.Score>
              <span>별점 정보 없음</span>
            </S.Score>
          ) : (
            <S.Score>
              <S.ScoreBadge>
                <span>{Math.round(avg_rating * 10) / 10}</span>
              </S.ScoreBadge>
              <span>
                {ratingMessage(avg_rating)} ({count_rating})
              </span>
            </S.Score>
          )}
          <S.Location>
            {isNearBy && <span>{distanceUnit(distance)}</span>}
            {address !== null && `${address[1]} ${address[2]}`}
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
      </S.ContentWrap>
    </S.ProductCard>
  );
};

const S = {
  ProductCard: styled.li`
    ${variables.flex()}
    width: 635px;
    height: 265px;
    padding: 16px 16px 16px 16px;
    border-bottom: 0.5px solid ${({ theme }) => theme.lightGrey};
    cursor: pointer;
  `,
  ImgWrap: styled.div`
    width: 150px;
    height: 100%;
    background-image: url(${({ imgurl }) => imgurl});
    background-position: center;
    background-size: cover;
  `,
  ContentWrap: styled.div`
    ${variables.flex("space-between", null, "column")};
    width: 435px;
    height: 100%;
    padding: 0 16px 16px 16px;
    line-height: 30px;
  `,
  Information: styled.div`
    ${variables.flex(null, "flex-start", "column")};
  `,
  Name: styled.strong`
    ${variables.lightFontWeight};
    font-family: "GothicA1";
    font-size: 24px;
  `,
  Score: styled.span`
    ${variables.flex("flex-start", "center", "row")};
    font-size: 20px;
    color: orange;
  `,
  ScoreBadge: styled.div`
    ${variables.flex()};
    width: 26px;
    height: 17px;
    padding-top: 2px;
    margin-right: 5px;
    border-radius: 3px;
    background-color: orange;
    color: white;
    font-size: 16px;
  `,
  Location: styled.p`
    font-size: 20px;
    span {
      margin-right: 10px;
      &:after {
        margin-left: 10px;
        content: "|";
      }
    }
  `,
  PricesWrap: styled.div`
    ${variables.flex(null, "flex-end", "column")};
    line-height: 30px;
  `,
  Price: styled.div`
    ${variables.lightFontWeight};
    font-size: 20px;
    span {
      margin-right: 12px;
    }
    strong {
      font-family: "GothicA1";
    }
  `,
};
export default ProductCard;
