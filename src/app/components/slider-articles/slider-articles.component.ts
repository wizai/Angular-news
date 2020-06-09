import {Component, Input, OnInit} from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-slider-articles',
  templateUrl: './slider-articles.component.html',
  styles: []
})
export class SliderArticlesComponent implements OnInit {

  constructor() { }

  @Input() ArticlesCountry: string[];
  @Input() country: string;

  slideData = [
    {
      id: 382,
      name: "Metal bluetooth cyan",
    }, {
      id: 822,
      name: "Avon",
    }, {
      id: 159,
      name: "Infrastructures",
    }, {
      id: 424,
      name: "Users Cotton",
    }, {
      id: 572,
      name: "Haptic Oklahoma Jewelery",
    }, {
      id: 127,
      name: "Circles Integration Street",
    }, {
      id: 1009,
      name: "uniform Communications Tuna",
    }, {
      id: 619,
      name: "North Carolina",
    }, {
      id: 716,
      name: "Eyeballs Rubber",
    }, {
      id: 382,
      name: "Nevada green unleash",
    }
  ];

  config: SwiperOptions = {
    slidesPerView: 'auto',
    allowTouchMove: true,
    spaceBetween: 20,
  };

  ngOnInit(): void {  }

}
