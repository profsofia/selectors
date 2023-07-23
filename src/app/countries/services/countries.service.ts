import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interface';
import { Observable, combineLatest, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions: Region[]=[
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania
  ];

  constructor(private http: HttpClient) { }

  private baseUrl: string = 'https://restcountries.com/v3.1';


  get regions(): Region[]{
    return [...this._regions];
  }

  getCountriesByRegion(region: Region): Observable<any>{
    if(!region){
      return of([]);
    }
    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;


    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.map(
        country =>({
          name: country.name.common,
          cca3: country.cca3,
          // ?? este es un operador de fusión nula
          //Este operador se utiliza para evaluar y devolver el primer operando si no es null ni undefined, y en caso contrario, devuelve el segundo operando.
          //En otras palabras, si el primer operando tiene un valor definido (no es null ni undefined), entonces el operador de fusión nula devuelve ese valor. Si el primer operando es null o undefined, entonces devuelve el segundo operando.
          borders: country.borders ?? []
        })
      )),
    )
  }


  getCountryByAlphaCode(alphaCode : string): Observable<SmallCountry>{

    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url)
    .pipe(
      map(country =>({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))
    )


  }

  getCountryBordersByCodes(borders : string[]): Observable<SmallCountry[]>{
    if(!borders || borders.length === 0) return of([]);

    const countryRequest : Observable<SmallCountry>[]=[];

    borders.forEach(code => {
      const request = this.getCountryByAlphaCode(code);
      countryRequest.push(request);
    });
    return combineLatest(countryRequest);
  }

}
