import { createSelector } from '@ngrx/store';
import { FilterState } from './filter.reducers';

const selectFilterFeature = (state: any): FilterState => state.filter;

const selectFilterValue = createSelector(
    selectFilterFeature,
    (state: FilterState) => state.filter
)
const selectFilterCriteria = createSelector(
    selectFilterFeature,
    (state: FilterState) => state.criteria
)

export const filterSelectors = {
    selectFilterFeature,
    selectFilterValue,
    selectFilterCriteria
}
