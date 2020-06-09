import {Component, OnInit} from '@angular/core';
import { FadeAnimation } from './animations/fadeInAnimation';
import { AuthService } from './components/auth/auth.service';
import { SearchService } from './services/search/search.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ FadeAnimation ]
})
export class AppComponent implements OnInit {
  title = 'News';

  constructor(
    private router: Router,
    public searchService: SearchService,
    private authService: AuthService
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.searchService.showForm = false;
      }
    });
  }
  async ngOnInit() {
    await this.authService.autoAuthUser();
  }
}
