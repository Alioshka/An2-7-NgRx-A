import { TasksActionTypes, TasksActions } from './../actions/tasks.actions';
import { State, intitialState } from '../state/main-state';

import { Task } from './../../models/task';

export function tasksReducer( state = intitialState, action: TasksActions ): State {
  console.log(`Reducer: Action came in! ${action.type}`);

  switch (action.type) {
    /**
     * GET_TASKS, GET_TASKS_SUCCESS, GET_TASKS_ERROR
     */
    case TasksActionTypes.GET_TASKS: {
      console.log('GET_TASKS action being handled!');
      const tasks = [...state.tasks.data];
      const newState = Object.assign({}, state, {
        tasks: {
          data: tasks,
          selected: -1,
          error: null
        }
      });
      return newState;
    }

    case TasksActionTypes.GET_TASKS_SUCCESS: {
      console.log('GET_TASKS_SUCCESS action being handled!');
      const tasks = [...<Array<Task>>action.payload];
      const newState = Object.assign({}, state, {
        tasks: {
          data: tasks,
          selected: -1,
          error: null
        }
      });
      return newState;
    }

    case TasksActionTypes.GET_TASKS_ERROR: {
      console.log('GET_TASKS_ERROR action being handled!');
      const tasks = [...state.tasks.data];
      const newState = Object.assign({}, state, {
        tasks: {
          data: tasks,
          selected: -1,
          error: action.payload
        }
      });
      return newState;
    }

    /**
     * GET_TASK, GET_TASK_SUCCESS, GET_TASK_ERROR
     */
    case TasksActionTypes.GET_TASK: {
      console.log('GET_TASK action being handled!');

      const tasks = [...state.tasks.data];
      const newState = Object.assign({}, state, {
        tasks: {
          data: tasks,
          selected: -1,
          error: null
        }
      });
      return newState;
    }

    case TasksActionTypes.GET_TASK_SUCCESS: {
      console.log('GET_TASK_SUCCESS action being handled!');

      const task = { ...<Task>action.payload };
      const tasks = [...state.tasks.data];
      const index = tasks.findIndex(t => t.id === task.id);

      tasks[index] = task;

      const newState = Object.assign({}, state, {
        tasks: {
          data: tasks,
          selected: index,
          error: null
        }
      });
      return newState;
    }

    case TasksActionTypes.GET_TASK_ERROR: {
      console.log('GET_TASK_ERROR action being handled!');
      const tasks = [...state.tasks.data];
      const newState = Object.assign({}, state, {
        tasks: {
          data: tasks,
          selected: -1,
          error: action.payload
        }
      });
      return newState;
    }

    case TasksActionTypes.CREATE_TASK: {
      console.log('CREATE_TASK action being handled!');
      const tasks = [...state.tasks.data];
      const newState = Object.assign({}, state, {
        tasks: {
          data: tasks,
          selected: -1,
          error: null
        }
      });
      return newState;
    }

    case TasksActionTypes.CREATE_TASK_SUCCESS: {
      console.log('CREATE_TASK_SUCCESS action being handled!');
      const task = { ...<Task>action.payload };
      const tasks = [...state.tasks.data];

      tasks.push(task);

      const newState = Object.assign({}, state, {
        tasks: {
          data: tasks,
          selected: -1,
          error: null
        }
      });
      return newState;
    }

    case TasksActionTypes.CREATE_TASK_ERROR: {
      console.log('CREATE_TASK_ERROR action being handled!');
      const tasks = [...state.tasks.data];
      const newState = Object.assign({}, state, {
        tasks: {
          data: tasks,
          selected: -1,
          error: action.payload
        }
      });
      return newState;
    }

    case TasksActionTypes.UPDATE_TASK: {
      console.log('UPDATE_TASK action being handled!');
      const tasks = [...state.tasks.data];
      const newState = Object.assign({}, state, {
        tasks: {
          data: tasks,
          selected: -1,
          error: null
        }
      });
      return newState;
    }

    case TasksActionTypes.UPDATE_TASK_SUCCESS: {
      console.log('UPDATE_TASK_SUCCESS action being handled!');
      const task = { ...<Task>action.payload };
      const tasks = [...state.tasks.data];
      const index = tasks.findIndex(t => t.id === task.id);

      tasks[index] = task;

      const newState = Object.assign({}, state, {
        tasks: {
          data: tasks,
          selected: index,
          error: null
        }
      });
      return newState;
    }

    case TasksActionTypes.UPDATE_TASK_ERROR: {
      console.log('UPDATE_TASK_ERROR action being handled!');
      const tasks = [...state.tasks.data];
      const newState = Object.assign({}, state, {
        tasks: {
          data: tasks,
          selected: -1,
          error: action.payload
        }
      });
      return newState;
    }

    case TasksActionTypes.DELETE_TASK: {
      console.log('DELETE_TASK action being handled!');
      return Object.assign({}, state);
    }

    case TasksActionTypes.DONE_TASK: {
      console.log('DONE_TASK action being handled!');

      // формируем массив тасков
      // если таск совпадает с тем, который пришел в пейлоаде,
      // то изменим ему свойство done
      // остальные задачи оставляем без изменения
      const tasks = state.tasks.data.map(task => {
        if (task.id === (<Task>action.payload).id) {
          return Object.assign({}, action.payload, {done: true});
        } else {
          return task;
        }
      });

      const newState = Object.assign({}, state, {
        tasks: {
          data: tasks,
          seleced: -1,
          error: null
        }
      });
      return newState;
    }

    default: {
      console.log('UNKNOWN_TASK action being handled!');
      return state;
    }
  }
}
