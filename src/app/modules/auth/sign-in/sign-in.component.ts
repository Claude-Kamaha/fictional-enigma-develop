import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../@fuse/services/config/config.service';
//import { FuseConfigService } from '@fuse/services/config.service';
import { FuseAnimations } from '../../../../@fuse/animations';
import { AuthService } from '../../../core/auth/auth.service'
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/core/user/user.service';


@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: FuseAnimations
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    signInForm: FormGroup;
    showAlert: boolean = false;
    err: String;
    spin: boolean = false;
    isDisabled: boolean = false;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar,
        private _fuseConfigService: FuseConfigService,
        private _userService: UserService
    ) { }

    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // convenience getter for easy access to form fields
    //Method 1: connecting the login button for it to send a response when clicked
    // -----------------------------------------------------------------------------------------------------

    get form() {
        return this.signInForm.controls;
    }

    onSubmit(): void {
        // stop here if form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        this.spin = true;
        this.isDisabled = true;

        this._authService.loginCustomer(this.form.email.value, this.form.password.value)
            .subscribe(
                data => {
                    if (data.responsecode !== "login_ok") {
                        this.snackBar.open('The provided username/email and password combination does not match any user in the database', 'OK', {
                            verticalPosition: 'top',
                            duration: 2000,
                        });

                        return;
                    }

                    this._userService.loggedInUserEmail = this.form.email.value;
                    this.spin = false;

                    // url to redirect to when login is successful
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);
                },
                error => {
                    this.isDisabled = false;
                    this.signInNgForm.resetForm();
                    this.snackBar.open('An error occurred. Please try again later', 'OK', {
                        verticalPosition: 'top',
                        duration: 2000,
                    });
                });
    }

    // -----------------------------------------------------------------------------------------------------
    // convenience getter for easy access to form fields
    //Method 2: connecting the login button for it to send a response when clicked
    // -----------------------------------------------------------------------------------------------------
    /*
    OnSubmit(log: string,password: string){

      this._authService.loginCustomer(log,password).subscribe(
          (data) => {
              this.router.navigate(['/home']);
               //alert("login succesful");
               console.log("good")
          },
          (err: HttpErrorResponse) => {
              console.log("not conn")

          });
      }*/

}
