import { Task } from './../../models/task';

export interface TasksState {
  data: ReadonlyArray<Task>;
}

export const initialTasksState: TasksState = {
  data: [
    new Task(1, 'Estimate', 1, 8, 8, true),
    new Task(2, 'Create', 2, 8, 4, false),
    new Task(3, 'Deploy', 3, 8, 0, false)
  ]
};
