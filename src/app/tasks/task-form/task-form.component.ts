import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState } from './../../+store';
import { TasksState } from './../../+store/state';
import * as TasksActions from './../../+store/actions/tasks.actions';

import { Subscription } from 'rxjs/Subscription';

import { Task } from './../../models/task';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task: Task;
  tasksState$: Store<TasksState>;

  private sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.tasksState$ = this.store.select('tasks');
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
        this.store.dispatch(new TasksActions.GetTask(id));
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  saveTask() {
    const task = new Task(
      this.task.id,
      this.task.action,
      this.task.priority,
      this.task.estHours
    );

    if (task.id) {
      this.store.dispatch(new TasksActions.UpdateTask(task));
    } else {
      this.store.dispatch(new TasksActions.CreateTask(task));
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
