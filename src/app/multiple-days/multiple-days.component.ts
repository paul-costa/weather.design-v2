import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { GetWeatherDataService } from '../get-weather-data.service';
import { Subscription } from 'rxjs';
import { ForecastData } from '../shared/types';


interface ForecastDisplayData {
  date: Date,
  dateString: string,
  temperatureHigh: number,
  icon: string,
  temperatureLow: number,
}


@Component({
  selector: 'app-multiple-days',
  templateUrl: './multiple-days.component.html',
  styleUrls: ['./multiple-days.component.css']
})
export class MultipleDaysComponent implements OnInit, OnDestroy {
  public applicatonProcessing=false;
  public backgroundUrl;

  private processingSub: Subscription;
  private forecastResponse: ForecastData;
  public forecastDisplayData: ForecastDisplayData[] = [];
  

  constructor(
    private navigationService: NavigationService,
    private weatherService: GetWeatherDataService, ) { }



  ngOnInit() {
    if(this.navigationService.getBackground()==undefined) {
      this.navigationService.routeHome();
    }
    else {
      this.applicatonProcessing=true;
      this.backgroundUrl=this.navigationService.getBackground();
  
      this.weatherService.getForecastWeather();
    }

    
  
    // Subscription
    this.processingSub=this.weatherService.forecastReq.subscribe(weatherRes => {
      this.forecastResponse=weatherRes;
      this.getForecast();
      this.applicatonProcessing=false;
    });


    this.navigationService.openSnackBar('click on day for detailed forecast');
  }

  ngOnDestroy() {
    this.processingSub.unsubscribe();
  }


  getForecast() {
    for(let i=0; i<6; i++) {
      this.forecastDisplayData[i] = {
        date:             this.forecastResponse.daily.data[i].time,
        dateString:       this.getDayString(this.forecastResponse.daily.data[i].time),
        temperatureHigh:  Math.floor(this.forecastResponse.daily.data[i].temperatureHigh),
        icon:             'url(../../../../assets/weatherIcons/'+this.forecastResponse.daily.data[i].icon + '.svg',
        temperatureLow:   Math.floor(this.forecastResponse.daily.data[i].temperatureLow),
      };
    }
  }


  panEvent($event) {
    this.navigationService.handlePanEvent(
      $event.direction,
      null,
      null
      )
  }



  getDayString(date: Date) {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    let localDate = new Date(+date*1000);

    let day = days[localDate.getDay()];
    let dateNum = (localDate.getDate()).toString();
    let dateAffix = '';
    let dateSuffix = 'th';

    //affix 
    if(dateNum.length==1) dateAffix='0';

    //suffix
    if(dateNum.substring(dateNum.length-1,dateNum.length) == '1')  dateSuffix='st';
    if(dateNum.substring(dateNum.length-1,dateNum.length) == '2')  dateSuffix='nd';
    if(dateNum.substring(dateNum.length-1,dateNum.length) == '3')  dateSuffix='rd';

    return day + ' - ' + dateAffix+ dateNum + dateSuffix;
  }


  openDetailedForecast(time: Date) {
    this.navigationService.setBackground(null, null, this.backgroundUrl);
    this.navigationService.routeDetailedForecast(+time);
  }

}
