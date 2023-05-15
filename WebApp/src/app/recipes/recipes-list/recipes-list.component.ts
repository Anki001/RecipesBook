import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { Recipe } from '../recipes.model';
import { recipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  
  recipes: Recipe[];
    id:number;
  constructor(private recipeService: recipeService, 
    private router : Router,
    private route:ActivatedRoute ) {

  }
  ngOnInit() {
    this.recipes=this.recipeService.getRecipes();
  }
  onNewRecipe()
  {this.router.navigate(['new'],{relativeTo:this.route});

  }
}
