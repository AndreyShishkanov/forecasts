import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';
import {CardComponent} from './card/card.component';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: ':id', component: CardComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
