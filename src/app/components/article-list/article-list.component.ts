import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticleModel } from '../../models/artilcle-model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  updatebookmarkArticle,
  updateCommentArticle,
} from '../../article-store/actions/app-action.action';
import { AppState } from '../../article-store/reduces/app-reducer';
import {
  articleListData,
  articleListFilterData,
} from '../../article-store/selectors/app.selector';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
})
export class ArticleListComponent implements OnInit {
  @ViewChild('commentPopup') commentPopup: ElementRef | undefined;
  articleName = 'Online Publishing Platform';
  postarticle = 'Post Article';
  page: number = 0;
  searchText: any;
  commentData!: ArticleModel;
  commentFormGroup!: FormGroup;
  filterBy: string = 'ALL';
  artList$: Observable<ArticleModel[]> = this.store.select(articleListData);
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commentFormGroup = this.fb.group({
      comment: [],
    });
  }

  titleClick(data: any) {
    this.router.navigate(['/view-article', data.id]);
  }

  isBookMark(data: ArticleModel) {
    let obj = {
      id: data.id,
      title: data.title,
      description: data.description,
      author: data.author,
      views: data.views,
      commentDetails: data.commentDetails,
      isBookmark: !data.isBookmark,
      article: data.article,
      image: data.image,
    };
    this.store.dispatch(updatebookmarkArticle({ article: obj }));
    this.toastr.success('Sucess', 'Bookmark Added Sucessfully!!');
  }

  handleFilter(event: any) {
    this.filterBy = event.target.value;
    this.artList$ = this.store.select(
      articleListFilterData(event.target.value)
    );
  }

  closePopup() {
    if (this.commentPopup) {
      this.commentPopup.nativeElement.style.display = 'none';
      this.commentFormGroup.get('comment')?.setValue('');
    }
  }

  commentClick(data: any): void {
    if (this.commentPopup) {
      this.commentPopup.nativeElement.style.display = 'block';
    }
    this.commentData = data;
  }
  commentSubmit(): void {
    let value = this.commentFormGroup.get('comment')?.value;
    if (value && this.commentPopup && this.commentData.id) {
      let obj = {
        id: this.commentData.id,
        title: this.commentData.title,
        description: this.commentData.description,
        author: this.commentData.author,
        views: this.commentData.views,
        commentDetails: this.commentData.commentDetails,
        isBookmark: this.commentData.isBookmark,
        article: this.commentData.article,
        image: this.commentData.image,
      };
      obj.commentDetails = [...obj.commentDetails, { comment: value }];
      this.store.dispatch(updateCommentArticle({ article: obj }));
      this.commentFormGroup.get('comment')?.setValue('');
      this.commentPopup.nativeElement.style.display = 'none';
      this.toastr.success('Sucess', 'Comment Added Sucessfully!!');
    }
  }
  exploreClick() {
    this.router.navigate(['/explore-article']);
  }
}
