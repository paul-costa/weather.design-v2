import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleDayComponent } from './single-day/single-day.component';
import { MultipleDaysComponent } from './multiple-days/multiple-days.component';
import { ForecastDayComponent } from './forecast-day/forecast-day.component';

const routes: Routes = [
    {
        path: '',
        component: SingleDayComponent,
    },
    {
        path: 'forecast',
        component: MultipleDaysComponent,
    },
    {
        path: 'forecast/:time',
        component: ForecastDayComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule {

}