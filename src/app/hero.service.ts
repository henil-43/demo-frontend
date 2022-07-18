import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable,of } from 'rxjs'
import { MesagesService } from './mesages.service';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient, private messagingService: MesagesService) { }
  
  private log(message: string){
    this.messagingService.add(`HeroService: ${message}`);
  }

  private heroesUrl = '/api/heroes';

  getHeroes(): Observable<Hero[]>{
    // const heroes = of(HEROES)
    // this.messagingService.add("HeroService: fetched resources")
    
    
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  //http options required
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
    .pipe(tap((newHero: Hero) => this.log(`added hero with id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero')));
  }

  getHero(id: number):Observable<Hero>{
    // const hero = HEROES.find(h => h.id === id)!;
    // this.messagingService.add(`HeroService: fetched hero id=${id}`)
    
    const url = `${this.heroesUrl}/${id}`;
    
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  //http options required
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(tap(_ => this.log(`updated hero id = ${hero.id}`)),
    catchError(this.handleError<any>('updateHero')))
  }
  private handleError<T>(operation = 'operation', result?:T){
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  deleteHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete<Hero>(url, this.httpOptions)
    .pipe(tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero')))  
  }

  searchHeroes(term: String): Observable<Hero[]>{
    if(!term.trim()){
      return of([])
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?firstName=${term}`)
    .pipe(tap(x => x.length?this.log(`Found heroes matching ${term}`):this.log(`no heroes matching ${term}`)),
    catchError(this.handleError<Hero []>('searchHero',[]))
    );
  }


}
