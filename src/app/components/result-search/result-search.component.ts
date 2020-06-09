import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { SearchService } from '../../services/search/search.service';
import { NewsApiService } from '../../services/news-api/news-api.service';
import { BookmarkService } from '../../services/bookmark/bookmark.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styles: []
})
export class ResultSearchComponent implements OnInit {

  public isLoading = false;
  public isInBookmark = false;
  public currentUser: any;
  public Source: any = {};
  public Articles: Array<any> = [];
  public Sources: Array<any> = [];
  private sourceId: string;
  private keyword: string;

  constructor(
    public searchService: SearchService,
    private newsapiService: NewsApiService,
    private bookmarkService: BookmarkService,
    private authService: AuthService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.authService.getCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;
    });

    this.newsapiService.getSources().subscribe(async (response: any) => {
      this.Sources = await response.data.sources;
      this.Source = this.getSourceById(localStorage.getItem('sourceSelected'));
      if (this.currentUser) {
        this.checkIfInBookmarks(this.Source.id);
      }
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.sourceId = queryParams.source;
      if (queryParams.keyword) {
        this.keyword = queryParams.keyword;
      } else {
        this.keyword = null;
      }
      this.isLoading = true;
      this.newsapiService.getArticles(this.sourceId, this.keyword).subscribe(async (response: any) => {
        this.isLoading = false;
        this.Articles = await response.data.articles;
      });
    });
  }

  getSourceById(sourceId) {
    return this.Sources.find((source: any) => source.id === sourceId);
  }

  checkIfInBookmarks(sourceId) {
    return this.currentUser.bookmark
      .find((bookmark: any) => bookmark.id === sourceId) ? this.isInBookmark = true : this.isInBookmark = false;
  }

  addToBookmarks(sourceId) {
    const source = this.getSourceById(sourceId);
    this.bookmarkService.addToBookmarks(source).subscribe( (response: any) => {
      this.authService.getUser(localStorage.getItem('token'));
      this.isInBookmark = true;
    });
  }

  removeFromBookmarks(sourceId) {
    const bookmarkRemoving = this.currentUser.bookmark.find((bookmark: any) => bookmark.id === sourceId);
    this.bookmarkService.removeBookmark(bookmarkRemoving).subscribe( (response: any) => {
      this.authService.getUser(localStorage.getItem('token'));
      this.isInBookmark = false;
    });
  }

}
