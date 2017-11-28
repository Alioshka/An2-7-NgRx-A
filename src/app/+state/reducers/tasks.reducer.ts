import { TasksActionTypes, TasksActions } from './../actions/tasks.actions';
import { State, intitialState } from '../state/main-state';

export function tasksReducer( state = intitialState, action: TasksActions ): State {
  console.log(`Reducer: Action came in! ${action.type}`);

  switch (action.type) {
    case TasksActionTypes.GET_TASKS: {
      console.log('GET_TASKS action being handled!');
      return Object.assign({}, state);
    }

    case TasksActionTypes.CREATE_TASK: {
      console.log('CREATE_TASK action being handled!');
      return Object.assign({}, state);
    }

    case TasksActionTypes.UPDATE_TASK: {
      console.log('UPDATE_TASK action being handled!');
      return Object.assign({}, state);
    }

    case TasksActionTypes.DELETE_TASK: {
      console.log('DELETE_TASK action being handled!');
      return Object.assign({}, state);
    }

    default: {
      console.log('UNKNOWN_TASK action being handled!');
      return state;
    }
  }
}
