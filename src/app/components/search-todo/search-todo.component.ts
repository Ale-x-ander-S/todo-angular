import {Component, HostListener, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Todo} from "../../interfaces/todo.interface";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-search-todo',
  templateUrl: './search-todo.component.html',
  styleUrls: ['./search-todo.component.scss']
})

export class SearchTodoComponent implements OnDestroy {

  public todos!: Todo[]
  public searchStr!: string;
  public modal: boolean = false
  public selectedTodo!: Todo

  private subTodos = new Subscription()

  constructor(private apiService: ApiService) {
  }

  search(): void {
    this.subTodos = this.apiService.entities$.subscribe(todos => {
      this.todos = todos.filter(todo => todo.title.toLocaleLowerCase().includes(this.searchStr.toLowerCase()))
    })
  }

  getTodo(todo: Todo): void {
    this.selectedTodo = todo
    this.modal = true
    this.searchStr = ''
  }

  @HostListener('document:click', ['$event'])
  hostClick(event: Event) {
    if (event) {
      this.searchStr = ''
    }
  }

  ngOnDestroy() {
    this.subTodos.unsubscribe()
  }
}
