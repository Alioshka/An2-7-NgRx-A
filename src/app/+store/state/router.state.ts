import { Params, RouterStateSnapshot } from '@angular/router';

// @NgRx
import { ActionReducerMap } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { RouterStateSerializer } from '@ngrx/router-store/src/serializer';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
    fragment: string;
}

export interface RouterState {
    router: RouterReducerState<RouterStateUrl>;
}

export const routerReducers: ActionReducerMap<RouterState> = {
    router: routerReducer
};

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        const { url } = routerState;
        const { queryParams } = routerState.root;

        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
            state = state.firstChild;
        }
        const { params, fragment } = state;

        return { url, queryParams, params, fragment };
    }
}
