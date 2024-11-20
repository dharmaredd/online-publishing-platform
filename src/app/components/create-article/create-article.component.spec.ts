import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { CreateArticleComponent } from './create-article.component';
import { addArticle } from '../../article-store/actions/app-action.action';
import { articleListData } from '../../article-store/selectors/app.selector';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateArticleComponent', () => {
  let component: CreateArticleComponent;
  let fixture: ComponentFixture<CreateArticleComponent>;
  let mockRouter: any;
  let mockStore: any;
  let mockToastr: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockStore = {
      dispatch: jasmine.createSpy('dispatch'),
      select: jasmine.createSpy('select').and.returnValue(of([])),
    };

    mockToastr = {
      success: jasmine.createSpy('success'),
    };

    await TestBed.configureTestingModule({
      declarations: [CreateArticleComponent],
      imports: [
        ReactiveFormsModule,
        AngularEditorModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore },
        { provide: ToastrService, useValue: mockToastr },
        FormBuilder,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CreateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the articleForm on ngOnInit', () => {
    expect(component.articleForm).toBeDefined();
    expect(component.articleForm.controls['title']).toBeDefined();
    expect(component.articleForm.controls['description']).toBeDefined();
    expect(component.articleForm.controls['author']).toBeDefined();
    expect(component.articleForm.controls['image']).toBeDefined();
    expect(component.articleForm.controls['article']).toBeDefined();
  });

  it('should navigate back to list on cancel', () => {
    component.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should dispatch addArticle action on submit', () => {
    const mockArticles = [
      { id: 1, title: 'Article 1', description: 'Description 1' },
    ];
    mockStore.select.and.returnValue(of(mockArticles));
    component.articleForm.setValue({
      id: null,
      title: 'New Article',
      description: 'Description',
      author: 'Author',
      image: 'Image Data',
      article: 'Article Content',
    });
    component.submit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addArticle({
        article: {
          id: mockArticles.length + 1,
          title: 'New Article',
          description: 'Description',
          author: 'Author',
          image: 'Image Data',
          article: 'Article Content',
          isBookmark: false,
          views: 0,
          commentDetails: [],
        },
      })
    );
    expect(mockToastr.success).toHaveBeenCalledWith(
      'Sucess',
      'Article Added Sucessfully!!'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should update the image control when a file is selected', () => {
    const mockEvent = {
      target: {
        files: [new Blob(['image content'], { type: 'image/png' })],
      },
    };
    const fileReaderMock = {
      readAsDataURL: jasmine.createSpy('readAsDataURL'),
      onload: null as ((event: any) => void) | null,
    };
    spyOn(window as any, 'FileReader').and.returnValue(fileReaderMock);
    component.onSelectFile(mockEvent);
    if (fileReaderMock.onload) {
      fileReaderMock.onload({
        target: { result: 'data:image/png;base64,imageData' },
      });
    }
    expect(fileReaderMock.readAsDataURL).toHaveBeenCalledWith(
      mockEvent.target.files[0]
    );
    expect(component.articleForm.get('image')?.value).toBe(
      'data:image/png;base64,imageData'
    );
  });
});
