import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipes.model";

import { recipeService } from "../recipes/recipe.service";
import { map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DatastorageService {
    constructor(private http: HttpClient, private recipeService: recipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-ad062-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => { console.log(response); });
    }

    FetchRecipeData() {
        this.http.
            get<Recipe[]>('https://ng-course-recipe-book-ad062-default-rtdb.firebaseio.com/recipes.json')
            // .pipe(map(recipes => {
            //     return recipes.map(recipe => {
            //         return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            //     });
            // }))
            .subscribe(recipes => {
                // console.log(recipes);
                this.recipeService.setRecipes(recipes);
            });
    }
}