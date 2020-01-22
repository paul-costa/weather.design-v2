import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { SingleDayComponent } from './single-day/single-day.component';
import { MultipleDaysComponent } from './multiple-days/multiple-days.component';
import { AppRoutingModule } from './app-routing.module';
import { GetWeatherDataService } from './get-weather-data.service';
import { ForecastDayComponent } from './forecast-day/forecast-day.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleDayComponent,
    MultipleDaysComponent,
    ForecastDayComponent,
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatSliderModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,

  ],
  providers: [GetWeatherDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
