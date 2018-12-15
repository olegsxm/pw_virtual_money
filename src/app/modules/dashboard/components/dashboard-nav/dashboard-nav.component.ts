import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
