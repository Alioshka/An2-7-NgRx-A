import { TasksActionTypes, TasksActions } from './../actions/tasks.actions';
import { TasksState, intitialState } from '../state/tasks.state';

import { Task } from '../../models/task';

export function reducer( state = intitialState, action: TasksActions ): TasksState {
  console.log(`Reducer: Action came in! ${action.type}`);

  switch (action.type) {
    case TasksActionTypes.GET_TASKS: {
      console.log('GET_TASKS action being handled!');
      return {...state};
    }

    case TasksActionTypes.CREATE_TASK: {
      console.log('CREATE_TASK action being handled!');
      return {...state};
    }

    case TasksActionTypes.UPDATE_TASK: {
      console.log('UPDATE_TASK action being handled!');
      return {...state};
    }

    case TasksActionTypes.DELETE_TASK: {
      console.log('DELETE_TASK action being handled!');
      return {...state};
    }

    case TasksActionTypes.DONE_TASK: {
      console.log('DONE_TASK action being handled!');

      const tasks = state.data.map(task => {
        if (task.id === (<Task>action.payload).id) {
          return {...action.payload, ...{done: true}};
        } else {
          return task;
        }
      });
      const newState = {...state, ...{data: tasks}};
      return newState;
    }

    default: {
      console.log('UNKNOWN_TASK action being handled!');
      return state;
    }
  }
}
