import {ChangeDetectionStrategy, Component } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {ARTICLE_QUERY, ArticleResponse, ArticleType, articleTypeFromResponse} from '../apollo/queries/article/article';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map, merge, Observable, of, switchMap} from 'rxjs';

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent {

  article$: Observable<ArticleType>;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    // when the route changes, we rerun the query
    const onIdParamsChange$ = this.route.paramMap.
    pipe(
      map((params: ParamMap) => parseInt(params.get("id"), 0))
    );

    this.article$ = onIdParamsChange$.pipe(
      switchMap(id => {
        return this.apollo.watchQuery<ArticleResponse>({query: ARTICLE_QUERY,variables: {id}})
          .valueChanges
          .pipe(
            map(result => articleTypeFromResponse(result.data)),
          )
      })
    )

    this.article$ = merge(this.article$, of({id: -1, cover: {}, title: '', blocks: []} as ArticleType));
  }
}
