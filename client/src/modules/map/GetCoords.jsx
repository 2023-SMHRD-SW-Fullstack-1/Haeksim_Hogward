import axios from "axios";
import React, { useEffect, useState } from "react";

const GetCoords = () => {
  const [coords, setCoords] = useState([]);

  // react 서버의 district.json 불러오기
  // const getDistrictAPI = () =>
  //   axios.get("converted-district.json").then((res) => setCoords(res.data));

  // district.json 의 regionId 사용해서 좌표값 구하기
  const GeofencingRegions = (regionId) => {
    try {
      const appkey = "XgS403FNvQ9Qlc1aip2iKH0syJUZY8Y8VcgSAnn5";
      axios
        .get(
          `https://apis.openapi.sk.com/tmap/geofencing/regions/${regionId}?version=1&format=json&appKey=${appkey}`
        )
        .then((res) => {
          console.log(res);
          document.write(res.data.features[0].geometry.coordinates);
        });

      // 나머지 코드 작성
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(coords);
    GeofencingRegions(121011);
  }, []);

  return <div>GetCoords</div>;
};

export default GetCoords;
