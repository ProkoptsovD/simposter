import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { SearchBy } from 'src/app/enums/searchBy.enum';
import { SortOrder } from 'src/app/enums/sortOrder.enum';
import { Book } from 'src/app/models/book.models';
import { SortByPipe } from 'src/app/pipes/sort-by.pipe';
import { BooksService } from 'src/app/services/books.service';
import { NotificationService } from 'src/app/services/notification.service';
import { booksActions } from 'src/app/store/books/books.actions';
import { booksSelectors } from 'src/app/store/books/books.selectors';
import { filterSelectors } from 'src/app/store/filter/filter.selectors';

@Component({
  selector: 'app-books-shelf',
  templateUrl: './books-shelf.component.html',
  styleUrls: ['./books-shelf.component.css']
})
export class BooksShelfComponent implements OnInit, OnDestroy {

  public notifier$ = new Subject<void>();
  
  public bookList$: Observable<Book[]> = this.store.select(booksSelectors.selectAllBooks);
  public filter$ = this.store.select(filterSelectors.selectFilterValue);
  public criteria$ = this.store.select(filterSelectors.selectFilterCriteria);

  public sortOrder = SortOrder;

  private observer = {
    next: (books: Book[]) => this.store.dispatch(booksActions.setBooks({ payload: books })),
    error: () => this.notificationService.setError('Something went wrong...')
  }

  constructor(
    private booksService: BooksService,
    private sortByPipe: SortByPipe,
    private store: Store,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.booksService?.getAllBooks().pipe(takeUntil(this.notifier$)).subscribe(this.observer);

    this.bookList$ = combineLatest(
      [this.bookList$, this.filter$, this.criteria$]
    ).pipe(
        takeUntil(this.notifier$),
        map(([books, filter, criteria]) => ({
          filter,
          books: (books as Book[]),
          filteredBooks: (books as Book[])
            .filter(({ title, description }) => {
                let propToSearchIn = '';

                switch(criteria) {
                  case SearchBy.byTitle:
                    propToSearchIn = title;
                    break;
                  case SearchBy.byDescription:
                    propToSearchIn = description;
                    break;
                  default: throw new Error('Unsupported search by criteria')
                }

                return propToSearchIn.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
              }
            )
        })),
        map(({ books, filteredBooks, filter }) => filter ? filteredBooks : books)
      )
  }
  ngOnDestroy() {
    this.notifier$.next();
    this.notifier$.complete();
  }

  sort(property: string, order: string){
    this.bookList$ = this.bookList$.pipe(
      map(books => this.sortByPipe.transform(books, property, order))
    )
  }
}
