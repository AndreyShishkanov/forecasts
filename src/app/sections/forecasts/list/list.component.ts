import { Component, OnInit } from '@angular/core';
import { City } from '@classes/City';
import { ForecastsService } from '../forecasts.service';
import { Forecast } from '@classes/Forecast';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
    
    cities: City[] = [
        {name: 'Moscow', id: 524901, country: 'RU'},
        {name: 'Amsterdam', id: 2759794, country: 'NL'},
        {name: 'Berlin', id: 2950158, country: 'DE'},
        {name: 'Dubai', id: 292223, country: 'AE'},
        {name: 'London', id: 2643743, country: 'GB'},
        {name: 'Yakutsk', id: 2013159, country: 'RU'},
    ];
    
    forecasts: Forecast[] = [];
    
    constructor(private forecastsService: ForecastsService) {
        this.forecastsService.getForecasts(this.cities).subscribe(forecasts => {
            this.forecasts = forecasts;
        });
    }
    
    ngOnInit() {
    
    }
}
