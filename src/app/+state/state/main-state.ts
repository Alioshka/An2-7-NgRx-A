import { Task } from './../../models/task';

export interface State {
  tasks: Array<Task>;
  pending: boolean;
  error: any;
}

export const intitialState: State = {
  tasks: [],
  pending: false,
  error: null
};
