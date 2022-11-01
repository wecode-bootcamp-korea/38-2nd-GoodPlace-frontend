import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineCalendar } from "react-icons/ai";
import DetailedFilter from "./DetailedFilter";
import Calendar from "./Calendar";
import variables from "../../../styles/variables";

const Filter = ({
  isNearBy,
  setFilter,
  setDistanceRange,
  pastMonth,
  defaultSelected,
  setDate,
}) => {
  const [range, setRange] = useState(defaultSelected); // 날짜
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentDistanceRange, setCurrentDistanceRange] = useState(30);
  const [options, setOptions] = useState([]);

  const selectOptions = e => {
    e.target.checked
      ? setOptions(options => [...options, +e.target.name])
      : setOptions(options =>
          [...options].filter(option => option !== +e.target.name)
        );
  };

  const initFilter = () => {
    setOptions([]);
    setFilter([]);
  };

  const applyFilter = () => {
    setFilter(options);
  };

  const openCalendar = () => {
    setIsCalendarOpen(true);
  };

  const saveCurrentDistanceRange = e => {
    setCurrentDistanceRange(e.target.value);
  };

  const saveDistanceRange = () => {
    setDistanceRange(+currentDistanceRange * 1000);
  };

  const checkInMonth = range?.from.getMonth() + 1;
  const checkInDay = range?.from.getDate();
  const checkOutMonth = range?.to?.getMonth() + 1;
  const checkOutDay = range?.to?.getDate();
  const dateDiff = parseInt(
    (range?.to?.getTime() - range?.from?.getTime()) / (1000 * 60 * 60 * 24)
  );

  useEffect(() => {
    isCalendarOpen || (range === undefined && setRange(defaultSelected));
  }, [isCalendarOpen]);

  return (
    <S.Filter>
      <S.FilterCalendar>
        {isCalendarOpen && (
          <Calendar
            pastMonth={pastMonth}
            setIsCalendarOpen={setIsCalendarOpen}
            range={range}
            setRange={setRange}
            defaultSelected={defaultSelected}
            setDate={setDate}
          />
        )}
        <S.FilterTitle>날짜</S.FilterTitle>
        <S.FilterCalendarBox onClick={openCalendar}>
          <AiOutlineCalendar size="23px" />
          <div>
            {checkInMonth}월 {checkInDay}일 ~ {checkOutMonth || checkInMonth}월
            {checkOutDay || checkInDay}일
          </div>
          <div>·</div>
          <div>{dateDiff || 0}박</div>
        </S.FilterCalendarBox>
      </S.FilterCalendar>
      <S.DetailedFilterContainer>
        <S.FilterTitle>상세 필터</S.FilterTitle>
        <S.ButtonWrapper>
          <S.InitButton onClick={initFilter}>초기화</S.InitButton>
          <S.ApplyButton onClick={applyFilter}>적용</S.ApplyButton>
        </S.ButtonWrapper>
        {FILTERS.map(filter => {
          return (
            <DetailedFilter
              key={filter.id}
              filter={filter}
              options={options}
              selectOptions={selectOptions}
            />
          );
        })}
        {isNearBy && (
          <S.DistanceWrap>
            <S.FilterTitle>거리 범위</S.FilterTitle>
            <S.RangeFilter
              type="range"
              max="30"
              min="1"
              onChange={saveCurrentDistanceRange}
              onMouseUp={saveDistanceRange}
              value={currentDistanceRange}
            />
            <S.Distance>{currentDistanceRange}KM</S.Distance>
          </S.DistanceWrap>
        )}
      </S.DetailedFilterContainer>
    </S.Filter>
  );
};

const S = {
  Filter: styled.aside`
    ${variables.flex("flex-start", "center", "column")};
    position: sticky;
    top: 92px;
    width: 300px;
    height: 100%;
    margin: 0 32px 0 31px;
    padding-bottom: 20px;
    border: 0.5px solid ${({ theme }) => theme.lightGrey};
    border-radius: 5px;
  `,
  FilterCalendar: styled.div`
    position: relative;
    width: 250px;
    height: 130px;
    padding-top: 27px;
    border-bottom: 0.5px solid ${({ theme }) => theme.lightGrey};
  `,
  FilterTitle: styled.h4`
    ${variables.boldFontWeight};
    font-size: 18px;
  `,
  FilterCalendarBox: styled.div`
    ${variables.flex("space-between", "center", "row")};
    width: 250px;
    height: 40px;
    margin: 13px 0 32px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #eeeeee;
    border-radius: 5px;
    border: 0.5px solid ${({ theme }) => theme.lightGrey};
    cursor: pointer;
  `,
  DetailedFilterContainer: styled.div`
    width: 250px;
    padding-top: 27px;
  `,
  ButtonWrapper: styled.div`
    ${variables.flex("space-between", "center", "row")};
    width: 250px;
    height: 65px;
    margin-top: 15px;
    margin-bottom: 15px;
  `,
  InitButton: styled.button`
    width: 120px;
    height: 40px;
    background-color: white;
    border-radius: 5px;
    border: 0.5px solid ${({ theme }) => theme.brandColor};
    color: ${({ theme }) => theme.brandColor};
    font-size: 15px;
    &:hover {
      opacity: 0.8;
    }
  `,
  ApplyButton: styled.button`
    width: 120px;
    height: 40px;
    background-color: ${({ theme }) => theme.brandColor};
    border-radius: 5px;
    border: 0.5px solid ${({ theme }) => theme.brandColor};
    color: white;
    font-size: 15px;
    &:hover {
      opacity: 0.8;
    }
  `,
  CalendarContainer: styled.div`
    position: absolute;
    top: 30px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 1px 5px 5px #eeeeee;
  `,
  RangeFilter: styled.input`
    width: 250px;
    height: 21px;
    margin-top: 15px;
    margin-bottom: 15px;
    accent-color: ${({ theme }) => theme.brandColor};
  `,
  DistanceWrap: styled.div`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 0.5px solid ${({ theme }) => theme.lightGrey};
  `,
  Distance: styled.p`
    font-size: 16px;
    text-align: right;
  `,
};

const FILTERS = [
  { id: 1, name: "TV" },
  { id: 2, name: "냉장고" },
  { id: 3, name: "안마의자" },
  { id: 4, name: "공기청정기" },
  { id: 5, name: "스타일러" },
];

export default Filter;
