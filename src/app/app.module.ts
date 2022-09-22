import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from "ng-apexcharts";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BooksShelfComponent } from './components/books-shelf/books-shelf.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { ContainerComponent } from './components/container/container.component';
import { BooksService } from './services/books.service';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ErrorComponent } from './components/error/error.component';
import { NotificationService } from './services/notification.service';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store/root.reducer';
import { SortByPipe } from './pipes/sort-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BooksShelfComponent,
    StatisticComponent,
    ContainerComponent,
    SearchBarComponent,
    ErrorComponent,
    SortByPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    StoreModule.forRoot(rootReducer)
  ],
  providers: [BooksService, NotificationService, SortByPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
