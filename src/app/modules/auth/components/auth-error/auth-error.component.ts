import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-auth-error',
  templateUrl: './auth-error.component.html',
  styleUrls: ['./auth-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthErrorComponent implements OnInit {
  message: string = null;
  displayError = false;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  show(message: string) {
    this.message = message;
    this.displayError = true;
    this.cd.markForCheck();
  }

  hide() {
    this.displayError = false;
    this.message = null;
    this.cd.markForCheck();
  }
}
