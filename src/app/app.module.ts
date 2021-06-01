import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AnalyticsComponent } from './modules/dashboards/analytics/analytics.component';
import { ProjectComponent } from './modules/dashboards/project/project.component';
import { CustomerListComponent } from './modules/customer-list/customer-list.component';
import {  MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon';
const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy       : PreloadAllModules,
    relativeLinkResolution   : 'legacy'
};

@NgModule({
    declarations: [
        AppComponent,
        AnalyticsComponent,
        ProjectComponent,
        CustomerListComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse & Fuse Mock API
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),
        MatSnackBarModule,
        MatTableModule,
        MatIconModule,
        
        // Core
        CoreModule,

        // Layout
        LayoutModule,

        // 3rd party modules
        MarkdownModule.forRoot({})

    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
