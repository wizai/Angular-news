import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public currentUser: any;

  constructor(
    public searchService: SearchService,
    private authService: AuthService
) { }

  ngOnInit(): void {

    this.authService.getCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;
    });

  }

}
