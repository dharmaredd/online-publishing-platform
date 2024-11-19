import { createReducer, on } from '@ngrx/store';
import { ArticleModel } from '../../models/artilcle-model';
import {
  getListSuccess,
  updatebookmarkArticle,
  updateCommentArticle,
  addArticle,
} from '../actions/app-action.action';

export interface AppState {
  articleList: Array<ArticleModel>;
}

export const initialState: AppState = { articleList: [] };

export const articleReducer = createReducer(
  initialState,
  on(getListSuccess, (state, { articleList }) => ({
    articleList: articleList,
  })),

  on(updatebookmarkArticle, (state, article) => {
    let data = state.articleList.map((ele) =>
      ele.id === article.article.id ? article.article : ele
    );
    return {
      ...state,
      articleList: data,
    };
  }),

  on(updateCommentArticle, (state, article) => {
    let data = state.articleList.map((ele) =>
      ele.id === article.article.id ? article.article : ele
    );
    return {
      ...state,
      articleList: data,
    };
  }),
  on(addArticle, (state, { article }) => {
    return {
      ...state,
      articleList: [...state.articleList, article],
    };
  })
);
