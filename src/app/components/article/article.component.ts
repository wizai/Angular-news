import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
})

export class ArticleComponent implements OnInit {

  @Input() article: any;

  constructor() { }

  ngOnInit(): void {  }

}
