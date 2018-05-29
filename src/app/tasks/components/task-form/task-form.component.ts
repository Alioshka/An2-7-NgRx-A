import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, TasksState } from './../../../core/+store';
import * as TasksActions from './../../../core/+store/tasks/tasks.actions';

// rxjs
import { Observable, Subscription } from 'rxjs';

import { Task } from './../../models/task.model';
import { TaskPromiseService } from './../../services';
import { AutoUnsubscribe } from '../../../core';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
@AutoUnsubscribe()
export class TaskFormComponent implements OnInit {
  task: Task;
  tasksState$: Observable<TasksState>;

  private sub: Subscription;

  constructor(
    private taskPromiseService: TaskPromiseService,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.task = new Task(null, '', null, null);

    this.tasksState$ = this.store.pipe(select('tasks'));
    this.sub = this.tasksState$.subscribe(tasksState =>
      this.task = tasksState.selectedTask);

    this.route.paramMap.subscribe(params => {
      const id = params.get('taskID');
      if (id) {
        this.store.dispatch(new TasksActions.GetTask(+id));
      }
    });

  }

  onSaveTask() {
    const task = { ...this.task };

    const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.goBack())
      .catch(err => console.log(err));
  }

  goBack(): void {
    this.location.back();
  }
}
