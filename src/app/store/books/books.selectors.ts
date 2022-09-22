import { createSelector } from '@ngrx/store';
import { BooksState } from './books.reducers';

const selectBooksFeature = (state: any): BooksState => state.books;

const selectAllBooks = createSelector(
    selectBooksFeature,
    (state: BooksState) => state.books
)

export const booksSelectors = {
    selectBooksFeature,
    selectAllBooks
}
