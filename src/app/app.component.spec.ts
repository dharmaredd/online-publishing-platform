import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AppComponent } from './app.component';
import { list } from './article-store/actions/app-action.action';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterModule],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have title "online-publishing-platform"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('online-publishing-platform');
  });

  it('should dispatch the "list" action on initialization', () => {
    TestBed.createComponent(AppComponent);
    expect(mockStore.dispatch).toHaveBeenCalledWith(list());
  });

  it('should clear sessionStorage on initialization', () => {
    spyOn(sessionStorage, 'clear');
    TestBed.createComponent(AppComponent);
    expect(sessionStorage.clear).toHaveBeenCalled();
  });
});
