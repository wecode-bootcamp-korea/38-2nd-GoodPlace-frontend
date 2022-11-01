import React, { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import Modal from "../../../components/Modal/Modal";
import "react-day-picker/dist/style.css";
import styled from "styled-components";
import { subDays } from "date-fns";

const Calendar = ({
  pastMonth,
  setIsCalendarOpen,
  range,
  setRange,
  setDate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calendarRef = useRef();

  const closeCalendar = e => {
    calendarRef.current.contains(e.target) || setIsCalendarOpen(false);
  };

  const disabledDays = [
    { from: new Date(2020, 1, 1), to: subDays(pastMonth, 1) },
  ];

  useEffect(() => {
    document.addEventListener("mousedown", closeCalendar);
    return () => {
      document.removeEventListener("mousedown", closeCalendar);
    };
  }, []);

  const selectDate = () => {
    if (range !== undefined && range !== null) {
      setDate(range);
      setIsCalendarOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <S.CalendarContainer ref={calendarRef}>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} content="needDate" />
      )}
      <DayPicker
        mode="range"
        defaultMonth={pastMonth}
        selected={range}
        onSelect={setRange}
        disabled={disabledDays}
      />
      <S.SelectComplete onClick={selectDate}>선택 완료</S.SelectComplete>
    </S.CalendarContainer>
  );
};

const S = {
  CalendarContainer: styled.div`
    position: absolute;
    top: 25px;
    background-color: white;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    box-shadow: 0 1px 8px 1px rgba(0, 0, 0, 0.3);
    .rdp-day_selected {
      background-color: ${({ theme }) => theme.brandColor};
    }
  `,
  SelectComplete: styled.button`
    width: 300px;
    height: 50px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: none;
    background-color: ${({ theme }) => theme.brandColor};
    color: white;
    font-size: 18px;
    &:hover {
      opacity: 0.8;
    }
  `,
};

export default Calendar;
