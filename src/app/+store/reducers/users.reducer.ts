import * as fromUsers from './../actions/users.actions';
import { UsersActionTypes } from './../actions/users.actions';
import { intitialUsersState, UsersState } from './../state/users.state';

import { User } from './../../models/user';

export function usersReducer (
    state = intitialUsersState,
    action: fromUsers.UsersActions
): UsersState {
    console.log(`Reducer: Action came in! ${action.type}`);

    switch (action.type) {

      case UsersActionTypes.GET_USERS:
      case UsersActionTypes.GET_USER: {
        return {
          ...state,
          loading: true
        };
      }

      case UsersActionTypes.GET_USERS_SUCCESS: {
        const users = <User[]>action.payload;
        console.log(users);

        // transform array to object
        // TODO: move it to utility functions
        const entities = users.reduce(
            (result: {[id: number]: User}, user: User) => {
                return {
                    ...result,
                    [user.id]: user
                };
            },
            {
                ...state.entities
            }
        );

        return {
          ...state,
          loading: false,
          loaded: true,
          entities
        };
      }

      case UsersActionTypes.GET_USER_SUCCESS: {
        // const selectedTask = { ...<Task>action.payload };
        return {
          ...state,
          loading: false,
          loaded: true
        };
      }

      case UsersActionTypes.GET_USERS_ERROR:
      case UsersActionTypes.GET_USER_ERROR: {
        const error = action.payload;

        return {
          ...state,
          loading: false,
          loaded: false,
          error
        };
      }

      case UsersActionTypes.CREATE_USER:
      case UsersActionTypes.UPDATE_USER:
      case UsersActionTypes.DELETE_USER: {
        return {
          ...state
        };
      }

      case UsersActionTypes.CREATE_USER_SUCCESS:
      case UsersActionTypes.UPDATE_USER_SUCCESS: {
        const user = <User>action.payload;
        const entities = {
          ...state.entities,
          [user.id]: user
        };
        const originalUser = {...<User>action.payload};

        return {
          ...state,
          entities,
          originalUser
        };
      }

      case UsersActionTypes.DELETE_USER_SUCCESS: {
        const user = <User>action.payload;
        const { [user.id]: removed, ...entities} = state.entities;

        return {
          ...state,
          entities
        };
      }

      case UsersActionTypes.CREATE_USER_ERROR:
      case UsersActionTypes.UPDATE_USER_ERROR:
      case UsersActionTypes.DELETE_USER_ERROR: {
        const error = action.payload;
        return {
          ...state,
          error
        };
      }

      default: {
        console.log('UNKNOWN_USER action being handled!');
        return state;
      }
    }
  }
