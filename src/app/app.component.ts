import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading$.next(true);
    }
    if (event instanceof NavigationEnd) {
      this.loading$.next(false);
    }

    if (event instanceof NavigationCancel) {
      this.loading$.next(false);
    }
    if (event instanceof NavigationError) {
      this.loading$.next(false);
    }
  }
}

/**
 *  TODO: Create interface for all entities
 *  TODO: Implement adaptive design
 **/
