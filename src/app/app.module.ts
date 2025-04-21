import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TransactionComponent } from './transaction/transaction.component';
import { StocksComponent } from './stocks/stocks.component';
import { FiltersComponent } from './filters/filters.component';
import { FormsModule } from '@angular/forms';
import { DashComponent } from './dash/dash.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    NavbarComponent,
    TransactionComponent,
    StocksComponent,
    FiltersComponent,
    DashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
