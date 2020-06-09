import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../../services/news-api/news-api.service';
import { SearchService } from '../../services/search/search.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styles: [],
})
export class HomepageComponent implements OnInit {

  public isLoading = false;
  public ArticlesByBookmark: Array<any> = null;
  public currentUser: any;
  public Bookmarks: Array<any> = null;
  public ArticlesCountry: Array<any> = null;
  public Articles: any;

  constructor(
    private newsapiService: NewsApiService,
    public searchService: SearchService,
    private authService: AuthService,
  ) {}

  ngOnInit() {

    this.newsapiService.getArticlesByCountry('us').subscribe( (response: any) => {
      this.ArticlesCountry = response.articles;
    });

    this.authService.getCurrentUser().subscribe( async (currentUser) => {
      this.currentUser = await currentUser;
      if (currentUser) {
        this.Bookmarks = currentUser.bookmark;
        this.Articles = [];
        this.getAllBookmarks(currentUser.bookmark);
      }
    });

  }

  getAllBookmarks(liste) {
    liste.forEach( (element, index) => {
      this.getArticles(element.id);
    });
  }

  getArticles(sourceId) {
    return this.newsapiService
      .getArticles(sourceId, null)
      .subscribe((response: any) => {
        this.ArticlesByBookmark = response.data.articles;
        if (response) {
          this.Articles.push(this.ArticlesByBookmark);
        }
      });
  }

}
