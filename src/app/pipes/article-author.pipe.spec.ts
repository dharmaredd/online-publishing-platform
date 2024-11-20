import { ArticleAuthorPipePipe } from './article-author.pipe';

describe('ArticleAuthorPipePipe', () => {
  let pipe: ArticleAuthorPipePipe;

  beforeEach(() => {
    pipe = new ArticleAuthorPipePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original array if no search string is provided', () => {
    const articles = [
      { author: 'Alice', title: 'Article 1' },
      { author: 'Bob', title: 'Article 2' },
    ];
    expect(pipe.transform(articles)).toEqual(articles);
  });

  it('should filter articles by author name', () => {
    const articles = [
      { author: 'Alice', title: 'Article 1' },
      { author: 'Bob', title: 'Article 2' },
      { author: 'Charlie', title: 'Article 3' },
    ];
    const filtered = pipe.transform(articles, 'Bob');
    expect(filtered).toEqual([{ author: 'Bob', title: 'Article 2' }]);
  });

  it('should handle case-insensitive filtering', () => {
    const articles = [
      { author: 'Alice', title: 'Article 1' },
      { author: 'Bob', title: 'Article 2' },
      { author: 'Charlie', title: 'Article 3' },
    ];
    const filtered = pipe.transform(articles, 'alice');
    expect(filtered).toEqual([{ author: 'Alice', title: 'Article 1' }]);
  });

  it('should return an empty array if no authors match the search string', () => {
    const articles = [
      { author: 'Alice', title: 'Article 1' },
      { author: 'Bob', title: 'Article 2' },
    ];
    const filtered = pipe.transform(articles, 'John');
    expect(filtered).toEqual([]);
  });

  it('should handle an empty array gracefully', () => {
    const articles: any[] = [];
    const filtered = pipe.transform(articles, 'Alice');
    expect(filtered).toEqual([]);
  });
});
