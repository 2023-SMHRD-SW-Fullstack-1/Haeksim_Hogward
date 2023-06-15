import "./assets/css/reset.css";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import MagicMapPage from "./pages/MagicMapPage";
<<<<<<< HEAD
import GetDongRegionId from "./modules/map/GetDongRegionId";
import GetCoords from "./modules/map/GetCoords";
=======
import MyFeed from "./components/Feed/MyFeed";
import UserFeed from "./components/Feed/UserFeed";
>>>>>>> origin/kimterman

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/magicmap" element={<MagicMapPage />}></Route>
        <Route path="/myfeed" element={<MyFeed />}></Route>
        <Route path="/userfeed" element={<UserFeed />}></Route>
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
