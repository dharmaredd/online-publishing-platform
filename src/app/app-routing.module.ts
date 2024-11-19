import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { ArticleDetialsComponent } from './components/article-detials/article-detials.component';
import { ExploreArticleComponent } from './components/explore-article/explore-article.component';
import { authGuard } from './gaurds/auth-guard.gurd';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list', component: ArticleListComponent, canActivate: [authGuard] },
  {
    path: 'create-article',
    component: CreateArticleComponent,
    canActivate: [authGuard],
  },
  {
    path: 'view-article/:id',
    component: ArticleDetialsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'explore-article',
    component: ExploreArticleComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
