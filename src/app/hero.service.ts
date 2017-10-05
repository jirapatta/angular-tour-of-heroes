import { Injectable } from '@angular/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';

@Injectable()
export class HeroService {

  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  getHeroesSlowly(): Promise<Hero[]> {
    // return Promise.resolve(HEROES);

    // Simulate server latency with 2 seconds delay
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }
}