import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  form!: FormGroup
  modal: boolean = false
  nowDate = Date.now()

  subPostTodo = new Subscription()

  @Output() modalWindow = new EventEmitter<boolean>()

  constructor(public apiService: ApiService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      id: new FormControl()
    })
  }

  createTodo() {
    this.form.controls['id'].setValue(this.generatedId())
    this.subPostTodo = this.apiService.postTodo(this.form.value)
    this.form.reset()
    this.modal = false
  }

  submit() {
    this.createTodo()
  }

  showModal() {
    this.modal = true
  }

  hideModal() {
    this.modal = false
  }

  ngOnDestroy() {
    this.subPostTodo.unsubscribe()
  }

  generatedId() {
    return Math.random()
  }
}
