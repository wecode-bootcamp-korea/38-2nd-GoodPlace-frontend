import React, { useState, useEffect } from "react";
import styled from "styled-components";
import variables from "../../styles/variables";
import theme from "../../styles/theme";
import { AGREEMENT } from "./AGREEMENT";

const AgreementList = () => {
  const [checkItems, setCheckItems] = useState([]);

  const handleSingleCheck = (checked, item) => {
    if (checked) {
      setCheckItems(prev => [...prev, item.id]);
    } else {
      setCheckItems(checkItems.filter(el => el !== item.id));
    }
  };

  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      AGREEMENT.forEach(el => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  return (
    <S.Section>
      <S.AgreeList>
        <S.AgreeAll>
          <label>
            <S.CheckAll
              type="checkbox"
              onChange={event => handleAllCheck(event.target.checked)}
              checked={checkItems.length === AGREEMENT.length}
            />
            전체 동의
          </label>
        </S.AgreeAll>
        {AGREEMENT?.map(agreeItem => (
          <S.AgreeItem key={agreeItem.id}>
            <label>
              <S.CheckItem
                type="checkbox"
                onChange={event =>
                  handleSingleCheck(event.target.checked, agreeItem)
                }
                checked={checkItems.includes(agreeItem.id)}
              />
              {agreeItem.title}
            </label>
            <S.Essential>(필수)</S.Essential>
          </S.AgreeItem>
        ))}
      </S.AgreeList>
    </S.Section>
  );
};

const S = {
  Section: styled.section`
    width: 336px;
    height: 477px;
    margin-bottom: 50px;
  `,

  AgreeList: styled.div`
    width: 100%;
  `,
  Essential: styled.span`
    margin-left: 8px;
    color: ${theme.brandColor};
  `,
  AgreeAll: styled.p`
    ${variables.boldFontWeight};
    width: 100%;
    height: 26px;
    margin-bottom: 25px;
    font-size: 16px;
  `,
  AgreeItem: styled.p`
    width: 100%;
    height: 26px;
    margin-bottom: 25px;
    font-size: 16px;
  `,
  CheckAll: styled.input`
    width: 24px;
    height: 24px;
    margin-right: 10px;
    accent-color: ${theme.brandColor};
    vertical-align: top;
  `,
  CheckItem: styled.input`
    width: 24px;
    height: 24px;
    margin-right: 10px;
    accent-color: ${theme.brandColor};
    vertical-align: top;
  `,
};

export default AgreementList;
