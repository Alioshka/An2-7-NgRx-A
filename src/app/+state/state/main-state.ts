import { Task } from './../../models/task';

export interface State {
  tasks: Array<Task>;
}

export const intitialState: State = {
  tasks: []
};
