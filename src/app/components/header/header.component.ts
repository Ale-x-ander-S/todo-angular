import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Todo} from "../../interfaces/todo.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  search: string = ''
  todos: Todo[] = []

  subTodos = new Subscription()

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.subTodos = this.apiService.entities$.subscribe(todos => {
      this.todos = todos
    })
  }

  ngOnDestroy() {
    this.subTodos.unsubscribe()
  }
}
