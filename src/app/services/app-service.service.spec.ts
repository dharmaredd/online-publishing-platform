import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AppService } from './app-service.service';
import { ArticleModel } from '../models/artilcle-model';

describe('AppService', () => {
  let service: AppService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService],
    });

    service = TestBed.inject(AppService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch login data', () => {
    const mockLoginData = {
      username: 'testUser',
      roles: ['admin', 'user'],
    };

    service.getLoginData().subscribe((data) => {
      expect(data).toEqual(mockLoginData);
    });

    const req = httpTestingController.expectOne(
      '../assets/json/login-data.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockLoginData);
  });

  it('should fetch list of articles', () => {
    const mockArticleList: ArticleModel[] = [
      {
        id: 1,
        title: 'Article 1',
        description: '',
        author: '',
        views: 0,
        commentDetails: [],
        isBookmark: false,
        article: '',
        image: '',
      },
      {
        id: 2,
        title: 'Article 2',
        description: '',
        author: '',
        views: 0,
        commentDetails: [],
        isBookmark: false,
        article: '',
        image: '',
      },
    ];

    service.getList().subscribe((data) => {
      expect(data).toEqual(mockArticleList);
    });

    const req = httpTestingController.expectOne('../assets/json/list.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockArticleList);
  });

  it('should handle empty list of articles', () => {
    const mockEmptyList: ArticleModel[] = [];

    service.getList().subscribe((data) => {
      expect(data).toEqual(mockEmptyList);
    });

    const req = httpTestingController.expectOne('../assets/json/list.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmptyList);
  });

  it('should handle errors when fetching login data', () => {
    const errorMessage = 'Failed to load login data';

    service.getLoginData().subscribe({
      next: () => fail('Expected an error, not data'),
      error: (error) => expect(error.statusText).toBe('Server Error'),
    });

    const req = httpTestingController.expectOne(
      '../assets/json/login-data.json'
    );
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('should handle errors when fetching list of articles', () => {
    const errorMessage = 'Failed to load articles';

    service.getList().subscribe({
      next: () => fail('Expected an error, not data'),
      error: (error) => expect(error.statusText).toBe('Server Error'),
    });

    const req = httpTestingController.expectOne('../assets/json/list.json');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
