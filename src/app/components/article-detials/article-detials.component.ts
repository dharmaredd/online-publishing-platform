import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppState } from '../../article-store/reduces/app-reducer';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { ArticleModel } from '../../models/artilcle-model';
import {
  updatebookmarkArticle,
  updateCommentArticle,
} from '../../article-store/actions/app-action.action';
import {
  articleListData,
  articleByIdData,
} from '../../article-store/selectors/app.selector';
import { AppService } from '../../services/app-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-article-detials',
  templateUrl: './article-detials.component.html',
  styleUrl: './article-detials.component.css',
})
export class ArticleDetialsComponent implements OnInit {
  @ViewChild('commentsPopup') commentPopup: ElementRef | undefined;
  articleDetails!: ArticleModel;
  id!: number;
  bookmarkData: any;
  carousalList: any[] = [];
  articleList: any;
  commentFormGroup!: FormGroup;
  articleDetails$: Observable<ArticleModel> | undefined;
  artList$: Observable<ArticleModel[]> = this.store.select(articleListData);

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.carousalList = [];
    this.commentFormGroup = this.fb.group({
      comment: [],
    });
    this.activatedRoute.params.subscribe((param) => {
      if (param) {
        this.id = parseInt(param?.['id']);
        this.store.select(articleByIdData(this.id)).subscribe((res) => {
          this.articleDetails$ = res ? of(res) : undefined;
        });
        this.store.select(articleListData).subscribe((res) => {
          let data = res.find((ele) => ele.id === this.id);
          this.articleDetails = data!!;
        });
        this.artList$.subscribe((res) => {
          this.articleList = res;
          let index = res.findIndex((ele: any) => ele.id === this.id);
          if (res.length - 7 >= index) {
            this.carousalList = res.slice(index + 1, index + 7);
          } else {
            this.carousalList = res.slice(index - 7, index - 1);
          }
        });
      }
    });
  }

  isBookMark(data: any) {
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
    setTimeout(() => {
      this.bookmarkData = {};
    }, 2000);
    this.toastr.success('', `Bookmark ${ obj.isBookmark ? 'Added' : 'Removed'} Sucessfully!!`);
  }

  back() {
    this.route.navigate([this.appService.backUrl]);
  }

  recommondedClick(id: number) {
    this.route.navigate(['/view-article', id]);
  }

  commentClick(data: any): void {
    this.bookmarkData = {};
    if (this.commentPopup) {
      this.commentPopup.nativeElement.style.display = 'block';
    }
    this.bookmarkData = data;
  }

  commentSubmit(): void {
    let value = this.commentFormGroup.get('comment')?.value;
    if (value && this.commentPopup && this.bookmarkData.id) {
      let obj = {
        id: this.bookmarkData.id,
        title: this.bookmarkData.title,
        description: this.bookmarkData.description,
        author: this.bookmarkData.author,
        views: this.bookmarkData.views,
        commentDetails: this.bookmarkData.commentDetails,
        isBookmark: this.bookmarkData.isBookmark,
        article: this.bookmarkData.article,
        image: this.bookmarkData.image,
      };
      obj.commentDetails = [...obj.commentDetails, { comment: value }];
      this.store.dispatch(updateCommentArticle({ article: obj }));
      this.commentFormGroup.get('comment')?.setValue('');
      this.commentPopup.nativeElement.style.display = 'none';
      this.bookmarkData = {};
      this.toastr.success('', 'Comment Added Sucessfully!!');
    }
  }

  closePopup() {
    if (this.commentPopup) {
      this.commentPopup.nativeElement.style.display = 'none';
      this.commentFormGroup.get('comment')?.setValue('');
    }
  }
}
