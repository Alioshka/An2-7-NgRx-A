import { TasksActionTypes, TasksActions } from './../actions';
import { TasksState, intitialTasksState } from './../state/tasks.state';

import { Task } from '../../models/task';

export function tasksReducer(
  state = intitialTasksState,
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

      const data = state.data.map(task => {
        if (task.id === (<Task>action.payload).id) {
          return {...action.payload, done: true};
        } else {
          return task;
        }
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
