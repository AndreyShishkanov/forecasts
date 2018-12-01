import { Component, OnInit } from '@angular/core';
import {ForecastsService} from '../forecasts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Forecast} from '@classes/Forecast';
import {City} from '@classes/City';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {
    
    forecasts: Forecast[];
    city: City;
    
    constructor(private router: Router, private route: ActivatedRoute, public forecastsService: ForecastsService) {
        const id = this.route.snapshot.paramMap.get('id');
    
        this.forecastsService.getForecastById(Number(id)).subscribe(response => {
            this.city = response.city;
            this.forecasts = response.list;
        });
    }
    
    ngOnInit() {
    }
    
    returnBack() {
        this.router.navigate(['..']);
    }
}
