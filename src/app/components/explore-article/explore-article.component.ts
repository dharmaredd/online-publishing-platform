import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../article-store/reduces/app-reducer';
import { Store } from '@ngrx/store';
import { articleListData } from '../../article-store/selectors/app.selector';
import { ArticleModel } from '../../models/artilcle-model';
import { map, Observable, of } from 'rxjs';
import { AppService } from '../../services/app-service.service';

@Component({
  selector: 'app-explore-article',
  templateUrl: './explore-article.component.html',
  styleUrl: './explore-article.component.css',
})
export class ExploreArticleComponent {
  searchQuery: string = '';
  searchType: string = 'Article';
  artList$: Observable<ArticleModel[]> = this.store.select(articleListData);
  authorList$: Observable<ArticleModel[]> = this.store.select(articleListData);

  constructor(private router: Router, private store: Store<AppState>, private appService: AppService) {}

  backPage() {
    this.router.navigate(['/list']);
  }

  reversingList(list: ArticleModel[]): ArticleModel[] {
    const items = [...list];
    return items.reverse();
  }

  clickCard(data: ArticleModel): void {
    this.appService.backUrl = '/explore-article';
    this.router.navigate(['/view-article', data.id]);
  }

  searchInput(): void {
    if (this.searchType === 'Article') {
      this.authorList$ = this.store.select(articleListData);
      this.store.select(articleListData).subscribe((data) => {
        let list = data.filter((ele) =>
          ele.title
            .toLowerCase()
            .includes(this.searchQuery.trim().toLowerCase())
        );
        this.artList$ = of(list);
      });
    } else {
      this.artList$ = this.store.select(articleListData);
      this.store.select(articleListData).subscribe((data) => {
        let list = data.filter((ele) =>
          ele.author
            .toLowerCase()
            .includes(this.searchQuery.trim().toLowerCase())
        );
        this.authorList$ = of(list);
      });
    }
  }

  setSearchType(type: string): void {
    this.searchType = type;
    if (this.searchQuery) {
      this.searchInput();
    }
  }
}
