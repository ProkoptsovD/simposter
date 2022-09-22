import { createAction, props } from '@ngrx/store';
import { Filter } from './filter.models';

const setFilter = createAction(
    '[SearchBar] set filter',
    props<{payload: Filter}>()
);

export const filterActions = {
    setFilter
}