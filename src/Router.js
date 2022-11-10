import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import LoginStore from "./pages/context/LoginContext";
import KakaoLogin from "./pages/SignIn/KakaoLogin";
import ProductList from "./pages/ProductList/ProductList";
import BookList from "./pages/BookList/BookList";
import BookListDetail from "./pages/BookList/BookListDetail";
import Book from "./pages/Book/Book";

const Router = () => {
  return (
    <BrowserRouter>
      <LoginStore>
        <Nav />
        <Routes>
          <Route path="/:list" element={<ProductList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/kakaologin" element={<KakaoLogin />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/booklistdetail/:id" element={<BookListDetail />} />
          <Route path="/Book" element={<Book />} />
        </Routes>
        <Footer />
      </LoginStore>
    </BrowserRouter>
  );
};

export default Router;
