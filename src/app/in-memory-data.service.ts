import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService{
  createDb(){
    const heroes = [
      { id: 12, firstName: 'Dr. Nice', lastName: 'Nice' },
    { id: 13, firstName: 'Bombasto', lastName: 'Nice' },
    { id: 14, firstName: 'Celeritas', lastName: 'Nice' },
    { id: 15, firstName: 'Magneta', lastName: 'Nice' },
    { id: 16, firstName: 'RubberMan', lastName: 'Nice' },
    { id: 17, firstName: 'Dynama', lastName: 'Nice' },
    { id: 18, firstName: 'Dr. IQ', lastName: 'Nice' },
    { id: 19, firstName: 'Magma', lastName: 'Nice' },
    { id: 20, firstName: 'Tornado', lastName: 'Nice' }
    ];

    return {heroes};
  }

  genId(heroes:Hero[]): number{
    return heroes.length > 0? Math.max(...heroes.map(hero => hero.id)) + 1: 11; 
  }
}
