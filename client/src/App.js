import "./assets/css/reset.css";
import "./App.css";
//import Header from "./components/Header";

import { Route, Routes } from "react-router-dom";
import MagicMapPage from "./pages/MagicMapPage";

import GetDongRegionId from "./modules/map/GetDongRegionId";
import GetCoords from "./modules/map/GetCoords";

import MainPage from "./pages/MainPage";

//로그인
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";

import UserPage from "./pages/UserPage";
import MyPage from "./pages/MyPage";

import FootTracer from "./components/FootTrace/FootTracer";
import NavbarElements from "./components/NavbarElements";
import Footer from "./components/Footer";
import { useState } from "react";
import { SessionContext } from "./contexts/SessionContext";
import { useEffect } from "react";

function App() {
  const [sessionUser, setSessionUser] = useState({ email: "", nick: "" });

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setSessionUser(parsedUser);
        console.log("bbbb", parsedUser);
      } catch (error) {
        console.error("Failed to parse user data from session storage:", error);
      }
    }
  }, []);
  return (
    <div className="App">
      {/* <Header /> */}
      <SessionContext.Provider value={{ sessionUser, setSessionUser }}>
        <NavbarElements />

        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/magicmap" element={<MagicMapPage />}></Route>
          <Route path="/userpage" element={<UserPage />}></Route>
          {/* 테스트 유저피드 */}
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/join" element={<JoinPage />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>

          {/* 발자국지도 */}
          <Route path="/foottracer" element={<FootTracer />}></Route>
          {/*  */}
        </Routes>
        <Footer />
      </SessionContext.Provider>
    </div>
  );
}

export default App;
