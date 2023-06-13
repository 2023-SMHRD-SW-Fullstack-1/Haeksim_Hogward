const fs = require("fs");

const data = JSON.parse(fs.readFileSync("district.json", "utf-8"));

const convertedData = data.map((item) => {
  const newPath = [];
  for (let i = 0; i < item.path.length; i += 2) {
    newPath.push({
      lat: item.path[i + 1],
      lng: item.path[i],
    });
  }
  return {
    ...item,
    path: newPath,
  };
});

fs.writeFileSync(
  "converted-district.json",
  JSON.stringify(convertedData, null, 2),
  "utf-8"
);
