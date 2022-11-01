import React from "react";
import styled from "styled-components";
import variables from "../../../styles/variables";

const DetailedFilter = ({ filter, selectOptions, options }) => {
  const isChecked = options.includes(filter.id);

  return (
    <S.DetailedFilter>
      <S.CheckBox
        type="checkbox"
        name={filter.id}
        onChange={selectOptions}
        checked={isChecked}
      />
      <S.DetailedFilterContent>{filter.name}</S.DetailedFilterContent>
    </S.DetailedFilter>
  );
};

const S = {
  DetailedFilter: styled.div`
    ${variables.flex("flex-start", "center", "row")};
    width: 250px;
    margin-bottom: 10px;
  `,
  DetailedFilterContent: styled.p`
    font-size: 20px;
  `,
  CheckBox: styled.input`
    width: 21px;
    height: 21px;
    margin-right: 10px;
    border: 0.5px solid ${({ theme }) => theme.lightGrey};
    accent-color: ${({ theme }) => theme.brandColor};
  `,
};
export default DetailedFilter;
