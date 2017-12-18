import { User } from './../../models/user';

export interface UsersState {
  entities: { [id: number]: User };
  loading: boolean;
  loaded: boolean;
  error: Error | string;
}

export const intitialUsersState: UsersState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null
};


