import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return false;
    }

    this.authService.signUp(this.form.value)
      .subscribe(
        response => {},
        error => {console.log(error)},
        () => {}
      );
  }

}
