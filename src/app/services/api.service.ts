import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Subscription} from "rxjs";
import {environment} from "../../environments/environment";
import {Todo} from "../interfaces/todo.interface";

const API_URL = environment.apiUrl

@Injectable({providedIn: "root"})

export class ApiService {

  todos: Todo[] = []
  entities$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([])
  errorMessage: string = ''
  errorStatus: string = ''

  constructor(private http: HttpClient) {
  }

  getTodos(): Subscription {
    return this.http.get<Todo[]>(API_URL).pipe(
      catchError(err=> {
        this.errorMessage = err.message
        this.errorStatus = err.status
        return []
      })
    )
      .subscribe(todos => {
        if (todos) {
          this.todos = Object.values(todos)
        }
        this.entities$.next(this.todos)
    })
  }

  postTodo(todo: Todo): Subscription {
    return this.http.post<Todo>(API_URL, todo).pipe(
      catchError(err=> {
        this.errorMessage = err.message
        this.errorStatus = err.status
        return []
      })
    ).subscribe(todo => {
      this.getTodos()
      this.todos.push(todo)
      this.entities$.next(this.todos)
    })
  }

  deleteTodo(id: number): Subscription {
    return this.http.delete<Todo>(API_URL).pipe(
      catchError(err=> {
        this.errorMessage = err.message
        this.errorStatus = err.status
        return []
      })
    ).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id)
      this.entities$.next(this.todos)
    })
  }
}
