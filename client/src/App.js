import logo from "./logo.svg";
import "./css/reset.css";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import MagicMap from "./components/MagicMap";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/magicmap" element={<MagicMap />}></Route>

        {/* <Route path="/about" element={<About />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/product/:num" element={<ProductDetail />}></Route> */}
        {/* path 가 * 라면, 위의 경로 이외에 경로들을 처리 */}
        {/* <Route path="*" element={<NotFound />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
