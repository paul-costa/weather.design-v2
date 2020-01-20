export interface WeatherResponse { 
    latitude: number,
    longitude: number,
    timezone: string,
    currently: WeatherCurrently,
    hourly: WeatherHourly,
    offset: number
}



export interface WeatherCurrently {
    time: Date,
    summary: string,
    icon: string,
    nearestStormDistance: number,
    nearestStormBearing: number,
    precipIntensity: number,
    precipProbability: number,
    temperature: number,
    apparentTemperature: number,
    dewPoint: number,
    humidity: number,
    pressure: number,
    windSpeed: number,
    windGust: number,
    windBearing: number,
    cloudCover: number,
    uvIndex: number,
    visibility: number,
    ozone: number
}

export interface WeatherHourly {
    summary: string,
    icon: string,
    data: Array<WeatherData>,
}


export interface WeatherData {
    time: Date,
    summary: string,
    icon: string,
    precipIntensity: number,
    precipProbability: number,
    precipType: string,
    temperature: number,
    apparentTemperature: number,
    dewPoint: number,
    humidity: number,
    pressure: number,
    windSpeed: number,
    windGust: number,
    windBearing: number,
    cloudCover: number,
    uvIndex: number,
    visibility: number,
    ozone: number
}