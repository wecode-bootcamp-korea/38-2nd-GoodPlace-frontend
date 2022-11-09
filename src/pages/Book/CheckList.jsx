import React, { useState, useEffect } from "react";
import styled from "styled-components";
import variables from "../../styles/variables";
import theme from "../../styles/theme";

const AgreementList = props => {
  const { setAgreeSuccess } = props;
  const [agreement, setAgreement] = useState([]);
  const [checkItems, setCheckItems] = useState([]);

  const essentialarr = agreement.filter(el => el.essential).map(el => el.id);

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
      agreement.forEach(el => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  useEffect(() => {
    fetch("/data/bookagreement.json")
      .then(response => response.json())
      .then(setAgreement);
  }, []);

  const nextPage = () => {
    setAgreeSuccess(true);
  };

  return (
    <S.Section>
      <S.AgreeList>
        <S.AgreeAll>
          <label>
            <S.CheckAll
              type="checkbox"
              onChange={event => handleAllCheck(event.target.checked)}
              checked={checkItems.length === agreement.length}
            />
            전체 동의
          </label>
        </S.AgreeAll>
        {agreement &&
          agreement.map(agreeItem => (
            <S.AgreeItem key={agreeItem.id}>
              <label>
                <S.CheckItem
                  type="checkbox"
                  onChange={event =>
                    handleSingleCheck(event.target.checked, agreeItem)
                  }
                  checked={checkItems.includes(agreeItem.id) ? true : false}
                />
                {agreeItem.title}
              </label>
              {agreeItem.essential ? (
                <S.Essential>(필수)</S.Essential>
              ) : (
                " (선택)"
              )}
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
    color: ${theme.brandColor};
    margin-left: 8px;
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
    accent-color: ${theme.brandColor};
    vertical-align: top;
    width: 24px;
    height: 24px;
    margin-right: 10px;
  `,
  CheckItem: styled.input`
    accent-color: ${theme.brandColor};
    vertical-align: top;
    width: 24px;
    height: 24px;
    margin-right: 10px;
  `,
  // NextButton: styled.button`
  //   width: 100%;
  //   height: 56px;
  //   border: none;
  //   border-radius: 6px;
  //   background-color: ${theme.brandColor};
  //   color: white;
  //   font-size: 16px;
  //   &:disabled {
  //     background-color: ${theme.lightGrey};
  //   }
  // `,
};

export default AgreementList;
