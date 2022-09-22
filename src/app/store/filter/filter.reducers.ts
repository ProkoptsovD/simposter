import { createReducer, on } from '@ngrx/store';
import { SearchBy } from 'src/app/enums/searchBy.enum';
import { filterActions } from './filter.actions';

export interface FilterState {
    filter: string,
    criteria: string
}

const intialState: FilterState = {
    filter: '',
    criteria: SearchBy.byTitle
}

export const filterReducer = createReducer(
    intialState,
    on(filterActions.setFilter, (state, { payload }) => ({
        ...state,
        filter: payload.filter,
        criteria: payload.criteria
    }))
);