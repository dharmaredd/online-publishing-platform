import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleListComponent } from './article-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import {
  updatebookmarkArticle,
  updateCommentArticle,
} from '../../article-store/actions/app-action.action';
import { articleListData } from '../../article-store/selectors/app.selector';
import { ArticleAuthorPipePipe } from '../../pipes/article-author.pipe';
import { AppService } from '../../services/app-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;
  let mockStore: any;
  let mockRouter: any;
  let mockToastr: any;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    mockStore.select.and.returnValue(of([]));
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockToastr = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [ArticleListComponent, ArticleAuthorPipePipe],
      imports: [ReactiveFormsModule,HttpClientTestingModule, FormsModule, StoreModule.forRoot({})],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastr },
        AppService
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group on ngOnInit', () => {
    expect(component.commentFormGroup).toBeDefined();
    expect(component.commentFormGroup.controls['comment']).toBeDefined();
  });

  it('should navigate to view-article on titleClick', () => {
    const mockArticle = { id: 1 } as any;
    component.titleClick(mockArticle);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/view-article', 1]);
  });

  it('should dispatch bookmark action on isBookMark', () => {
    const mockArticle = {
      id: 1,
      title: 'Test Article',
      description: 'Description',
      author: 'Author',
      views: 10,
      commentDetails: [],
      isBookmark: false,
      article: 'Content',
      image: 'image.png',
    };
    component.isBookMark(mockArticle);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      updatebookmarkArticle({ article: { ...mockArticle, isBookmark: true } })
    );
    expect(mockToastr.success).toHaveBeenCalledWith(
      '',
      'Bookmark Added Sucessfully!!'
    );
  });

  it('should filter articles on handleFilter', () => {
    const mockEvent = { target: { value: 'TEST' } };
    component.handleFilter(mockEvent);
    expect(component.filterBy).toBe('TEST');
    expect(mockStore.select).toHaveBeenCalledWith(articleListData);
  });

  it('should show and hide comment popup correctly', () => {
    const mockElement = {
      nativeElement: { style: { display: 'none' } },
    } as any;
    component.commentPopup = mockElement;
    component.commentClick({});
    expect(mockElement.nativeElement.style.display).toBe('block');
    component.closePopup();
    expect(mockElement.nativeElement.style.display).toBe('none');
    expect(component.commentFormGroup.get('comment')?.value).toBe('');
  });

  it('should navigate to explore-article on exploreClick', () => {
    component.exploreClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/explore-article']);
  });
});
