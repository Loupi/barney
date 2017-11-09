import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent, SearchComponent }  from './components/index';
import { CoveoSearchService, LoggerService, LOG_LEVEL } from './services/index';
import { NewlineToBreakPipe, KeysPipe } from './pipes/index'
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        NgxPaginationModule,
        //SuiModule
    ],
    declarations: [
        AppComponent,
        SearchComponent,
        NewlineToBreakPipe,
        KeysPipe
    ],
    providers: [
        CoveoSearchService,
        LoggerService,
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private log: LoggerService) {
        this.log.logLevel = LOG_LEVEL.ALL;
    }
}
