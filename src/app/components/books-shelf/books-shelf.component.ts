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

const mock: Book[] = [
  {
    description : "Bed erat est amet elitr duis at. Dolore ipsum kasd nam voluptua te at et volutpat dolore diam luptatum ipsum ea takimata sed amet. Gubergren ea lorem. Et ipsum sanctus vel. Elitr vel tation sit tempor. Elit aliquam ipsum diam sed gubergren aliquam clita est dolore sed erat gubergren. Rebum et sea consetetur et ipsum nonumy et nibh invidunt odio amet zzril. Ea ipsum gubergren dolore erat invidunt et.",
    excerpt: "Nisl elitr gubergren molestie vero amet gubergren feugait et. Sit at clita eum feugiat imperdiet sed euismod nihil sit et aliquam quis feugiat sit diam sanctus nobis. Eu sea odio erat dolore velit volutpat nostrud lorem. Labore et sea sit lorem duis kasd. Et rebum tempor diam dolore consetetur magna ipsum eirmod eu amet invidunt delenit. No dolor magna eirmod consequat nonumy et ipsum amet et eros at facilisis erat ut laoreet. Sed nonumy clita dolor justo liber dolor dolor clita dolor vel aliquip lorem dolor duis invidunt et. Voluptua zzril dolore ipsum eos et vel labore ipsum commodo invidunt wisi ut. Dolore te dolore sit ipsum at lobortis enim erat elitr ut minim aliquam et. Liber ipsum magna eirmod facilisi dolor eos at tation dolores clita luptatum sanctus ipsum duo amet dolor. Labore duo stet at feugiat luptatum luptatum tempor nonummy dolore sed duo elitr stet et. Luptatum lobortis magna diam nostrud dolor voluptua ipsum kasd veniam vulputate tempor lorem clita dolor magna labore no. Ut clita eum amet et sanctus ut consequat clita et hendrerit at ipsum. Stet invidunt rebum rebum in augue dolore sadipscing voluptua rebum dolor kasd takimata tation qui in.\nLuptatum duis magna magna ut est ut. Elitr justo tincidunt. Tempor velit facilisi kasd tempor takimata aliquyam dolores et sit. No ut dolore ipsum clita ipsum stet dolore nonummy accumsan sed elitr accusam dolore feugiat. No velit volutpat dignissim vel ipsum elitr dolore dolore tempor dolor accusam amet clita facilisis sit et elitr in. Lorem vulputate amet et erat diam dolor consetetur no eos est no ut ut. Sed dolores consetetur. Eos vero accusam duo vel volutpat sadipscing dignissim delenit kasd dolore. Erat amet justo dolor et clita id takimata nulla possim ipsum accusam. Dolore lorem consequat eirmod elitr lorem nulla iriure qui praesent soluta dolore accusam sit clita consequat praesent. Nihil voluptua gubergren voluptua stet invidunt sed amet elit vulputate vulputate aliquyam dolor. Illum dignissim stet et at enim odio dolores accusam voluptua quis sit dolores et. Kasd takimata accusam gubergren eirmod amet consetetur labore takimata accumsan dolor clita elitr zzril est no. Amet eirmod lorem dolor facilisi ipsum sadipscing lorem. Nibh sanctus labore sit amet ipsum.\nVero ex et et aliquyam commodo velit et vero. Ea accusam dolore ipsum wisi ea invidunt sit vel dolores dolor. Et diam gubergren elitr est. Nonumy facer eirmod. Vel ut facilisis eos. Lobortis invidunt vulputate sadipscing qui duo dolor. Erat duo nonummy nostrud lorem augue. Lorem consetetur facer dolor erat possim sadipscing et. Amet diam luptatum velit accusam lorem sanctus te elitr elitr amet kasd et mazim. Assum autem et magna eos iriure commodo diam elitr et eirmod elitr dolore at. Et amet rebum. Hendrerit nibh blandit est no no clita et dolores tation dolore in. Ut aliquyam stet et eos kasd. Diam stet accusam eos. Labore kasd eos ut ipsum dignissim est autem at amet labore et. In eos elit sed magna sit eu eos nonumy et ipsum. Clita dolore labore lorem vel est sanctus dolore luptatum at dolor hendrerit ipsum invidunt dolor tempor amet.\nErat sadipscing kasd diam eirmod invidunt justo. Et clita et consetetur nonumy et nostrud tempor tempor accusam volutpat ipsum augue quis consetetur vero consequat. Elitr veniam amet option ipsum feugiat clita eirmod sadipscing dolor ut invidunt veniam clita et et. Gubergren dolore no no ea lobortis amet ea et duis erat sanctus luptatum wisi ipsum magna erat. Nonumy consetetur hendrerit sed ut dolore sit kasd sed ut sit euismod aliquip nonumy. Nonummy voluptua sed et sit sanctus takimata iriure duis dolore magna no dolore. Praesent et est vel ipsum exerci est veniam. Kasd vel in exerci sit autem stet delenit elitr dolor in eos facilisi sed nibh eum possim et ea. Erat placerat iriure dolor justo suscipit ipsum dolor. Justo stet iriure stet. Et eirmod sea. Accumsan dolor invidunt esse diam veniam nonumy suscipit at takimata consetetur nonumy dolor feugiat at. Clita lorem nonumy.\nHendrerit enim et dolore et ut clita sadipscing molestie kasd sanctus ipsum voluptua. Aliquip justo in sit magna rebum eu autem amet. Amet et blandit dolores eirmod sea eum lorem aliquip. Dolor aliquip et kasd. Sed ipsum clita eirmod eum assum invidunt et sit eos sanctus justo invidunt. Clita sea sadipscing justo stet vulputate consequat dolores ipsum est delenit vel sanctus accusam erat iriure lorem ipsum dolore. Diam nostrud et iriure duis et rebum magna et sadipscing eu nonumy veniam sed in et lorem et et. Rebum vero aliquam vulputate mazim eirmod diam duis rebum takimata vero at tempor ut duo magna sanctus dolores in. At nonumy sit voluptua aliquam facilisis accusam ea magna sed diam vel elitr kasd. Amet diam nonummy lorem amet et ea duo gubergren justo gubergren dolor voluptua vero justo autem. Consetetur et sit quod eos sadipscing ipsum dolores kasd eu duo. Et takimata amet voluptua ipsum molestie sed tation no eirmod gubergren gubergren eirmod et sea dolor vero augue. Kasd minim ipsum lorem. Et exerci facilisis. Vero tempor nonumy molestie dolor stet at eum.",
    id: 1,
    pageCount: 300,
    publishDate: new Date("2022-09-20T17:03:09.126907+00:00"),
    title: "Book 1"
  },
  {
    description : "Aed erat est amet elitr duis at. Dolore ipsum kasd nam voluptua te at et volutpat dolore diam luptatum ipsum ea takimata sed amet. Gubergren ea lorem. Et ipsum sanctus vel. Elitr vel tation sit tempor. Elit aliquam ipsum diam sed gubergren aliquam clita est dolore sed erat gubergren. Rebum et sea consetetur et ipsum nonumy et nibh invidunt odio amet zzril. Ea ipsum gubergren dolore erat invidunt et.",
    excerpt: "Nisl elitr gubergren molestie vero amet gubergren feugait et. Sit at clita eum feugiat imperdiet sed euismod nihil sit et aliquam quis feugiat sit diam sanctus nobis. Eu sea odio erat dolore velit volutpat nostrud lorem. Labore et sea sit lorem duis kasd. Et rebum tempor diam dolore consetetur magna ipsum eirmod eu amet invidunt delenit. No dolor magna eirmod consequat nonumy et ipsum amet et eros at facilisis erat ut laoreet. Sed nonumy clita dolor justo liber dolor dolor clita dolor vel aliquip lorem dolor duis invidunt et. Voluptua zzril dolore ipsum eos et vel labore ipsum commodo invidunt wisi ut. Dolore te dolore sit ipsum at lobortis enim erat elitr ut minim aliquam et. Liber ipsum magna eirmod facilisi dolor eos at tation dolores clita luptatum sanctus ipsum duo amet dolor. Labore duo stet at feugiat luptatum luptatum tempor nonummy dolore sed duo elitr stet et. Luptatum lobortis magna diam nostrud dolor voluptua ipsum kasd veniam vulputate tempor lorem clita dolor magna labore no. Ut clita eum amet et sanctus ut consequat clita et hendrerit at ipsum. Stet invidunt rebum rebum in augue dolore sadipscing voluptua rebum dolor kasd takimata tation qui in.\nLuptatum duis magna magna ut est ut. Elitr justo tincidunt. Tempor velit facilisi kasd tempor takimata aliquyam dolores et sit. No ut dolore ipsum clita ipsum stet dolore nonummy accumsan sed elitr accusam dolore feugiat. No velit volutpat dignissim vel ipsum elitr dolore dolore tempor dolor accusam amet clita facilisis sit et elitr in. Lorem vulputate amet et erat diam dolor consetetur no eos est no ut ut. Sed dolores consetetur. Eos vero accusam duo vel volutpat sadipscing dignissim delenit kasd dolore. Erat amet justo dolor et clita id takimata nulla possim ipsum accusam. Dolore lorem consequat eirmod elitr lorem nulla iriure qui praesent soluta dolore accusam sit clita consequat praesent. Nihil voluptua gubergren voluptua stet invidunt sed amet elit vulputate vulputate aliquyam dolor. Illum dignissim stet et at enim odio dolores accusam voluptua quis sit dolores et. Kasd takimata accusam gubergren eirmod amet consetetur labore takimata accumsan dolor clita elitr zzril est no. Amet eirmod lorem dolor facilisi ipsum sadipscing lorem. Nibh sanctus labore sit amet ipsum.\nVero ex et et aliquyam commodo velit et vero. Ea accusam dolore ipsum wisi ea invidunt sit vel dolores dolor. Et diam gubergren elitr est. Nonumy facer eirmod. Vel ut facilisis eos. Lobortis invidunt vulputate sadipscing qui duo dolor. Erat duo nonummy nostrud lorem augue. Lorem consetetur facer dolor erat possim sadipscing et. Amet diam luptatum velit accusam lorem sanctus te elitr elitr amet kasd et mazim. Assum autem et magna eos iriure commodo diam elitr et eirmod elitr dolore at. Et amet rebum. Hendrerit nibh blandit est no no clita et dolores tation dolore in. Ut aliquyam stet et eos kasd. Diam stet accusam eos. Labore kasd eos ut ipsum dignissim est autem at amet labore et. In eos elit sed magna sit eu eos nonumy et ipsum. Clita dolore labore lorem vel est sanctus dolore luptatum at dolor hendrerit ipsum invidunt dolor tempor amet.\nErat sadipscing kasd diam eirmod invidunt justo. Et clita et consetetur nonumy et nostrud tempor tempor accusam volutpat ipsum augue quis consetetur vero consequat. Elitr veniam amet option ipsum feugiat clita eirmod sadipscing dolor ut invidunt veniam clita et et. Gubergren dolore no no ea lobortis amet ea et duis erat sanctus luptatum wisi ipsum magna erat. Nonumy consetetur hendrerit sed ut dolore sit kasd sed ut sit euismod aliquip nonumy. Nonummy voluptua sed et sit sanctus takimata iriure duis dolore magna no dolore. Praesent et est vel ipsum exerci est veniam. Kasd vel in exerci sit autem stet delenit elitr dolor in eos facilisi sed nibh eum possim et ea. Erat placerat iriure dolor justo suscipit ipsum dolor. Justo stet iriure stet. Et eirmod sea. Accumsan dolor invidunt esse diam veniam nonumy suscipit at takimata consetetur nonumy dolor feugiat at. Clita lorem nonumy.\nHendrerit enim et dolore et ut clita sadipscing molestie kasd sanctus ipsum voluptua. Aliquip justo in sit magna rebum eu autem amet. Amet et blandit dolores eirmod sea eum lorem aliquip. Dolor aliquip et kasd. Sed ipsum clita eirmod eum assum invidunt et sit eos sanctus justo invidunt. Clita sea sadipscing justo stet vulputate consequat dolores ipsum est delenit vel sanctus accusam erat iriure lorem ipsum dolore. Diam nostrud et iriure duis et rebum magna et sadipscing eu nonumy veniam sed in et lorem et et. Rebum vero aliquam vulputate mazim eirmod diam duis rebum takimata vero at tempor ut duo magna sanctus dolores in. At nonumy sit voluptua aliquam facilisis accusam ea magna sed diam vel elitr kasd. Amet diam nonummy lorem amet et ea duo gubergren justo gubergren dolor voluptua vero justo autem. Consetetur et sit quod eos sadipscing ipsum dolores kasd eu duo. Et takimata amet voluptua ipsum molestie sed tation no eirmod gubergren gubergren eirmod et sea dolor vero augue. Kasd minim ipsum lorem. Et exerci facilisis. Vero tempor nonumy molestie dolor stet at eum.",
    id: 2,
    pageCount: 100,
    publishDate: new Date("2021-09-20T17:03:09.126907+00:00"),
    title: "Book 2"
  }
]

@Component({
  selector: 'app-books-shelf',
  templateUrl: './books-shelf.component.html',
  styleUrls: ['./books-shelf.component.css']
})
export class BooksShelfComponent implements OnInit, OnDestroy {

  public notifier$ = new Subject<void>();
  
  public bookList$: Observable<Book[]> = this.store.select(booksSelectors.selectAllBooks);
  // public books$: Observable<Book[]> = this.booksService?.getAllBooks();
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
    // new Observable<Book[]>((subscriber) => subscriber.next(mock)).subscribe((books) => this.store.dispatch(booksActions.setBooks({ payload: books })))
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
