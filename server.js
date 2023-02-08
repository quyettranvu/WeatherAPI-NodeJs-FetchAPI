import fetch from "node-fetch";
import fs from "fs";
const weatherPath = "./weather.json";

async function getDatas() {
  const myWeathers = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Moscow?unitGroup=metric&elements=datetime%2Cname%2Ctemp%2Cfeelslike%2Chumidity%2Csnow%2Cwindgust%2Ccloudcover%2Csolarenergy%2Cmoonphase%2Cconditions%2Cdescription%2Cicon&include=events&key=HDKNYFD2DEGG7WVSK7F4FTEUY&contentType=json"
  );
  const response = await myWeathers.json();

  //write JSON string to a file if content there is null
  const weather = fs.readFileSync(weatherPath);
  if (weather.length == 0) {
    fs.writeFile("weather.json", JSON.stringify(response), (err) => {
      if (err) {
        throw err;
      }
      console.log("JSON data is saved.");
    });
  } else {
    //find days when rain or snow appears
    const weather_new = JSON.parse(weather);
    const filtered = weather_new.days.filter((item) => item.icon == "rain");
    const result = filtered.map((item) => item.datetime);
    console.log(`On these days rain will be: ${result}`);
  }
}

getDatas();
