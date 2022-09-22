import { createAction, props } from '@ngrx/store';
import { Book } from 'src/app/models/book.models';

const setBooks = createAction(
    '[BookSelf] set fetched books',
    props<{payload: Book[]}>()
);

export const booksActions = {
    setBooks
}