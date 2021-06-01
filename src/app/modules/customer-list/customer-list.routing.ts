import { Route } from '@angular/router';
import { CustomerListComponent } from './customer-list.component';
//import { CustomerListComponent } from 'app/modules/landing/home/home.component';

export const CustomerListRoutes: Route[] = [
    {
        path     : '',
        component: CustomerListComponent
    }
];