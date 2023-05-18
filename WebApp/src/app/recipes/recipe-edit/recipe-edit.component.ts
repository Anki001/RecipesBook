import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { recipeService } from '../recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;


  constructor(private route: ActivatedRoute,
    private recipeservice: recipeService,
    private router: Router
  ) { }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = +params['id'] != null;
      this.inintForm();
    });
  }
  onSubmit() {
    // const newRecipe=new Recipe(this.recipeForm.value['name'],
    // this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recipeservice.updateRecipe(this.id, this.recipeForm.value);
    }
    else {
      this.recipeservice.addRecipes(this.recipeForm.value);
    }
    this.onCancel();

  }
  onAddIngredient() {
    debugger
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup(
      {
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      }));
  }

  private inintForm() {
    let recipeName = '';
    let recipePath = '';
    let recipedesciption = '';
    let recipeingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeservice.getRecipe(this.id)
      recipeName = recipe.name;
      recipePath = recipe.imagePath;
      recipedesciption = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])

          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipePath, Validators.required),
      'description': new FormControl(recipedesciption, Validators.required),
      'ingredients': recipeingredients
    });
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
