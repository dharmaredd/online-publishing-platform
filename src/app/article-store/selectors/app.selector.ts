import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { AppState } from '../reduces/app-reducer';

// Get complete state of the favorites products in application
export const selectAppState = createFeatureSelector<AppState>('articleList');

export const articleListData = createSelector(
  selectAppState,
  (state: AppState) => state.articleList
);

export const articleListFilterData = (filterBy: string) =>
  createSelector(selectAppState, (state: AppState) =>
    filterBy === 'BOOKMARK'
      ? state.articleList.filter((ele: any) => ele.isBookmark === true)
      : filterBy === 'POPULAR'
      ? state.articleList.filter((ele: any) => ele.views >= 100000)
      : state.articleList
  );

export const articleByIdData = (id: number) =>
  createSelector(selectAppState, (state: AppState) =>
    state.articleList.find((ele: any) => ele.id === id)
  );
