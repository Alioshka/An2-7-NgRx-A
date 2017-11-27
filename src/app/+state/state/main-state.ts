import { Task } from './../../models/task';

interface TasksState {
  data: Array<Task>;
  error: string;
}

export interface State {
  tasks: TasksState;
}

export const intitialState: State = {
  tasks: {
    data: [],
    error: null
  }
};
