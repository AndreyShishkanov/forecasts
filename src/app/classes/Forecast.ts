import {City} from '@classes/City';

export class ForecastApiResponse {
    cnt: number;
    list: Forecast[];
    city: City;
}

export class Forecast {
    id: number;
    name: string;
    weather: Weather[];
    main: Main;
    dt: number;
    dt_txt: string;
    wind: Wind;
}

class Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

class Wind {
    speed: number;
    deg: number;
}

class Main {
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}
