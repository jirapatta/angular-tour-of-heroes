import { Injectable } from '@angular/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';

@Injectable()
export class HeroService {

  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    // return Promise.resolve(HEROES);

    // Simulate server latency with 1 seconds delay
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 1000);
    });
  }

  getHero(id: Number): Promise<Hero> {
    return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
  }
}
