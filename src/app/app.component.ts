import {Component} from '@angular/core';

import {CSVRecord} from './CSVModel';

const COMMA = ',';
const SEPARATOR = '\n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public records: CSVRecord[] = [];

  uploadListener($event: any): void {
    const files = $event.srcElement.files;
    if (!this.isValidCSVFile(files[0])) {
      return;
    }
    const input = $event.target;
    const reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {
      const csvData = reader.result;
      const csvRecordsArray = (csvData as string).split(SEPARATOR);
      const headersRow = this.getHeaderArray(csvRecordsArray);
      this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
    };
  }

  public getDataRecordsArrayFromCSVFile(csvRecordsArray: string[], headerLength: number): any[] {
    const csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      const curruntRecord = (csvRecordsArray[i] as string).split(COMMA);
      if (curruntRecord.length === headerLength) {
        const csvRecord: CSVRecord = new CSVRecord();
        csvRecord.firstName = curruntRecord[0].trim();
        csvRecord.surName = curruntRecord[1].trim();
        csvRecord.issueCount = curruntRecord[2].trim();
        csvRecord.dateOfBirth = curruntRecord[3].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  public isValidCSVFile(file: any): boolean {
    return file.name.endsWith('.csv');
  }

  public getHeaderArray(csvRecordsArr: string[]): string[] {
    const headers = (csvRecordsArr[0] as string).split(COMMA);
    const headerArray = [];
    headers.forEach((ele: string) => {
      headerArray.push(ele);
    });
    return headerArray;
  }
}
