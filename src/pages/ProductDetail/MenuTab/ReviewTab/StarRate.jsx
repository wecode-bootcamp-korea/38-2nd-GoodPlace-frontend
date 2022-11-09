import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import variables from "../../../../styles/variables";

function StarRate({ starRate }) {
  const STAR_IDX_ARR = ["first", "second", "third", "fourth", "last"];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);

  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (starRate * 700) / 100;
    let index = 0;

    while (starVerScore > 14) {
      tempStarRatesArr[index] = 14;
      index += 1;
      starVerScore -= 14;
    }

    tempStarRatesArr[index] = starVerScore;
    return tempStarRatesArr;
  };

  useEffect(() => {
    setRatesResArr(calcStarRates);
  }, []);

  return (
    <S.StarRateWrap>
      {STAR_IDX_ARR.map((star, index) => {
        return (
          <span className="star_icon" key={`${star}_${index}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="39"
              viewBox="0 0 14 13"
              fill="#cacaca"
            >
              <clipPath id={`${star}StarClip`}>
                <rect width={`${ratesResArr[index]}`} height="39" />
              </clipPath>
              <path
                id={`${star}Star`}
                d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                transform="translate(-2 -2)"
              />
              <use
                clipPath={`url(#${star}StarClip)`}
                href={`#${star}Star`}
                fill="orange"
              />
            </svg>
          </span>
        );
      })}
    </S.StarRateWrap>
  );
}

const S = {
  StarRateWrap: styled.div`
    ${variables.flex("center", "center", "row")}
    .star_icon {
      display: inline-flex;
      margin-right: 5px;
    }
  `,
};

export default StarRate;
