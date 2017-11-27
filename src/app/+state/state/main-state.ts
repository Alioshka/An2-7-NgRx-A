import { Task } from './../../models/task';

interface TasksState {
  data: Array<Task>;
}

export interface State {
  tasks: TasksState;
}

export const intitialState: State = {
  tasks: {
    data: [
      new Task(1, 'Estimate', 1, 8, 8, true),
      new Task(2, 'Create', 2, 8, 4, false),
      new Task(3, 'Deploy', 3, 8, 0, false)
    ]
  }
};
