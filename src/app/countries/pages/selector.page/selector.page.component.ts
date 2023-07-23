import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { filter, map, switchMap, tap } from 'rxjs';

@Component({
  templateUrl: './selector.page.component.html',
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion : SmallCountry[] =[];
  public borders : SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required]
  })
  constructor(
    private countriesService: CountriesService,
    private fb: FormBuilder){}
  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }


  get regions(): Region[]{
    return this.countriesService.regions;
  }
  onRegionChanged(): void{
    this.myForm.get('region')!.valueChanges
    .pipe(
      tap(()=> this.myForm.get('country')!.setValue('')),
      tap(() => this.borders =[]),
      switchMap( region =>this.countriesService.getCountriesByRegion(region))
    )
    .subscribe(countries =>{
      this.countriesByRegion = countries;
    });
  }

  onCountryChanged(): void{
    this.myForm.get('country')!.valueChanges
    .pipe(
      tap(()=> this.myForm.get('borders')!.setValue('')),
      filter((value: string) => value.length > 0 ),
      switchMap( (alphaCode) =>this.countriesService.getCountryByAlphaCode(alphaCode)),
      switchMap( (country)=> this.countriesService.getCountryBordersByCodes(country.borders))
    )
    .subscribe(countries =>{
      //console.log({borders: country.borders})
      this.borders = countries;
    });
  }

}

