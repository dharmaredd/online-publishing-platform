import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EmptyError, exhaustMap, map } from 'rxjs';
import { AppService } from '../../services/app-service.service';
import { list, getListSuccess } from '../actions/app-action.action';
@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private appService: AppService) {}
  // list Effect
  articeliList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(list),
      exhaustMap(() =>
        this.appService.getList().pipe(
          map(
            (data) => getListSuccess({ articleList: data }),
            catchError(async () => EmptyError)
          )
        )
      )
    )
  );
}
