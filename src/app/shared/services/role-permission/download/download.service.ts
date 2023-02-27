import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  convertToCSV(dataList: any[]) {
    const data = dataList;
    const headers = Object.keys(data[0]);
    let csv = headers.join(',') + '\n';

    csv += data
      .map((row: any) => {
        return headers
          .map((fieldName) => {
            return row[fieldName];
          })
          .join(',');
      })
      .join('\n');

    return csv;
  }

  downloadCSV(csv: string, fileName: string) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
