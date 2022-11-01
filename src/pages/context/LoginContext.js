import React, { useState } from "react";
import { createContext } from "react";

export const LoginContext = createContext();

const LoginStore = props => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [switchAnimation, setSwitchAnimation] = useState(true);
  const [kakaoResponse, setKakaoResponse] = useState([]);
  const [navListName, setNavListName] = useState(true);

  return (
    <LoginContext.Provider
      value={{
        isLoginModalOpen,
        setIsLoginModalOpen,
        switchAnimation,
        setSwitchAnimation,
        kakaoResponse,
        setKakaoResponse,
        navListName,
        setNavListName,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginStore;
