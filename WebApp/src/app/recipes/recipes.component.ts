import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipes.model';
import { recipeService } from './recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [recipeService]
})
export class RecipesComponent implements OnInit {
  @Input() slectedRecipes: Recipe;

  constructor(private route:ActivatedRoute,private recipeService: recipeService) {

  }
  ngOnInit() {
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => { this.slectedRecipes = recipe; });
  }
}
