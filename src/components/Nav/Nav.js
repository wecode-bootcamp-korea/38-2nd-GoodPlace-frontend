import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import variables from "../../styles/variables";
import theme from "../../styles/theme";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [trySearch, setTrySearch] = useState(false);

  const searchBtnClicked = () => {
    setTrySearch(true);
  };

  const closeSearch = () => {
    setTimeout(() => {
      setTrySearch(false);
    }, 500);
  };

  useEffect(() => {
    const scrolling = () => {
      let top = window.scrollY;
      setIsScrolled(top > 0 ? true : false);
    };
    window.addEventListener("scroll", scrolling);

    return () => window.removeEventListener(scrolling);
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
            />
          ) : (
            <>
              <S.NavContentItem>내주변</S.NavContentItem>
              <S.NavContentItem>예약내역</S.NavContentItem>
              <S.NavContentItem>더보기</S.NavContentItem>
              <S.NavContentItem>로그인</S.NavContentItem>
            </>
          )}
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
    background-color: ${({ isScrolled }) =>
      isScrolled ? "white" : "transparent"};
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
  `,
  SearchBtn: styled.button`
    ${variables.flex("space-between", "center", "center")};
    border: none;
    background-color: transparent;
    font-size: 25px;
  `,
  SearchBar: styled.input`
    opacity: 0;
    width: 345px;
    border: none;
    color: red;
    transition: width 0.5s;
    &:focus {
      width: 794px;
      opacity: 1;
    }
  `,
};

export default Nav;
