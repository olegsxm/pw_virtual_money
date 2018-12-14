import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {AuthErrorComponent} from '../../components/auth-error/auth-error.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  @ViewChild(AuthErrorComponent) error: AuthErrorComponent;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['testusername9@testusername.testusername', [Validators.required, Validators.email]],
      password: ['testusername', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.invalid) { return false; }

    this.authService.signIn(this.form.value)
      .subscribe(
        response => {},
        err => this.error.show(err.error)
        );
  }
}
