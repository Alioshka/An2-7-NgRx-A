import { TasksActionTypes, TasksActions } from './../actions';
import { TasksState, initialTasksState } from './../state/tasks.state';

import { Task } from './../../tasks/models/task.model';

export function tasksReducer(
  state = initialTasksState,
  action: TasksActions
): TasksState {
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

      const id = (<Task>action.payload).id;
      const data = state.data.map(task => {
        if (task.id === id) {
          return {...action.payload, done: true};
        }

        return task;
      });

      return {
        ...state,
        data
      };
    }

    default: {
      console.log('UNKNOWN_TASK action being handled!');
      return state;
    }
  }
}
