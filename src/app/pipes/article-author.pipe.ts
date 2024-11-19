import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleAuthorPipe',
})
export class ArticleAuthorPipePipe implements PipeTransform {
  transform(value: Array<any>, searchString?: string): Array<any> {
    if (!searchString) return value;
    return value.filter((res: any) =>
      res.author.toLowerCase().includes(searchString.toLowerCase())
    );
  }
}
