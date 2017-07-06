import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import {TodoService} from './services/todo.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
