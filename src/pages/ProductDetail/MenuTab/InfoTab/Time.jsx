import React from "react";
import styled from "styled-components";

const Time = () => {
  return (
    <S.Table>
      <thead>
        <tr>
          <S.Th>구분</S.Th>
          <S.Th>대실</S.Th>
          <S.Th>숙박</S.Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>이용시간</th>
          <td>최대 4시간</td>
          <td>15시 입실</td>
        </tr>
      </tbody>
      <tfoot>
        <th>마감시간</th>
        <td>입실 시간으로부터 4시간</td>
        <td>익일 12시 퇴실</td>
      </tfoot>
    </S.Table>
  );
};

export default Time;

const S = {
  Table: styled.table`
    width: 100%;
    border-collapse: separate;
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-radius: 4px 4px 4px 4px;
    text-align: center;
    th {
      width: 33%;

      padding: 11px 4px 10px 4px;
      letter-spacing: 0;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    td {
      border: none;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      background: #fff;
    }
  `,
  Th: styled.th`
    color: white;
    background-color: rgba(0, 0, 0, 0.4);
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  `,
};
