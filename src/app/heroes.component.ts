import {Component, OnInit} from '@angular/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-heroes',
  // templateUrl: './app.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService],
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) {}

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnInit(): void {
    this.retrieveHeroes();
  }

  retrieveHeroes(): void {
    // this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: String): void {
    name = name.trim();
    if (!name) {
      return;
    }

    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }
}
