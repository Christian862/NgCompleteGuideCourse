import { NgModule } from '@angular/core';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoggingService } from '../logging.service';

// Shared module doesn't really need to be imported here instead of CommonModule, it's
// just for demonstration sake
@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ShoppingListComponent }]),
  ],
  exports: [ShoppingListComponent, ShoppingEditComponent],
  // providers: [LoggingService], // Since this module is lazy loaded, it still uses
  // it's own instance of LoggingService because it imports the SharedModule which
  // provides the LoggingService. Services that are Provided in Modules of another
  // Modules imports, get there OWN instance when that module is LAZY LOADED, like
  // this ShoppingListModule.  This is a common bug when providing services,
  // especially when providing them in shared modules - because when that shared
  // module is imported into a lazily loaded module, a new instance is created for
  // that service, resulting in unexpected behaviour. This is why 'ProvidedIn' is
  // recommended.
})
export class ShoppingListModule {}
