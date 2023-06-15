import React, { useState } from "react";
import axios from "axios";

const GetDongRegionId = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [da, setDa] = useState();

  const handleSearch = async () => {
    try {
      const headers = {
        appKey: "XgS403FNvQ9Qlc1aip2iKH0syJUZY8Y8VcgSAnn5",
      };

      const response = await axios.get(
        "https://apis.openapi.sk.com/tmap/geofencing/regions",
        {
          params: {
            version: "1",
            format: "json",
            count: "20",
            categories: searchOption,
            searchType: "KEYWORD",
            searchKeyword: searchKeyword,
          },
          headers: headers,
        }
      );

      console.log(response.data);
      if (response.data) {
        const resultRegionsInfo = response.data.searchRegionsInfo;
        console.log(resultRegionsInfo);
        setDa(resultRegionsInfo[0].regionInfo.regionId);

        setSearchResult(resultRegionsInfo);
      } else {
        alert("잘못된 검색입니다.");
        setSearchResult([]);
      }
    } catch (error) {
      console.log("code:", error.response.status);
      console.log("message:", error.response.data);
      console.log("error:", error);
    }
  };

  const geofencingRegions = (regionId) => {
    // 상세보기 버튼을 클릭할 때 실행할 함수
    // 해당 함수의 구현은 필요에 따라 추가해야 합니다.
  };

  return (
    <div>
      <input
        type="text"
        id="searchKeyword"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <select
        id="selectLevel"
        value={searchOption}
        onChange={(e) => setSearchOption(e.target.value)}
      >
        <option value="city_do" selected="selected">
          시,도
        </option>
        <option value="gu_gun">시,군,구</option>
        <option value="legalDong">법정동</option>
        <option value="adminDong">행정동</option>
      </select>
      <button onClick={handleSearch}>검색</button>

      <div id="searchResult">
        {searchResult.map((result) => (
          <div key={result.regionInfo.regionId}>
            {result.regionInfo.description}
            <button
              type="button"
              name="sendBtn"
              onClick={() => geofencingRegions(result.regionInfo.regionId)}
            >
              상세보기
            </button>
            <p>{da}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetDongRegionId;
