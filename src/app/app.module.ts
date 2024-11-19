import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ExploreArticleComponent } from './components/explore-article/explore-article.component';
import { ArticleDetialsComponent } from './components/article-detials/article-detials.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { provideHttpClient } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ArticleAuthorPipePipe } from './pipes/article-author.pipe';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { articleReducer } from './article-store/reduces/app-reducer';
import { AppEffects } from './article-store/effects/app.effects';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArticleListComponent,
    ExploreArticleComponent,
    ArticleDetialsComponent,
    CreateArticleComponent,
    ArticleAuthorPipePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularEditorModule,
    StoreModule.forRoot({ articleList: articleReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AppEffects]),
    ToastrModule.forRoot(),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
