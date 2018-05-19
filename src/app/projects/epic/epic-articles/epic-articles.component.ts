import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-epic-articles',
  templateUrl: './epic-articles.component.html',
  styleUrls: ['./epic-articles.component.scss']
})
export class EpicArticlesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      document.body.classList.add('epic');
  }

}
