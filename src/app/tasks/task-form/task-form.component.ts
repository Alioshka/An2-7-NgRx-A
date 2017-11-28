import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import { State } from './../../+state/state/main-state';
import { AddTask, GetTask, UpdateTask } from './../../+state/actions/tasks.actions';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { Task } from './../../models/task';
import { TaskArrayService } from './../services/task-array.service';
import { TaskPromiseService } from './../services/task-promise.service';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task: Task;
  tasksState$: Store<any>;

  private sub: Subscription;

  constructor(
    private taskArrayService: TaskArrayService,
    private taskPromiseService: TaskPromiseService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.task = new Task(null, '', null, null);

    this.tasksState$ = this.store.select('tasks');
    this.sub = this.tasksState$.subscribe(tasksState =>
      this.task = Object.assign({}, tasksState.tasks.data[tasksState.tasks.selected]));

    this.route.paramMap.subscribe( params => this.store.dispatch(new GetTask(params.get('id'))));
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

    // const method = task.id ? 'updateTask' : 'createTask';
    // this.taskPromiseService[method](task)
    //   .then(() => this.goBack());
    if (task.id) {
      this.store.dispatch(new UpdateTask(task));
    } else {
      this.store.dispatch(new AddTask(task));
    }

  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
