import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import variables from "../../../styles/variables";
import { CATEGORIES } from "../CATEGORIES";
import { HiOutlineChevronRight } from "react-icons/hi";

const CategoryBox = ({ list, closeCategory, categoryAnimation }) => {
  const [currentCity, setCurrentCity] = useState(1);

  const subCategories = CATEGORIES.find(
    category => category.id === currentCity
  ).subcategories;

  const navigate = useNavigate();

  const moveToCategory = id => {
    navigate(`/list/${id}`);
  };

  return (
    <S.CategoryBox
      onMouseLeave={closeCategory}
      categoryAnimation={categoryAnimation}
    >
      <S.Cities>
        {CATEGORIES.map(city => {
          return (
            <S.Category
              key={city.id}
              onMouseEnter={() => setCurrentCity(city.id)}
              isSelected={currentCity === city.id}
            >
              <span>{city.name}</span>
              {currentCity === city.id && (
                <span>
                  <HiOutlineChevronRight />
                </span>
              )}
            </S.Category>
          );
        })}
      </S.Cities>
      <S.SubCategories>
        {subCategories.map(subCategory => {
          return (
            <S.Category
              key={subCategory.subCategoryId}
              isSelected={parseInt(list) === subCategory.subCategoryId}
              onClick={() => moveToCategory(subCategory.subCategoryId)}
            >
              {subCategory.name}
            </S.Category>
          );
        })}
      </S.SubCategories>
    </S.CategoryBox>
  );
};

const animation = {
  mount: keyframes`
  0%{
    opacity:0;
  } 100%{
    opacity:1;
  }
  `,
  unmount: keyframes`
  0%{
    opacity:1;
  } 100%{
    opacity:0;
  }
  `,
};

const S = {
  CategoryBox: styled.div`
    ${variables.flex()}
    position: absolute;
    top: 45px;
    left: -15px;
    width: 470px;
    height: 555px;
    background-color: white;
    border-radius: 5px;
    border: none;
    box-shadow: 0 1px 8px 1px rgba(0, 0, 0, 0.3);
    color: black;
    animation: ${({ categoryAnimation }) =>
        categoryAnimation ? animation.mount : animation.unmount}
      0.1s;
    z-index: 5;
  `,
  Cities: styled.ul`
    width: 168px;
    height: 100%;
    padding: 23px 10px 0 36px;
    border-right: 0.5px solid ${({ theme }) => theme.lightGrey};
  `,
  SubCategories: styled.ul`
    width: 302px;
    height: 100%;
    padding: 23px 0 0 36px;
  `,
  Category: styled.li`
    ${variables.flex("space-between", "center", "row")};
    width: 100%;
    height: 27px;
    margin-bottom: 5px;
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.brandColor : "black"};
    font-size: 13px;
    font-weight: 100;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.brandColor};
    }
  `,
};

export default CategoryBox;
