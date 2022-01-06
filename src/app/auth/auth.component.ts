import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy, OnInit {
  private closeSub: Subscription;
  private storeSub: Subscription;
  isLoginMode = true; // This is a state the effects the UI however only for THIS
  // COMPONENT. Not managed in NGRX because it doesn't affect any other part of the app
  // The rest of the auth flow does however impact the rest of the applicati on
  isLoading = false;
  error: string = null;

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(
    private componenetFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      this.store.dispatch(new AuthActions.SignupStart({ email, password }));
    }

    form.reset();
  }

  // For the recomended method of DC/modals/dialogs
  onHandleErrorDialog() {
    this.store.dispatch(new AuthActions.ClearError());
  }
  //  For the programatic component/modal pattern. NOT recomened
  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent(); WONT WORK WITH ANGULAR

    // This is an obj(Factory) that knows how to create AlertComponents
    const alertCmpFactory =
      this.componenetFactoryResolver.resolveComponentFactory(AlertComponent);

    // Need to tell angular where we want to add in the dom, to do this we create
    // helper directive
    const hostViewContainerRef = this.alertHost.viewContainerRef; // works
    // because it's made public
    hostViewContainerRef.clear(); //  clear anything that might be there

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
