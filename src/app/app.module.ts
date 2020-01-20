import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';

import { AppComponent } from './app.component';
import { SingleDayComponent } from './single-day/single-day.component';
import { MultipleDaysComponent } from './multiple-days/multiple-days.component';
import { AppRoutingModule } from './app-routing.module';
import { GetWeatherDataService } from './get-weather-data.service';

@NgModule({
  declarations: [
    AppComponent,
    SingleDayComponent,
    MultipleDaysComponent,
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatSliderModule,

  ],
  providers: [GetWeatherDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
