import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ArticleDetialsComponent } from './article-detials.component';
import { ArticleModel } from '../../models/artilcle-model';
import {
  updatebookmarkArticle,
  updateCommentArticle,
} from '../../article-store/actions/app-action.action';
import { AppService } from '../../services/app-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ArticleDetialsComponent', () => {
  let component: ArticleDetialsComponent;
  let fixture: ComponentFixture<ArticleDetialsComponent>;
  let mockStore: any;
  let mockRouter: any;
  let mockActivatedRoute: any;
  let mockToastr: any;
  const mockArticle: ArticleModel = {
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

  beforeEach(async () => {
    mockStore = {
      dispatch: jasmine.createSpy(),
      select: jasmine.createSpy().and.returnValue(of([mockArticle])),
    };

    mockRouter = {
      navigate: jasmine.createSpy(),
    };

    mockActivatedRoute = {
      params: of({ id: 1 }),
    };
    mockToastr = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [ArticleDetialsComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule, StoreModule.forRoot({}), ToastrModule],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ToastrService, useValue: mockToastr },
        AppService,

      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ArticleDetialsComponent);
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

  it('should set articleDetails and carousalList on ngOnInit', () => {
    expect(component.articleDetails).toEqual(mockArticle);
    expect(component.carousalList).toBeDefined();
  });

  it('should dispatch bookmark action on isBookMark', () => {
    component.isBookMark(mockArticle);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      updatebookmarkArticle({ article: { ...mockArticle, isBookmark: true } })
    );
  });

  it('should navigate back on back', () => {
    component.back();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should navigate to the recommended article on recommondedClick', () => {
    component.recommondedClick(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/view-article', 2]);
  });

  it('should show and hide comment popup correctly', () => {
    const mockElement = {
      nativeElement: { style: { display: 'none' } },
    } as any;
    component.commentPopup = mockElement;
    component.commentClick(mockArticle);
    expect(mockElement.nativeElement.style.display).toBe('block');
    expect(component.bookmarkData).toEqual(mockArticle);
    component.closePopup();
    expect(mockElement.nativeElement.style.display).toBe('none');
    expect(component.commentFormGroup.get('comment')?.value).toBe('');
  });

  it('should dispatch comment action on commentSubmit', () => {
    const mockElement = {
      nativeElement: { style: { display: 'block' } },
    } as any;
    component.commentPopup = mockElement;
    component.bookmarkData = mockArticle;
    component.commentFormGroup.get('comment')?.setValue('New Comment');
    component.commentSubmit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      updateCommentArticle({
        article: {
          ...mockArticle,
          commentDetails: [{ comment: 'New Comment' }],
        },
      })
    );
    expect(component.commentFormGroup.get('comment')?.value).toBe('');
    expect(mockElement.nativeElement.style.display).toBe('none');
  });
});
