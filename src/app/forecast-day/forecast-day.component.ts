import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { ActivatedRoute } from '@angular/router';
import { GetWeatherDataService } from '../get-weather-data.service';
import { Subscription } from 'rxjs';
import { DetailedForecastData } from '../shared/types';


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
  selector: 'app-forecast-day',
  templateUrl: './forecast-day.component.html',
  styleUrls: ['./forecast-day.component.css']
})
export class ForecastDayComponent implements OnInit, OnDestroy {
  public applicatonProcessing=false;
  public backgroundUrl;
  private reqTime:number;

  private processingSub: Subscription;
  private detailedForecastResponse: DetailedForecastData;

  public displayData: DisplayData[] = [];



  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private weatherService: GetWeatherDataService, ) { }



  ngOnInit() {
    if(this.navigationService.getBackground()==undefined) {
      this.navigationService.routeHome();
    }
    else { 
      this.applicatonProcessing=true;
      this.backgroundUrl=this.navigationService.getBackground();

      this.reqTime = +this.activatedRoute.snapshot.paramMap.get("time");
      this.weatherService.getDetailForecastWeather(this.reqTime);
    }
    //Subscription
    this.processingSub=this.weatherService.detailForecastReq.subscribe(weatherRes => {
      this.detailedForecastResponse=weatherRes;
      this.getDetailedForecast();
      this.applicatonProcessing=false;
    })
  }

  ngOnDestroy() {
    this.processingSub.unsubscribe();
  }



  getDetailedForecast() {
    for(let i=0; i<this.detailedForecastResponse.hourly.data.length; i++) {
      this.displayData.push({
        date:       new Date(+(this.detailedForecastResponse.hourly.data[i].time)*1000),
        degree:     Math.floor(this.detailedForecastResponse.hourly.data[i].temperature),
        city:       null,
        country:    null,
        humidity:   this.detailedForecastResponse.hourly.data[i].humidity,
        shortDesc:  this.detailedForecastResponse.hourly.data[i].summary,
        iconString: this.detailedForecastResponse.hourly.data[i].icon,
        windSpeed:  this.detailedForecastResponse.hourly.data[i].windSpeed,
      });
    }

  }

  getTime(date: Date) {
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    if(hours.length == 1)   hours   = "0" + hours;
    if(minutes.length == 1) minutes = "0" + minutes;
  
    return hours + ':' + minutes;
  }


  navigateHome() {
    this.navigationService.routeHome();
  }
}
