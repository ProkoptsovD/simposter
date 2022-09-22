import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartOptions, ChartService } from 'src/app/services/chart.service';
import { booksSelectors } from 'src/app/store/books/books.selectors';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  public chartOptions: Partial<ChartOptions> = this.chartService.getChartOptions();

  constructor(
    private store: Store,
    private chartService: ChartService
  ) {
    this.store.select(booksSelectors.selectAllBooks).subscribe(
      (books) => {
        const occurances = this.chartService.countOccurances(books);
        this.chartOptions = this.chartService
            .setXAxis({ categories: Object.keys(occurances).map(date => +date), title: { text: 'Publishing years' }})
            .setSeries([{ name: 'Books published', data: Object.values(occurances) }])
            .setChartTitle({ text: 'Amount of books by publish date' })
            .getChartOptions();
      }
    )
  }

  ngOnInit(): void {}
}
