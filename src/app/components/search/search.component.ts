import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {SearchService} from '../../services/search/search.service';
import {NewsApiService} from '../../services/news-api/news-api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit, OnDestroy  {

  isLoading = false;
  form: FormGroup;
  submitted = false;
  public keyword = null;
  public sourceSelected = null;
  public Sources: Array<any> = [];

  @Output()
  buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    public searchService: SearchService,
    private newsapiService: NewsApiService,
    private router: Router
  ) { }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {

    this.newsapiService.getSources().subscribe((response: any) => {
      this.Sources = response.data.sources;
    });

    if (localStorage.getItem('keyword')) {
      this.keyword = localStorage.getItem('keyword');
    }
    if (localStorage.getItem('sourceSelected')) {
      this.sourceSelected = localStorage.getItem('sourceSelected');
    }

    this.form = new FormGroup({
      source: new FormControl(this.sourceSelected, {
        validators: [Validators.required]
      }),
      keyword: new FormControl(this.keyword),
    });

    if (localStorage.getItem('sourceSelected')) {
      this.onSearch();
    }
  }

  ngOnDestroy() {
    this.submitted = false;
  }

  onSearch() {
    this.isLoading = true;
    this.newsapiService
      .getArticles(this.form.value.source, this.form.value.keyword)
      .subscribe(
        (response: any) => {
          localStorage.setItem('sourceSelected', this.form.value.source);
          if ( this.form.value.keyword ) {
            localStorage.setItem('keyword', this.form.value.keyword);
          } else {
            localStorage.removeItem('keyword');
          }
          this.isLoading = false;
          this.router.navigate(['/result'], { queryParams: { source: this.form.value.source,  keyword: this.form.value.keyword } });
          this.submitted = false;
          this.form.reset();
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }
  onReset() {
    this.submitted = false;
    this.form.reset();
  }

}
