import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState, TasksState, getTasksState } from './../../+store';
import * as TasksActions from './../../+store/actions/tasks.actions';

// rxjs
import { Subscription } from 'rxjs/Subscription';

import { Task } from './../models/task.model';
import { AutoUnsubscribe } from '../../core';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
@AutoUnsubscribe()
export class TaskFormComponent implements OnInit {
  task: Task;
  tasksState$: Store<TasksState>;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.tasksState$ = this.store.select(getTasksState);
    this.sub = this.tasksState$.subscribe(tasksState => {
      if (tasksState.selectedTask) {
        this.task = tasksState.selectedTask;
      } else {
        this.task = new Task(null, '', null, null);
      }
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(new TasksActions.GetTask(+id));
      }
    });
  }

  saveTask() {
    const task = {...this.task};

    if (task.id) {
      this.store.dispatch(new TasksActions.UpdateTask(task));
    } else {
      this.store.dispatch(new TasksActions.CreateTask(task));
    }
  }

  goBack(): void {
    this.location.back();
  }
}
