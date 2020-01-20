import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleDayComponent } from './single-day/single-day.component';
import { MultipleDaysComponent } from './multiple-days/multiple-days.component';

const routes: Routes = [
    {
        path: '',
        component: SingleDayComponent,
    },
    {
        path: 'forecast',
        component: MultipleDaysComponent,
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