import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { ForecastsService } from './forecasts.service';
import { routing } from './forecasts.routing';
import { ChartComponent } from './card/chart/chart.component';

@NgModule({
    declarations: [ListComponent, CardComponent, ChartComponent],
    imports: [
        CommonModule,
        routing
    ],
    providers: [ForecastsService]
})
export class ForecastsModule { }
