import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { list } from './article-store/actions/app-action.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'online-publishing-platform';
  constructor(private store: Store) {
    this.store.dispatch(list());
    localStorage.clear();
  }
}
