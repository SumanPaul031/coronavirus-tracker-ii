import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DateWiseData } from '../models/datewise-data';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  private casesDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;
  private recoveredDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv`;
  private deathsDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv`;

  constructor(private http: HttpClient) { }

  getCasesData(){    
    return this.http.get(this.casesDataUrl, { responseType: 'text' }).pipe(
      map(result => {
        let rows = result.split('\n');
        let mainData = {};
        let header = rows[0];
        let dates = header.split(/,(?=\S)/);
        dates.splice(0, 4);
        rows.splice(0, 1);
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          let country = cols[1];
          cols.splice(0,4);
          mainData[country] = [];
          cols.forEach((val, index) => {
            let dw: DateWiseData = {
              cases: +val,
              country: country,
              date: new Date(Date.parse(dates[index]))
            };
            mainData[country].push(dw);
          })
        });
        return mainData;
      })
    );
  }

  getRecoveredData(){    
    return this.http.get(this.recoveredDataUrl, { responseType: 'text' }).pipe(
      map(result => {
        let rows = result.split('\n');
        let mainData = {};
        let header = rows[0];
        let dates = header.split(/,(?=\S)/);
        dates.splice(0, 4);
        rows.splice(0, 1);
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          let country = cols[1];
          cols.splice(0,4);
          mainData[country] = [];
          cols.forEach((val, index) => {
            let dw: DateWiseData = {
              recovered: +val,
              country: country,
              date: new Date(Date.parse(dates[index]))
            };
            mainData[country].push(dw);
          })
        });
        return mainData;
      })
    );
  }

  getDeathsData(){    
    return this.http.get(this.deathsDataUrl, { responseType: 'text' }).pipe(
      map(result => {
        let rows = result.split('\n');
        let mainData = {};
        let header = rows[0];
        let dates = header.split(/,(?=\S)/);
        dates.splice(0, 4);
        rows.splice(0, 1);
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          let country = cols[1];
          cols.splice(0,4);
          mainData[country] = [];
          cols.forEach((val, index) => {
            let dw: DateWiseData = {
              deaths: +val,
              country: country,
              date: new Date(Date.parse(dates[index]))
            };
            mainData[country].push(dw);
          })
        });
        return mainData;
      })
    );
  }
}
