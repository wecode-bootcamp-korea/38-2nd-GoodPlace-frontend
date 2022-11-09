import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import LoginStore from "./pages/context/LoginContext";
import KakaoLogin from "./pages/SignIn/KakaoLogin";
import ProductList from "./pages/ProductList/ProductList";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Book from "./pages/Book/Book";

const Router = () => {
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <BrowserRouter>
      <LoginStore>
        <Nav />
        <Routes>
          <Route path="/:list" element={<ProductList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/kakaologin" element={<KakaoLogin />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
          <Route path="/Book" element={<Book />} />
        </Routes>
        <Footer />
      </LoginStore>
    </BrowserRouter>
  );
};

export default Router;
