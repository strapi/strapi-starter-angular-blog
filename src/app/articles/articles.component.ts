import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {map, merge, Observable, of} from 'rxjs';
import {ARTICLES_QUERY, ArticlesResponse, ArticlesType, articlesTypeFromResponse} from '../apollo/queries/article/articles';

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent {
  articles$: Observable<{
    left: ArticlesType[];
    right: ArticlesType[];
  }>;

  constructor(private apollo: Apollo) {
    this.articles$ = this.apollo
      .watchQuery<ArticlesResponse>({query: ARTICLES_QUERY})
      .valueChanges
      .pipe(
        map(result => articlesTypeFromResponse(result.data)),
        map(articles => {
          const leftArticlesCount = Math.ceil(articles.length / 5);
          return {
            left: articles.slice(0, leftArticlesCount),
            right: articles.slice(leftArticlesCount, articles.length)
          };
        })
      );

    this.articles$ = merge(this.articles$, of({left: [], right: []}));
  }
}
