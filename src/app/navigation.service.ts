import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
    private directionCounter = 0;

    private backgroundUrl: string;
    
    constructor(
        private router: Router,
        private _snackBar: MatSnackBar) {}

    handlePanEvent(swipeDirection: number, iconString: string, backgroundRandNumber: number) {
        switch (swipeDirection) {
            case 2:
                this.directionCounter++;
                break;

            case 4:
                this.directionCounter--;
                break;

            default:
                break;
        }

        if(this.directionCounter > 5) {
            this.directionCounter=0;

            this.setBackground(iconString, backgroundRandNumber, null);
            this.router.navigate(['/forecast']);    
        }
        else if(this.directionCounter < -5) {
            this.directionCounter=0;

            this.router.navigate(['/']);
        }
    }
    

    setBackground(iconString: string, backgroundRandNumber: number, fullUrl: string) {
        
        if(iconString == null && backgroundRandNumber == null) {    // call from home
            this.backgroundUrl=fullUrl;
        }
        else if (fullUrl == null) { // call from detail forecast
            this.backgroundUrl='url(../../../../assets/backgrounds/' +  iconString + '/' + backgroundRandNumber + '.jpg';
        }
        
    }

    getBackground() {
        return this.backgroundUrl;
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, 'Got it', {duration: 3000, panelClass: ['dark-snackbar']});
    }

    routeHome() {
        this.router.navigate(['/']);
    }

    routeDetailedForecast(time: number) {
        this.router.navigate([`/forecast/${time}`]);
    }
}