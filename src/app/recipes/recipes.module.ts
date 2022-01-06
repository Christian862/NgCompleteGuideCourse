import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent, // Must declare it because its being loaded via routing
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    RouterModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    // No need to export anymore since the the routing for recipes is done within the
    // recipes feature module
    // RecipesComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // RecipeStartComponent,
    // RecipeEditComponent,
  ],
})
export class RecipesModule {}
