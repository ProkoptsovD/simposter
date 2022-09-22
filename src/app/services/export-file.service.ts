import { Injectable } from '@angular/core';
import { utils, writeFile } from "xlsx";

export interface TransformDataConfig {
  reverse?: boolean,
  hide?: string[],
}

@Injectable({
  providedIn: 'root'
})
export class ExportFileService {

  constructor() {}

  convert(arr: any[], fileName?: string ) {
    const workSheet = utils.json_to_sheet(arr);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet);
    writeFile(workBook, fileName ?? "books.xlsx");
  }

  transformData(arrData: any[], { hide, reverse }: TransformDataConfig) {
    let data = [...arrData];

    if(reverse) {
      data = data.reverse();
    }
    if(hide instanceof Array && hide.length) {
      data = data.map(el => {
        let formated: any = {};

        for(const key in el) {
          if(!hide.includes(key)) {
            formated[key] = el[key]
          }
        }

        return formated;
      })
    }

    return data
  }
}
