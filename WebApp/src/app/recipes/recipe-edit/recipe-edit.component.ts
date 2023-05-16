import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { recipeService } from '../recipe.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm:FormGroup;

  constructor(private route: ActivatedRoute,private recipeservice:recipeService) { }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = +params['id'] != null;
      this.inintForm();
    });
  }
  onSubmit(){
    console.log(this.recipeForm);
  }

  private inintForm()
  {
    let recipeName='';
    let recipePath='';
    let recipedesciption='';
    let recipeingredients=new FormArray([]);
    if(this.editMode){
      const recipe=this.recipeservice.getRecipe(this.id)
      recipeName=recipe.name;
      recipePath=recipe.imagePath;
      recipedesciption=recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients)
        {
          recipeingredients.push(new FormGroup({'name':new FormControl(ingredient.name),
        'amount':new FormControl(ingredient.amount)

        }))
        }
      }
    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName),
      'imagePath':new FormControl(recipePath),
      'description':new FormControl(recipedesciption),
      'ingredients':recipeingredients
    })
  }
}
