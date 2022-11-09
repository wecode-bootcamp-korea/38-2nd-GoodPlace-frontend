import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RoomList from "./RoomList";
import Calendar from "./Calendar";
import theme from "../../../../styles/theme";

const BookTab = ({
  range,
  setRange,
  setDate,
  defaultSelected,
  checkIn,
  checkOut,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const checkInMonth = range?.from.getMonth() + 1;
  const checkInDay = range?.from.getDate();
  const checkOutMonth = range?.to?.getMonth() + 1;
  const checkOutDay = range?.to?.getDate();
  const dateDiff = parseInt(
    (range?.to?.getTime() - range?.from?.getTime()) / (1000 * 60 * 60 * 24)
  );

  const calendarOpenToggle = () => {
    setIsCalendarOpen(true);
  };

  const hiddenToggle = event => {
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    isCalendarOpen || (range === undefined && setRange(defaultSelected));
  }, [isCalendarOpen]);

  return (
    <>
      <S.Calendar onClick={calendarOpenToggle}>
        <span>
          <b>
            {"  "}
            {checkInMonth}.{checkInDay} ~ {checkOutMonth}.{checkOutDay}
          </b>
          <em>
            {"  "}· {dateDiff}박
          </em>
        </span>
        {isCalendarOpen && (
          <Calendar
            setIsCalendarOpen={setIsCalendarOpen}
            range={range}
            setRange={setRange}
            setDate={setDate}
          />
        )}
      </S.Calendar>
      <RoomList checkIn={checkIn} checkOut={checkOut} dateDiff={dateDiff} />
    </>
  );
};

export default BookTab;

const S = {
  Calendar: styled.div`
    position: relative;
    width: 248px;
    height: 40px;
    margin: 32px 0;
    padding: 0 0 0 38px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    background: rgba(250, 250, 250, 0.7)
      url(//image.goodchoice.kr/images/web_v3/ico_cal_2.png) 3px 50% no-repeat;
    background-size: 32px auto;
    font-size: 18px;
    line-height: 40px;
    color: rgba(0, 0, 0, 0.87);
    .rdp-day_selected {
      background-color: ${theme.brandColor};
    }
  `,
};
