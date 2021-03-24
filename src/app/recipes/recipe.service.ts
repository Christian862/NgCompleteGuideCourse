import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Test recipe', 'This is simply a test', 'https://www.simplyrecipes.com/thmb/dWEVorTSuZUmOYPr6pxk4SnK_F8=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2004__12__lasagna-horiz-a-2000-a4631232672d4609b12b94da7a20ef90.jpg'),
    new Recipe('Another Test recipe', 'This is simply another test', 'https://www.simplyrecipes.com/thmb/dWEVorTSuZUmOYPr6pxk4SnK_F8=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2004__12__lasagna-horiz-a-2000-a4631232672d4609b12b94da7a20ef90.jpg')
  ]

  getRecipes() {
    // return new aexact coopy of array, to prevent mutations through this reference 
    // in components
    return this.recipes.slice()
  }
}
