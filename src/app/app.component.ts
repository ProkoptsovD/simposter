import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from './models/book.models';
import { ExportFileService } from './services/export-file.service';
import { booksSelectors } from './store/books/books.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title: string = 'simposter-test-assessment';
  public books!: Book[];

  constructor(
    private store: Store,
    public exportFileService: ExportFileService
  ) {}

  ngOnInit() {
    this.store.select(booksSelectors.selectAllBooks).subscribe(books => this.books = books);
  }

  download() {
    const formated = this.exportFileService.transformData(this.books, { hide: ['id', 'excerpt'] })
    this.exportFileService.convert(formated, 'books.xlsx')
  }
}
