import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {TodoItemComponent} from './components/todo-item/todo-item.component';
import {SearchTodoComponent} from './components/search-todo/search-todo.component';
import {ModalComponent} from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoListComponent,
    TodoItemComponent,
    SearchTodoComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
