import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Todo} from "../../interfaces/todo.interface";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit, OnDestroy {

  todos$!: Observable<Todo[]>
  modal: boolean = false
  selectedTodo!: Todo

  subGetTodos = new Subscription()

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.subGetTodos = this.apiService.getTodos()
    this.todos$ = this.apiService.entities$
  }

  removeTodo(todo: Todo) {
    this.apiService.deleteTodo(todo.id)
  }

  showTodo(todo: Todo) {
    this.selectedTodo = todo
    this.modal = true
  }

  ngOnDestroy() {
    this.subGetTodos.unsubscribe()
  }
}
