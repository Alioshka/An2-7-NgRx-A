import { User } from './../../models/user';

export interface UsersState {
  entities: { [id: number]: User };
  originalUser: User;
  loading: boolean;
  loaded: boolean;
  error: Error | string;
}

export const intitialUsersState: UsersState = {
  entities: {},
  originalUser: null,
  loading: false,
  loaded: false,
  error: null
};


