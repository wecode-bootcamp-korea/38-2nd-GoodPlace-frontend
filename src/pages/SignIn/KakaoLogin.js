import React, { useContext, useEffect } from "react";
import { useNavigate, searchParams } from "react-router-dom";
import API from "../../config";
import { LoginContext } from "../context/LoginContext";

const KakaoLogin = () => {
  const { setKakaoResponse } = useContext(LoginContext);
  const KAKAO_CODE = new URL(document.URL).searchParams.get("code");
  const navigate = useNavigate();

  const isNotUser = data => {
    setKakaoResponse(data);
    navigate("/signup");
    alert("가입정보가 유효하지 않아, 회원가입 페이지로 이동합니다.");
  };

  useEffect(() => {
    fetch(`${API.user}/kakao/signin?code=${KAKAO_CODE}`)
      .then(res => res.json())
      .then(res => {
        if (typeof res.data === "object") {
          isNotUser(res.data);
        } else if (typeof res.data !== "object") {
          localStorage.setItem("token", res.data);
          navigate("/");
        }
      });
  }, []);

  return <div>로그인 중 입니다.</div>;
};

export default KakaoLogin;
