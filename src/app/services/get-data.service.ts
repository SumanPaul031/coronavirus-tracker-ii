import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  fetchData(user_country){
    return fetch(`https://covid19-monitor-pro.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=${user_country}`, {
		  "method": "GET",
		  "headers": {
			  "x-rapidapi-host": "covid19-monitor-pro.p.rapidapi.com",
			  "x-rapidapi-key": "7e269ec140msh8a5df9cfc21b4b4p1c1e3ejsn9aba26afc6e0"
		  }
	  }).then(response => {
      return response.json();
    });
  }

  // getCurrentCountry(){
  //   this.http.get('https://ipinfo.io/').subscribe(data => {
  //     console.log(data);
  //   })
  // }
}
