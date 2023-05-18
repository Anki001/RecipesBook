import { Component, OnDestroy, OnInit, importProvidersFrom } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipes.model';
import { recipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit,OnDestroy {
  recipes: Recipe[];
  id: number;
  subscription:Subscription;
  constructor(private recipeService: recipeService,
    private router: Router,
    private route: ActivatedRoute) {

  }
  ngOnInit() {
    debugger;
   this.subscription= this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      });
    this.recipes = this.recipeService.getRecipes();
  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
