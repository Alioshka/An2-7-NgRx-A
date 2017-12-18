import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UsersState } from './../state';
import { User } from './../../models/user';
import { getRouterState } from './../../+store/selectors/router.selectors';

const getEntities = (state: UsersState) => state.entities;
const getLoaded = (state: UsersState) => state.loaded;
const getLoading = (state: UsersState) => state.loading;
const getError = (state: UsersState) => state.error;

export const getUsersState = createFeatureSelector<UsersState>('users');

const getUsersEntitites = createSelector(getUsersState, getEntities);
export const getUsersLoaded = createSelector(getUsersState, getLoaded);
export const getUsersLoading = createSelector(getUsersState, getLoading);
export const getUsersError = createSelector(getUsersState, getError);

/**
 * transform object to array
 */
export const getUsers = createSelector(getUsersEntitites, entities => {
    return Object.keys(entities).map(id => entities[+id]);
});

export const getEditedUser = createSelector(
    getUsersEntitites,
    getRouterState,
    (users, router): User => {
        if (router.state.params.id) {
            return users[router.state.params.id];
        } else {
            return null;
        }
});

export const getSelectedUserByUrl = createSelector(
    getUsersEntitites,
    getRouterState,
    (users, router): User => {
        if (router.state.params.id) {
            return users[router.state.params.id];
        } else {
            return null;
        }
});
