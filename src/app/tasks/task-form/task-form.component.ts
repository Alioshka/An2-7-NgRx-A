import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState } from './../../+store';
import { TasksState } from './../../+store/state';
import * as TasksActions from './../../+store/actions/tasks.actions';

import { Subscription } from 'rxjs/Subscription';

import { Task } from './../../models/task';
import { TaskPromiseService } from './../services/task-promise.service';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task: Task;
  tasksState$: Store<TasksState>;

  private sub: Subscription;

  constructor(
    private taskPromiseService: TaskPromiseService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.task = new Task(null, '', null, null);

    this.tasksState$ = this.store.select('tasks');
    this.sub = this.tasksState$.subscribe(tasksState =>
      this.task = tasksState.selectedTask);

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

    const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
