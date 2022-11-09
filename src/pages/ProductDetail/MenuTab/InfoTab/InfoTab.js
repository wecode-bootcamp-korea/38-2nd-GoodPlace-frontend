import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import styled from "styled-components";
import variables from "../../../../styles/variables";
import Basic from "./Basic";
import Time from "./Time";
import Host from "./Host";

const InfoTab = props => {
  const { longitude, latitude } = props;
  const [buttonValue, setButtonValue] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [visibleSection, setVisibleSection] = useState("");

  const sectionOpen = sectionId => () => {
    if (isSelected) {
      setIsSelected(!isSelected);
      setVisibleSection("");
    } else {
      setIsSelected(!isSelected);
      setVisibleSection(sectionId);
    }
  };

  return (
    <S.AccordianWrap>
      <S.AccordianButton name="1" onClick={sectionOpen(1)}>
        <span>기본 정보</span>
        {visibleSection === 1 ? <AiOutlineDown /> : <AiOutlineUp />}
        <S.MiniButton />
      </S.AccordianButton>
      {sectionName[visibleSection] === "Basic" && (
        <S.Section name="Basic">
          <Basic longitude={longitude} latitude={latitude} />
        </S.Section>
      )}
      <S.AccordianButton name="2" onClick={sectionOpen(2)}>
        <span>시간 정보</span>
        {visibleSection === 2 ? <AiOutlineDown /> : <AiOutlineUp />}
        <S.MiniButton />
      </S.AccordianButton>
      {sectionName[visibleSection] == "Time" && (
        <S.Section name="Time">
          <Time />
        </S.Section>
      )}
      <S.LastButton name="3" onClick={sectionOpen(3)}>
        <span>판매자 정보</span>
        {visibleSection === 3 ? <AiOutlineDown /> : <AiOutlineUp />}
        <S.MiniButton />
      </S.LastButton>
      {sectionName[visibleSection] === "Host" && (
        <S.Section name="Host">
          <Host />
        </S.Section>
      )}
    </S.AccordianWrap>
  );
};

const sectionName = {
  1: "Basic",
  2: "Time",
  3: "Host",
};

export default InfoTab;

const S = {
  AccordianWrap: styled.div`
    width: 960px;
    ${variables.flex("center", "center", "column")}
  `,
  MiniButton: styled.p`
    position: relative;
    right: -460px;
    border: none;
    background: none;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.5);
  `,
  AccordianButton: styled.button`
    width: 960px;
    height: 80px;
    padding: 0px 16px;
    border: none;
    background: none;
    border-top: 2px solid rgba(0, 0, 0, 0.08);
    font-size: 18px;
    line-height: 80px;
    font-family: GothicA1;
    span {
      margin-right: 820px;
    }
  `,
  LastButton: styled.button`
    width: 960px;
    height: 80px;
    padding: 0px 16px;
    border: none;
    background: none;
    border-top: 2px solid rgba(0, 0, 0, 0.08);
    border-bottom: 2px solid rgba(0, 0, 0, 0.08);
    font-size: 18px;
    line-height: 80px;
    font-family: GothicA1;
    span {
      margin-right: 800px;
    }
  `,
  Section: styled.section`
    padding: 60px;
    color: rgba(0, 0, 0, 0.4);
    width: 100%;
    background-color: rgba(0, 0, 0, 0.04);
  `,
};
