import { Component } from '@angular/core';

@Component({
  selector: 'app-explore-article',
  templateUrl: './explore-article.component.html',
  styleUrl: './explore-article.component.css',
})
export class ExploreArticleComponent {
  searchQuery: string = '';

  cards = [
    { title: 'Card 1', image: '../../../assets/images/img.jpg' },
    { title: 'Card 2', image: '../../../assets/images/img2.jpg' },
    { title: 'Card 3', image: '../../../assets/images/img3.png' },
    { title: 'Card 4', image: '../../../assets/images/img1.webp' },
    { title: 'Card 5', image: '../../../assets/images/img1.webp' },
    { title: 'Card 6', image: '../../../assets/images/img2.jpg' },
    { title: 'Card 7', image: '../../../assets/images/img3.png' },
    { title: 'Card 8', image: '../../../assets/images/img.jpg' },
  ];
}
