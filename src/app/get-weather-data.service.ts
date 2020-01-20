import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherDataService {

  private lat;
  private  lon;
  
  private proxy = "https://cors-anywhere.herokuapp.com/"
  private reqUrl = this.proxy+"https://api.darksky.net/forecast/52c6984aa80b6b1fc50d3dd340934b5b/";

  public proccessedReq = new Subject<any>();
  public currentCityAndCountry = new Subject<any>();
  
  
  private GOOGLE_API_KEY = 'AIzaSyBeVDt6M48IiC8Xdm-pn-CouhJ5GzOuyNk';
  private googleReverseGeocodingApo = 'https://maps.googleapis.com/maps/api/geocode/json';



  constructor(private http: HttpClient) { }



  getCurrentWeather()  {
      this.getCurrentLocation().then(position => {
        this.getLocationInformation(position).then(position => {
          this.currentCityAndCountry.next(position.plus_code.compound_code);

          this.getWeatherInformation(position.results[0].geometry.location).then(weatherData => {
            this.processWeather(weatherData);
          });
        })
    });
  }


  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => { 
        resolve({
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        });
      },
      err => {
        reject(err);
      });
    });
  }





  getLocationInformation(position: {lat: number, lng: number}): Promise<any> {
    this.googleReverseGeocodingApo += `?latlng=${position.lat},${position.lng}&key=${this.GOOGLE_API_KEY}`;
  
    return new Promise((resolve, reject) => {
      this.http.get(this.googleReverseGeocodingApo).subscribe(res => {
        resolve(res);
      },
      err => {
        reject(err);
      });
    });
  }


  getWeatherInformation(position: {lat: number, lng: number}): Promise<any> {
    this.reqUrl += `${position.lat},${position.lng}?units=si&exclude=[minutely,daily,flags,alerts]`;
    
    return new Promise((resolve, reject) => {
      this.http.get(this.reqUrl).subscribe(res => {
        resolve(res);
      },
      err => {
        reject(err);
      });
    });
  }



  processWeather(weatherData) {
    this.proccessedReq.next(weatherData);
  }


  fahrenheitToCelsius(degInFahrenheit: number) {
    return ((degInFahrenheit-32)*5)/9;
  }

  kelvinToCelsius(degInKelvin: number) {
    return degInKelvin - 273.15;
  }
}
