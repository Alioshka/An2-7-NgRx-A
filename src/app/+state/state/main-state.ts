import { Task } from './../../models/task';

interface TasksState {
  data: Array<Task>;
  selected: number;
  error: string;
}

export interface State {
  tasks: TasksState;
}

export const intitialState: State = {
  tasks: {
    data: [],
    selected: -1,
    error: null
  }
};
