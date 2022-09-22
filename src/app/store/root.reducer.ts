import { booksReducer } from "./books/books.reducers";
import { filterReducer } from "./filter/filter.reducers";

export const rootReducer = {
    filter: filterReducer,
    books: booksReducer
}