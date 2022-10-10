import { Request } from '../extendReqSession';
import { Response, NextFunction } from 'express';
import axios from 'axios';

interface ICoordinate {
  lat: number;
  lon: number;
}

interface IResonseCity {
  id: string;
  name: string;
  coord: ICoordinate;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface IResonseMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface IResonseWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IResposeElement {
  dt: string;
  main: IResonseMain;
  weather: Array<IResonseWeather>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface IResponseData {
  cod: string;
  message: number;
  cnt: number;
  list: Array<IResposeElement>;
  city: IResonseCity;
}

interface customData {
  date: string;
  main: string;
  temp: number;
}

class Weather {
  constructor() {
    // Empty
  }

  async forecast(req: Request, res: Response, next: NextFunction) {
    const url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=12.97&lon=77.59&&appid=?';           // Get api key from https://openweathermap.org/
    const encoded = encodeURI(url);
    axios.get(encoded).then((response) => {
      const result: IResponseData = response.data;
      const customResult: Array<customData> = new Array<customData>();
      result.list.forEach((element: IResposeElement) => {
        const newData: customData = {
          date: element.dt_txt,
          main: element.weather[0].main,
          temp: element.main.temp,
        };
        customResult.push(newData);
      });
      const Forecast5days: Array<customData> = new Array<customData>();
      for (let i = 0; i < 40; i = i + 8) {
        Forecast5days.push(customResult[i]);
      }
      res.send({
        count: 5,
        unit: 'metric',
        location: result.city.name,
        data: Forecast5days,
      });
    });
  }
}

export default new Weather();
