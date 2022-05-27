import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {
  CATEGORY_ARTICLES_QUERY,
  CategoryArticlesResponse,
  CategoryArticlesType,
  categoryArticlesTypeFromResponse
} from '../apollo/queries/category/articles';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map, merge, Observable, of, switchMap} from 'rxjs';

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent {
  state$: Observable<{
    category: { name: string },
    articles: {
      left: CategoryArticlesType[],
      right: CategoryArticlesType[]
    }
  }>;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    // when the route changes, we rerun the query
    const onIdParamsChange$ = this.route.paramMap.
      pipe(
        map((params: ParamMap) => parseInt(params.get("id"),0))
      );

    // On Each ID params change.
    this.state$ = onIdParamsChange$.pipe(switchMap(id => {
      // we run the GraphQL query
      return this.apollo.watchQuery<CategoryArticlesResponse>({query: CATEGORY_ARTICLES_QUERY,variables: {id}})
        .valueChanges
        .pipe(
          // Then we map the response to the type we want
          map(result => categoryArticlesTypeFromResponse(result.data)),
          map(state => {
            // and finally split in left/right.
            const leftArticlesCount = Math.ceil(state.articles.length / 5);
            return {
              category: state.category,
              articles: {
                left: state.articles.slice(0, leftArticlesCount),
                right: state.articles.slice(leftArticlesCount, state.articles.length)
              }
            }
          })
        );
    }))

    this.state$ = merge(this.state$, of({category: {name: ''}, articles: {left: [], right: []}}));
  }
}
