import { createReducer, on } from '@ngrx/store';
import { Book } from 'src/app/models/book.models';
import { booksActions } from './books.actions';

export interface BooksState {
    books: Book[];
}

const intialState: BooksState = {
    books: []
}

export const booksReducer = createReducer(
    intialState,
    on(booksActions.setBooks, (state, { payload }) => ({
        ...state,
        books: payload,
    }))
);