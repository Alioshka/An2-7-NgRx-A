import { TasksActionTypes, TasksActions } from './../actions/tasks.actions';
import { State, intitialState } from '../state/main-state';

export function tasksReducer( state = intitialState, action: TasksActions ): State {
  console.log(`Action came in! ${action.type}`);

  switch (action.type) {
    case TasksActionTypes.GET_TASKS: {
      console.log('GET_TASKS action being handled!');
      return Object.assign({}, state);
    }

    case TasksActionTypes.ADD_TASK: {
      console.log('ADD_TASK action being handled!');
      return Object.assign({}, state);
    }

    case TasksActionTypes.EDIT_TASK: {
      console.log('EDIT_TASK action being handled!');
      return Object.assign({}, state);
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
        if (task.id === action.payload.id) {
          return Object.assign({}, action.payload, {done: true});
        } else {
          return task;
        }
      });

      return Object.assign({}, state, { tasks: {data: tasks}});
    }

    default: {
      console.log('UNKNOWN_TASK action being handled!');
      return state;
    }
  }
}
