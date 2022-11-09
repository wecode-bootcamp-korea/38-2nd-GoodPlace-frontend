import React from "react";
import styled from "styled-components";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import variables from "../../styles/variables";

const Footer = () => {
  return (
    <S.FooterContainer>
      <S.FooterContents>
        <S.FooterLink>
          <ul>
            <S.FooterLinkFirstLine>
              <li>
                <a href="#">회사소개</a> <S.DivideBar> | </S.DivideBar>
              </li>
              <li>
                <a href="#">이용약관</a> <S.DivideBar> | </S.DivideBar>
              </li>
              <li>
                <a href="#">개인정보처리방침</a> <S.DivideBar> | </S.DivideBar>
              </li>
              <li>
                <a href="#">소비자 분쟁해결 기준</a>
                <S.DivideBar> | </S.DivideBar>
              </li>
              <li>
                <a href="#">사업자 정보확인</a>
                <S.DivideBar> | </S.DivideBar>
              </li>
              <li>
                <a href="#">어떤데. 마케팅센터</a>{" "}
                <S.DivideBar> | </S.DivideBar>
              </li>

              <li>
                <a href="#">액티비티 호스트센터</a>{" "}
                <S.DivideBar> | </S.DivideBar>
              </li>

              <li>
                <a href="#">HOTEL 어떤데.</a> <S.DivideBar> | </S.DivideBar>
              </li>

              <li>
                <a href="#">콘텐츠산업진흥법에의한 표시</a>
              </li>
            </S.FooterLinkFirstLine>
          </ul>
        </S.FooterLink>

        <S.FooterHotline>
          <span className="hotline">
            <S.Bold>고객행복센터 1235-5678</S.Bold> 오전 9시 - 새벽 3시
          </span>
        </S.FooterHotline>

        <S.FooterInfo>
          <ul>
            <S.BrandName>(주) 어떤데.컴퍼니</S.BrandName>
            <S.BrandInfoDetail>
              주소 : 서울특별시 강남구 테헤란로 427, 위워크타워 10층{" "}
              <S.DivideBar> | </S.DivideBar>
              대표이사 : 김코드 <S.DivideBar> | </S.DivideBar> 사업자등록번호 :
              123-45-67890
            </S.BrandInfoDetail>
            <S.BrandInfoDetail>
              통신판매번호 : 2022-서울강남-12345 <S.DivideBar> | </S.DivideBar>{" "}
              관광사업자 등록번호 : 제1000-00호
              <S.DivideBar> | </S.DivideBar> 전화번호 : 1234-5678{" "}
              <S.DivideBar> | </S.DivideBar> 전자우편주소 : help@goodplace.kr
            </S.BrandInfoDetail>
            <S.BrandInfoCaution>
              (주) 어떤데.컴퍼니는 통신판매중개자로서 통신판매의 당사자가
              아니며, 상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각
              판매자에게 있습니다.
            </S.BrandInfoCaution>
            <S.BrandCopyright>
              Copyright GP COMPANY Corp. All rights reserved.
            </S.BrandCopyright>
          </ul>
        </S.FooterInfo>
        <S.FooterIcons>
          <S.FooterIconsEach>
            <FaFacebook size="22px" color="#7E7E7E" cursor="pointer" />
          </S.FooterIconsEach>
          <S.FooterIconsEach>
            <FaInstagramSquare size="22px" color="#7E7E7E" cursor="pointer" />
          </S.FooterIconsEach>
        </S.FooterIcons>
      </S.FooterContents>
    </S.FooterContainer>
  );
};
const S = {
  FooterContainer: styled.div`
    ${variables.flex("center", "center", "center")}
    margin-top: 120px;
    padding: 64px;
    width: 100%;
    background-color: #f5f5f5;
    letter-spacing: 0.5px;
    word-spacing: 1px;
  `,
  FooterContents: styled.div`
    width: 1024px;
    color: #989898;
    font-size: 13px;
  `,
  FooterLink: styled.div`
    display: flex;
    text-align: center;
    a {
      text-decoration: none;
      color: #989898;
    }
  `,
  FooterLinkFirstLine: styled.div`
    display: flex;
    text-decoration: none;
  `,
  DivideBar: styled.span`
    margin-left: 5px;
    margin-right: 5px;
  `,

  FooterHotline: styled.div`
    padding: 37px 0 24px 0;
    height: 81px;
  `,
  Bold: styled.span`
    font-weight: bold;
  `,
  FooterInfo: styled.div`
    height: 151px;
    line-height: 16px;
  `,
  BrandName: styled.div`
    margin-bottom: 10px;
  `,
  BrandInfoDetail: styled.span`
    display: flex;
  `,
  BrandInfoCaution: styled.span`
    display: flex;
    margin-top: 10px;
  `,
  BrandCopyright: styled.span`
    display: flex;
    margin-top: 15px;
    width: 780px;
  `,
  FooterIcons: styled.div`
    display: flex;
    padding-top: 10px;
    width: 621px;
    border-top: 1px solid #ebebeb;
  `,
  FooterIconsEach: styled.div`
    padding: 10px;
  `,
};

export default Footer;
