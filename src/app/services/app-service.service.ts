import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ArticleModel } from '../models/artilcle-model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  backUrl: string = '/list';
  constructor(private http: HttpClient) {}

  getLoginData(): Observable<any> {
    return this.http.get('../assets/json/login-data.json');
  }

  getList(): Observable<ArticleModel[]> {
    return this.http.get('../assets/json/list.json').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
