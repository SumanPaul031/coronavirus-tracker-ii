import { Component, OnInit, ViewChild, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';
import { Chart } from 'chart.js';
import { CountUpOptions, CountUp } from 'countup.js';
import { map } from 'rxjs/operators';
import { DateWiseData } from 'src/app/models/datewise-data';
import { merge } from 'rxjs';

declare function geoplugin_countryCode(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  country_list = [
    { name: 'US', code: 'US' },
    { name: 'Spain', code: 'ES' },
    { name: 'Italy', code: 'IT' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Iran', code: 'IR' },
    { name: 'Russia', code: 'RU' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Canada', code: 'CA' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Portugal', code: 'PT' },
    { name: 'India', code: 'IN' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Austria', code: 'AT' },
    { name: 'Peru', code: 'PE' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Japan', code: 'JP' },
    { name: 'S. Korea', code: 'KR' },
    { name: 'Chile', code: 'CL' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Poland', code: 'PL' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Romania', code: 'RO' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Norway', code: 'NO' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'Czechia', code: 'CZ' },
    { name: 'Australia', code: 'AU' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Serbia', code: 'RS' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Panama', code: 'PA' },
    { name: 'Finland', code: 'FI' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'Egypt', code: 'EG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'Moldova', code: 'MD' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Greece', code: 'GR' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Iceland', code: 'IS' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Oman', code: 'OM' },
    { name: 'North Macedonia', code: 'MK' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Andorra', code: 'AD' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Costa Rica', code: 'CR' },
    { name: 'Niger', code: 'NE' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Albania', code: 'AL' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Honduras', code: 'HN' },
    { name: 'San Marino', code: 'SM' },
    { name: 'Malta', code: 'MT' },
    { name: 'Taiwan', code: 'TW' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Montenegro', code: 'ME' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Vietnam', code: 'VN' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Mali', code: 'ML' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Tanzania', code: 'TZ' },
    { name: 'Guadeloupe', code: 'GP' },
    { name: 'Rwanda', code: 'RW' },
    { name: 'Congo (Kinshasa)', code: 'CG' },
    { name: 'Brunei', code: 'BN' },
    { name: 'Somalia', code: 'SO' },
    { name: 'Gibraltar', code: 'GI' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Trinidad and Tobago', code: 'TT' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Aruba', code: 'AW' },
    { name: 'French Guiana', code: 'GF' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Bermuda', code: 'BM' },
    { name: 'Togo', code: 'TG' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Cabo Verde', code: 'CV' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Libya', code: 'LY' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Syria', code: 'SY' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Chad', code: 'TD' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Sierra Leone', code: 'SL' },
    { name: 'Zimbabwe', code: 'ZW' },
    { name: 'Angola', code: 'AO' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Eswatini', code: 'SZ' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Timor-Leste', code: 'TL' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Saint Lucia', code: 'LC' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Saint Kitts and Nevis', code: 'KN' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Saint Vincent and the Grenadines', code: 'VC' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Suriname', code: 'SR' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Sao Tome and Principe', code: 'ST' },
    { name: 'South Sudan', code: 'SD' },
    { name: 'Yemen', code: 'YE' },
    { name: 'China', code: 'CN' }
  ];

  country_list1 = []

  num_ul_lists = 3;
  hideToggle: boolean = true;
  loading: boolean = true;
  displayCountry;
  totalCountryCases;
  totalCountryRecovered;
  totalCountryDeaths;
  selectedCountry;

  newCountryCases;
  newCountryRecovered;
  newCountryDeaths;

  my_chart;

  app_data = [];
  cases_list = [];
  recovered_list = [];
  deaths_list = [];
  dates = [];
  formatedDates = [];

  country_code;
  user_country;

  casesData;
  recoveredData;
  deathsData;

  @ViewChild('countryList') country_list_element: ElementRef;
  @ViewChild('countryFilter') countryFilter: ElementRef;

  constructor(private renderer: Renderer2, private dataSvc: GetDataService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.createCountryList();

    // this.country_code = geoplugin_countryCode();
    // this.country_list.forEach(country => {
    //   if(country.code == this.country_code){
    //     this.user_country = country.name;
    //   }
    // });

    merge(
      this.dataSvc.getCasesData().pipe(map(result1 => {
        this.casesData = result1;
      })), this.dataSvc.getRecoveredData().pipe(map(result2 => {
        this.recoveredData = result2;
      })), this.dataSvc.getDeathsData().pipe(map(result3 => {
        this.deathsData = result3;
      }))
    ).subscribe({
      complete: () => {
        Object.keys(this.casesData).forEach(country => {
          if(country == "\"Korea, South\""){
            this.country_list1.push({name: "S. Korea", code: "S. Korea"});
          } else{
            this.country_list1.push({name: country, code: country});
          }
        });
        this.fetchData('India');
      }
    });
  }

  updateUI(){
    this.updateStats();
    this.axesLinearChart();
  }

  updateStats(){
    this.loading = false;
    this.displayCountry = this.selectedCountry;
    this.totalCountryCases = this.cases_list[this.cases_list.length - 1];
    this.totalCountryRecovered = this.recovered_list[this.recovered_list.length - 1];
    this.totalCountryDeaths = this.deaths_list[this.deaths_list.length - 1];

    this.newCountryCases = this.totalCountryCases - this.cases_list[this.cases_list.length - 2];
    if(this.newCountryCases < 0){
      this.newCountryCases = 0;
    }
    this.newCountryRecovered = this.totalCountryRecovered - this.recovered_list[this.recovered_list.length - 2];
    if(this.newCountryRecovered < 0){
      this.newCountryRecovered = 0;
    }
    this.newCountryDeaths = this.totalCountryDeaths - this.deaths_list[this.deaths_list.length - 2];
    if(this.newCountryDeaths < 0){
      this.newCountryDeaths = 0;
    }

    let totalCases = new CountUp("totalCases", this.totalCountryCases);
    let newCases = new CountUp("newCases", this.newCountryCases);

    let totalRecovered = new CountUp("totalRecovered", this.totalCountryRecovered);
    let newRecovered = new CountUp("newRecovered", this.newCountryRecovered);

    let totalDeaths = new CountUp("totalDeaths", this.totalCountryDeaths);
    let newDeaths = new CountUp("newDeaths", this.newCountryDeaths);

    totalCases.start();
    newCases.start();

    totalRecovered.start();
    newRecovered.start();

    totalDeaths.start();
    newDeaths.start();
  }

  axesLinearChart(){
    if(this.my_chart){
      this.my_chart.destroy();
    }
    
    this.my_chart = new Chart('canvas', {
      type: 'line',
      data: {
          datasets: [{
              label: 'Cases',
              data: this.cases_list,
              fill: false,
              borderColor: '#fff',
              backgroundColor: '#fff',
              borderWidth: 1
          },{
            label: 'Recovered',
            data: this.recovered_list,
            fill: false,
            borderColor: '#009688',
            backgroundColor: '#009688',
            borderWidth: 1
          },{
            label: 'Deaths',
            data: this.deaths_list,
            fill: false,
            borderColor: '#f44336',
            backgroundColor: '#f44336',
            borderWidth: 1
          }],
          labels: this.formatedDates
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  createCountryList(){
    const num_countries = this.country_list.length;

    let i = 0, ul_list_id;

    this.country_list.forEach((country, index) => {
      const ul: HTMLUListElement = this.renderer.createElement('ul');
      if(index % Math.ceil(num_countries/this.num_ul_lists) == 0){
        ul_list_id = `list${i}`;
        this.renderer.setProperty(ul, 'id', ul_list_id);
        this.renderer.appendChild(this.country_list_element.nativeElement, ul);
        i++;
      }

      const li: HTMLLIElement = this.renderer.createElement('li');
      this.renderer.setProperty(li, 'id', country.name);
      li.innerHTML = country.name;
      document.getElementById(`${ul_list_id}`).appendChild(li);
      this.renderer.listen(li, 'click', (evt) => {this.fetchData(country.name)});
    })
  }

  fetchData(country){
    if(country == "S. Korea"){
      country = "\"Korea, South\""
    } else if(country == "Taiwan"){
      country = "Taiwan*";
    }
    this.countryFilter.nativeElement.value = "";
    this.hideToggle = true;
    console.log(country);    

    this.app_data = [];
    this.cases_list = [];
    this.recovered_list = [];
    this.deaths_list = [];
    this.formatedDates = [];
    this.loading = true;

    this.selectedCountry = country;

    let selectedCasesCountry = this.casesData[country];
    let selectedRecoveredCountry = this.recoveredData[country];
    let selectedDeathsCountry = this.deathsData[country];

    selectedCasesCountry.forEach(cs => {
      this.cases_list.push(cs.cases);
      this.formatedDates.push(this.formatDate(cs.date));
    });

    selectedRecoveredCountry.forEach(cs => {
      this.recovered_list.push(cs.recovered);
    });

    selectedDeathsCountry.forEach(cs => {
      this.deaths_list.push(cs.deaths);
    });

    this.updateUI();
    this.resetCountryList();
  }

  HideOrDisplay(){
    this.countryFilter.nativeElement.value = "";
    this.hideToggle = !this.hideToggle;
    this.resetCountryList();
  }

  CloseSearch(){
    this.countryFilter.nativeElement.value = "";
    this.hideToggle = true;
    this.resetCountryList();
  }

  CountryFilter(value){
    this.country_list.forEach(country => {
      if(country.name.toUpperCase().startsWith(value.toUpperCase())){
        this.renderer.removeClass(document.getElementById(country.name), "hide");
      } else{
        this.renderer.addClass(document.getElementById(country.name), "hide");
      }
    });
  }

  resetCountryList(){
    this.country_list.forEach(country => {
      this.renderer.removeClass(document.getElementById(country.name), "hide");
    });
  }

  monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  formatDate(dateString){
    let date = new Date(dateString);
  
    return `${date.getDate()} ${this.monthsNames[date.getMonth()]}`;
  }

}
