
import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipes.model";
import { Ingredient } from "../shared/ingredient.model";
import { shoppingService } from "../shopping-list/shoppnglist.service";

@Injectable()
export class recipeService {

    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('Recipe 1',
            'Recipe 1 is having good test',
            'https://www.realsimple.com/thmb/xtZt1do0jpCL2j6FZG3n6HZffDM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegetarian-recipes-1672e2b4f9104ed3b3867a2a14889ce9.jpg',
            [new Ingredient('Pizza', 52),
            new Ingredient('burger', 45)]),
        new Recipe('Recipe 2',
            'Recipe 2 is having good test',
            'https://www.realsimple.com/thmb/xtZt1do0jpCL2j6FZG3n6HZffDM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegetarian-recipes-1672e2b4f9104ed3b3867a2a14889ce9.jpg',
            [new Ingredient('meat', 200), new Ingredient('french fries', 51)])
    ];

    constructor(private slservice: shoppingService) {

    }
    getRecipes() {
        return this.recipes.slice()
    }
    getRecipe(index: number) {
        return this.recipes[index];
    }
    addIngredientsToShoppingList(ingredient: Ingredient[]) {
        this.slservice.addIngredients(ingredient);

    }
}