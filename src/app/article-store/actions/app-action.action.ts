import { createAction, props } from '@ngrx/store';
import { ArticleModel } from '../../models/artilcle-model';

export const list = createAction('[ARTCICLE STORE] List');
export const getListSuccess = createAction(
  '[ARTCICLE STORE] List success',
  props<{ articleList: ArticleModel[] }>()
);
export const updatebookmarkArticle = createAction(
  '[ARTCICLE BOOK_UPDATE] Update Article',
  props<{ article: ArticleModel }>()
);
export const updateCommentArticle = createAction(
  '[ARTCICLE COMMENT_UPDATE] Update Article',
  props<{ article: ArticleModel }>()
);
export const addArticle = createAction(
  '[ARTCICLE ADD] Add Article',
  props<{ article: ArticleModel }>()
);
