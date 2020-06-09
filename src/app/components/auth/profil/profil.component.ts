import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SearchService } from '../../../services/search/search.service';
import {BookmarkService} from '../../../services/bookmark/bookmark.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styles: []
})
export class ProfilComponent implements OnInit {
  public currentUser: any;

  constructor(
    private authService: AuthService,
    public searchService: SearchService,
    private bookmarkService: BookmarkService,
  ) { }

  async ngOnInit() {
    const test = await this.authService.getCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
  }

  logout() {
    this.authService.logout();
  }

  removeFromBookmarks(sourceId, news) {
    news.remove = !news.remove;
    const bookmarkRemoving = this.currentUser.bookmark.find((bookmark: any) => bookmark.id === sourceId);
    setTimeout(() => {
      this.bookmarkService.removeBookmark(bookmarkRemoving).subscribe((response: any) => {
        this.authService.getUser(localStorage.getItem('token'));
      });
    }, 500);
  }

}
