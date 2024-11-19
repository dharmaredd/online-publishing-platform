import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreArticleComponent } from './explore-article.component';

describe('ExploreArticleComponent', () => {
  let component: ExploreArticleComponent;
  let fixture: ComponentFixture<ExploreArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreArticleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
