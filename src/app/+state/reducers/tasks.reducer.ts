import { TasksActionTypes, TasksActions } from './../actions/tasks.actions';
import { TasksState, intitialState } from '../state/tasks.state';

import { Task } from './../../models/task';

export function reducer( state = intitialState, action: TasksActions ): TasksState {
  console.log(`Reducer: Action came in! ${action.type}`);

  switch (action.type) {

    case TasksActionTypes.GET_TASKS: {
      console.log('GET_TASKS action being handled!');
      const tasks = [...state.data];
      const newState = Object.assign({}, state, {
          data: tasks,
          selected: -1,
          error: null
      });
      return newState;
    }

    case TasksActionTypes.GET_TASKS_SUCCESS: {
      console.log('GET_TASKS_SUCCESS action being handled!');
      const tasks = [...<Array<Task>>action.payload];
      const newState = Object.assign({}, state, {
          data: tasks,
          selected: -1,
          error: null
      });
      return newState;
    }

    case TasksActionTypes.GET_TASKS_ERROR: {
      console.log('GET_TASKS_ERROR action being handled!');
      return Object.assign({}, state, { error: action.payload });
    }

    case TasksActionTypes.GET_TASK: {
      console.log('GET_TASK action being handled!');
      const tasks = [...state.data];
      const newState = Object.assign({}, state, {
          data: tasks,
          selected: -1,
          error: null
      });
      return newState;
    }

    case TasksActionTypes.GET_TASK_SUCCESS: {
      console.log('GET_TASK_SUCCESS action being handled!');

      const task = { ...<Task>action.payload };
      const tasks = [...state.data];
      const index = tasks.findIndex(t => t.id === task.id);

      tasks[index] = task;

      const newState = Object.assign({}, state, {
          data: tasks,
          selected: index,
          error: null
      });
      return newState;
    }

    case TasksActionTypes.GET_TASK_ERROR: {
      console.log('GET_TASK_ERROR action being handled!');
      return Object.assign({}, state, { error: action.payload });
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

      const newState = Object.assign({}, state, {
          data: tasks,
          seleced: -1,
          error: null
      });
      return newState;
    }

    default: {
      console.log('UNKNOWN_TASK action being handled!');
      return state;
    }
  }
}