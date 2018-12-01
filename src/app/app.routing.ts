import {ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ListComponent} from './sections/forecasts/list/list.component';

const routes = [
    {
        path: '',
        component: ListComponent,
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
