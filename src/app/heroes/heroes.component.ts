import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service'
import { MesagesService } from '../mesages.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  heroes : Hero[] = []

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes)
  }

  add(firstName: String, lastName: String):void{
    firstName = firstName.trim()
    lastName = lastName.trim()

    if(!firstName && !lastName){
      return ;
    }

    this.heroService.addHero({firstName, lastName} as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    })
  }

  deleteHero(hero: Hero): void{
    this.heroes = this.heroes.filter(h => h!== hero)
    this.heroService.deleteHero(hero.id).subscribe();
  }


}
