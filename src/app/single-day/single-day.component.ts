import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetWeatherDataService } from '../get-weather-data.service';
import { Subscription } from 'rxjs';
import {  WeatherResponse } from '../shared/types';


interface DisplayData {
  date: Date;
  degree: number;
  city: string;
  country: string;
  humidity: number;
  shortDesc: string;
  iconString: string;
  windSpeed: number;
}

@Component({
  selector: 'app-single-day',
  templateUrl: './single-day.component.html',
  styleUrls: ['./single-day.component.css']
})
export class SingleDayComponent implements OnInit, OnDestroy {
  private processingSub: Subscription;
  private addressSub: Subscription;

  private weatherResponse: WeatherResponse;
  public displayData: DisplayData;

  public backgroundUrl;
  public dateString;
  public shortDescIconUrl;

  private city: string;
  private country: string;

  private backgroundChangeTimer;

  constructor(private weatherService: GetWeatherDataService) { }

  ngOnInit() {
    this.displayData = {
      date: null,
      degree: null,
      city: null,
      country: null,
      humidity: null,
      shortDesc: null,
      iconString: null,
      windSpeed: null,
    };
    
    
    this.weatherService.getCurrentWeather();
    
    this.addressSub=this.weatherService.currentCityAndCountry.subscribe(GeocodingRes => {
      this.city=GeocodingRes.split(' ')[1].replace(',','');
      this.country=GeocodingRes.split(' ')[2];

      this.processingSub=this.weatherService.proccessedReq.subscribe(weatherRes => {
        this.weatherResponse = weatherRes;
        this.getWeather(0, 'firstCall');
      })
    })

    

  }

 

  ngOnDestroy(): void {
    this.addressSub.unsubscribe();
    this.processingSub.unsubscribe();
  }



  getWeather(timestamp, additional?) {
    this.displayData = {
      date: new Date(+(this.weatherResponse.hourly.data[timestamp].time)*1000),
      degree: Math.floor(this.weatherResponse.hourly.data[timestamp].temperature),
      city: this.city,
      country: this.country,
      humidity: this.weatherResponse.hourly.data[timestamp].humidity,
      shortDesc: this.weatherResponse.hourly.data[timestamp].summary,
      iconString: this.weatherResponse.hourly.data[timestamp].icon,
      windSpeed: this.weatherResponse.hourly.data[timestamp].windSpeed,
    };


    this.dateString = this.getDateString();
    this.shortDescIconUrl = 'url(../../../../assets/weatherIcons/' +  this.displayData.iconString + '.svg';
  

    
    if(additional==='firstCall') {
      this.backgroundUrl = this.chooseBackground(this.displayData.iconString);
    }
    else {
      clearTimeout(this.backgroundChangeTimer);
      this.backgroundChangeTimer = setTimeout(() => {
        this.backgroundUrl = this.chooseBackground(this.displayData.iconString);
      }, 1500);  
    }
    
  }


  getDateString() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return this.displayData.date.getHours() + ':' + '00' + ' | ' + this.displayData.date.getDate() + '. ' + months[this.displayData.date.getMonth()];
  }

  chooseBackground(iconString: string) {
    return 'url(../../../../assets/backgrounds/' +  iconString + '/' + Math.floor(Math.random() * 5) + '.jpg';
  }
}
