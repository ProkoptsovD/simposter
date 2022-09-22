import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Store } from '@ngrx/store';
import { map, Subject, takeUntil } from 'rxjs';
import { SearchBy } from 'src/app/enums/searchBy.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { filterActions } from 'src/app/store/filter/filter.actions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private notifier$ = new Subject<void>();

  public searchBy = SearchBy;
  public searchForm = this.fb.group({
    search: '',
    searchBy: this.fb.group({
      criteria: this.searchBy.byTitle
    })
  });

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        takeUntil(this.notifier$),
        map(({ search, searchBy }) => ({
          filter: (search as string),
          criteria: (searchBy?.criteria as string) })),
      )
      .subscribe(payload => this.store.dispatch(filterActions.setFilter({ payload })))
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }
}
