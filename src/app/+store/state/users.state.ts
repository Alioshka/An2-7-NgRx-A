import { User } from './../../models/user';

export interface UsersState {
  entities: Readonly<{ [id: number]: User }>;
  originalUser: Readonly<User>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const intitialUsersState: UsersState = {
  entities: {},
  originalUser: null,
  loading: false,
  loaded: false,
  error: null
};


