import "./assets/css/reset.css";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import MagicMapPage from "./pages/MagicMapPage";

import GetDongRegionId from "./modules/map/GetDongRegionId";
import GetCoords from "./modules/map/GetCoords";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import FeedPage from "./pages/FeedPage";
import FootTracer from "./components/FootTrace/FootTracer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/magicmap" element={<MagicMapPage />}></Route>
        <Route path="/feed" element={<FeedPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/login" element={<JoinPage />}></Route>

        {/* 발자국지도 */}
        <Route path="/foottracer" element={<FootTracer />}></Route>

        {/*  */}
        {/* <Route path="/about" element={<About />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/product/:num" element={<ProductDetail />}></Route> */}
        {/* path 가 * 라면, 위의 경로 이외에 경로들을 처리 */}
        {/* <Route path="*" element={<NotFound />}></Route> */}
        {/* 임시  - 전처리*/}

        <Route path="/module/getregion" element={<GetDongRegionId />}></Route>
        <Route path="/module/getcoords" element={<GetCoords />}></Route>
      </Routes>
    </div>
  );
}

export default App;
