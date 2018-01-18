import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState, TasksState } from './../../+store';
import * as TasksActions from './../../+store/actions/tasks.actions';

// rxjs
import { Subscription } from 'rxjs/Subscription';
import { switchMap } from 'rxjs/operators';

import { Task } from './../models/task.model';
import { TaskArrayService, TaskPromiseService } from './../services';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task;
  tasksState$: Store<TasksState>;

  private sub: Subscription;

  constructor(
    private taskPromiseService: TaskPromiseService,
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.task = new Task(null, '', null, null);

  //   this.tasksState$ = this.store.select('tasks');
  //   this.sub = this.tasksState$.subscribe(tasksState =>
  //     this.task = tasksState.selectedTask);

  //   this.route.paramMap.subscribe(params => {
  //     const id = params.get('id');
  //     if (id) {
  //       this.store.dispatch(new TasksActions.GetTask(+id));
  //     }
  //   });

  // }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

    this.route.paramMap
      .pipe(
        switchMap((params: Params) => {
          return params.get('id')
          ? this.taskPromiseService.getTask(+params.get('id'))
          : Promise.resolve(null);
        })
      )
      .subscribe(
        task => this.task = {...task},
        err => console.log(err)
    );
  }

  saveTask() {
    const task = {...this.task};

    const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
