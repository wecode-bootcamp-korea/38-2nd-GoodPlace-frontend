import React, { useEffect, useState, useCallback } from "react";

import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import variables from "../../styles/variables";

const SearchModal = ({ setTrySearch, searchData }) => {
  const closeModal = () => {
    setTimeout(() => {
      setTrySearch(false);
    }, 300);
  };

  return (
    <S.Background onClick={closeModal}>
      <S.Content onClick={e => e.stopPropagation()}>
        {searchData &&
          searchData.map(({ id, name }) => {
            return (
              <p>
                <Link to={`/detail/${id}`}>{name}</Link>
              </p>
            );
          })}
      </S.Content>
    </S.Background>
  );
};

const S = {
  Background: styled.div`
    ${variables.flex()};
    position: fixed;
    top: 72px;
    right: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
  `,
  Content: styled.div`
    ${variables.flex("flex-start", "center", "column")};
    position: relative;
    top: -272px;
    width: 550px;
    height: 400px;
    background-color: white;
    color: black;
    font-size: 20px;
    padding: 20px;
    border-radius: 5px;
    overflow-y: scroll;

    p {
      ${variables.flex("flex-start", null, null)};
      padding-bottom: 5px;
      width: 100%;
      text-align: left;
      a {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.4);
      }
    }
  `,
};

export default SearchModal;
