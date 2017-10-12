import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
  private heroesUrl = 'http://localhost:8080/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getHeroes(): Promise<Hero[]> {
    // return Promise.resolve(HEROES);

    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json() as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    // return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
    return this.http.get(`${this.heroesUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    return this.http.put(this.heroesUrl, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }

  create(name: String): Promise<Hero> {
    return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.heroesUrl}/${id}`)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred while getting list of heroes', error);
    return Promise.reject(error.message || error);
  }
}
