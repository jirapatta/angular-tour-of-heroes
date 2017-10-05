import {Component, OnInit} from '@angular/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HeroService],
  template: `
    <h1>{{title}}</h1>

    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <app-hero-detail [hero]="selectedHero"></app-hero-detail>
  `
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) {}

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnInit(): void {
    this.retrieveHeroes();
  }

  retrieveHeroes(): void {
    // this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }
}
