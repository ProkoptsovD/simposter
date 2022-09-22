import { Injectable } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexYAxis
} from "ng-apexcharts";
import { Book } from '../models/book.models';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  yaxis: ApexYAxis
};

export interface CountedOccurances {
  [key: string]: number
};

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Chart series name',
          data: []
        }
      ],
      chart: {
        height: 350,
        type: 'bar' 
      },
      title: {
        text: 'Chart title'
      },
      xaxis: {
        categories: [],
        title: {
          text: 'x-axis'
        }
      },
      yaxis: {
        title: {
          text: 'y-axis'
        }
      }
    };
  }

  setSeries(series: ApexAxisChartSeries) {
    this.chartOptions.series = series;

    return this;
  }
  setChartTitle(title: ApexTitleSubtitle) {
    this.chartOptions.title = title;

    return this;
  }
  setChart(chart: ApexChart) {
    this.chartOptions.chart = chart;

    return this;
  }

  setXAxis(data: ApexXAxis) {
    this.chartOptions.xaxis = data;

    return this;
  }
  setYAxis(data: ApexYAxis) {
    this.chartOptions.yaxis = data;

    return this;
  }
  countOccurances(arr: Book[]) {
    if(arr instanceof Array<Book>) {
      return arr.reduce((acc, book) => {
        const key = new Date(book.publishDate).getFullYear();

        return ({
          ...acc,
          [key]: acc[key] ? acc[key] + 1 : 1
        })
      }, {} as CountedOccurances)
    }

    return {}
  }
  getChartOptions() {
    return this.chartOptions;
  }
}
