import React, { useContext, useEffect, useState } from "react";
import { useParams, searchParams } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import variables from "../../styles/variables";
import theme from "../../styles/theme";
import LoginModal from "../Modal/LoginModal";
import { LoginContext } from "../../pages/context/LoginContext";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [trySearch, setTrySearch] = useState(false);
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    switchAnimation,
    setSwitchAnimation,
    navListName,
  } = useContext(LoginContext);

  const searchBtnClicked = () => {
    setTrySearch(true);
  };

  const closeSearch = () => {
    setTimeout(() => {
      setTrySearch(false);
    }, 500);
  };

  const loginModalOpen = e => {
    setSwitchAnimation(true);
    setIsLoginModalOpen(true);
  };

  useEffect(() => {
    const scrolling = () => {
      let top = window.scrollY;
      setIsScrolled(top > 0 ? true : false);
    };
    window.addEventListener("scroll", scrolling);

    return () => window.removeEventListener("scroll", scrolling);
  }, []);

  return (
    <S.NavBar isScrolled={isScrolled}>
      <S.NavWrap>
        <S.NavLogo>
          <span>어떤데.</span>
        </S.NavLogo>
        <S.NavContent>
          <S.SearchBtn onClick={searchBtnClicked}>
            <AiOutlineSearch />
          </S.SearchBtn>

          {trySearch ? (
            <S.SearchBar
              autoFocus
              placeholder="지역, 숙소명"
              onBlur={closeSearch}
              isScrolled={isScrolled}
            />
          ) : (
            <>
              <S.NavContentItem>
                {navListName ? "내주변" : "지역별"}
              </S.NavContentItem>
              <S.NavContentItem>예약내역</S.NavContentItem>
              <S.NavContentItem>더보기</S.NavContentItem>
              <S.NavContentItem onMouseDown={loginModalOpen}>
                로그인
              </S.NavContentItem>
            </>
          )}
          <LoginModal />
        </S.NavContent>
      </S.NavWrap>
    </S.NavBar>
  );
};

const S = {
  NavBar: styled.div`
    position: fixed;
    ${variables.flex("center", "center", "center")};
    width: 100%;
    z-index: 9999;
    transition: all 0.2s;
    box-shadow: ${({ isScrolled }) =>
      isScrolled ? "0px 2px 3px 0px rgb(0 0 0 / 10%)" : ""};
    background-color: ${({ isScrolled }) => (isScrolled ? "white" : "")};
    li {
      color: ${({ isScrolled }) => (isScrolled ? "black" : "white")};
    }

    button {
      color: ${({ isScrolled }) => (isScrolled ? "black" : "white")};
    }
    span {
      color: ${({ isScrolled }) => (isScrolled ? theme.brandColor : "white")};
    }
    input {
      color: ${({ isScrolled }) => (isScrolled ? "black" : "white")};
    }
  `,
  NavWrap: styled.div`
    ${variables.flex("space-between", "center", "center")};
    width: 1024px;
    height: 72px;
  `,
  NavLogo: styled.div`
    font-family: Jalnan;
    font-size: 25px;
    letter-spacing: 2px;
    color: ${props => props.color};
  `,
  NavContent: styled.ul`
    ${variables.flex("space-between", "center", "center")};
    font-size: 20px;
  `,
  NavContentItem: styled.li`
    margin-left: 30px;
    cursor: pointer;
  `,
  SearchBtn: styled.button`
    ${variables.flex("space-between", "center", "center")};
    border: none;
    background-color: transparent;
    font-size: 25px;
    cursor: pointer;
  `,
  SearchBar: styled.input`
    opacity: 0;
    width: 345px;
    border: none;
    color: red;
    transition: width 0.5s;
    background-color: ${({ isScrolled, theme }) =>
      isScrolled ? "none" : theme.brandColor};
    &:focus {
      width: 794px;
      opacity: 1;
    }
  `,
};

export default Nav;
