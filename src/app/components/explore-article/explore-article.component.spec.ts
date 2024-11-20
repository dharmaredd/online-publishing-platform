import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ExploreArticleComponent } from './explore-article.component';
import { Store, StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../services/app-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

describe('ExploreArticleComponent', () => {
  let component: ExploreArticleComponent;
  let fixture: ComponentFixture<ExploreArticleComponent>;
  let store: Store;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreArticleComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule, FormsModule, StoreModule.forRoot({})],
      providers: [provideMockStore(), AppService,ToastrService],
    }).compileComponents();
    fixture = TestBed.createComponent(ExploreArticleComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
