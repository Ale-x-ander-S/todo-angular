import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from "../../interfaces/todo.interface";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() selectedTodo!: Todo
  @Output() close = new EventEmitter<boolean>()

}


