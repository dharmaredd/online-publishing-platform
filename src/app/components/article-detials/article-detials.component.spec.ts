import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetialsComponent } from './article-detials.component';

describe('ArticleDetialsComponent', () => {
  let component: ArticleDetialsComponent;
  let fixture: ComponentFixture<ArticleDetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleDetialsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
