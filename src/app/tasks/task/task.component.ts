import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from './../../models/task';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task;
  @Output() onComplete = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<Task>();
  @Output() onEdit = new EventEmitter<Task>();

  completeTask(): void {
    this.onComplete.emit(this.task);
  }

  deleteTask() {
    this.onDelete.emit(this.task);
  }

  editTask() {
    this.onEdit.emit(this.task);
  }
}
