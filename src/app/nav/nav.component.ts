import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {CATEGORIES_QUERY, CategoriesResponse, categoriesTypeFromResponse, CategoryType} from '../apollo/queries/category/categories';
import {map, Observable} from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
  categories$: Observable<CategoryType[]>;

  constructor(private apollo: Apollo) {
    this.categories$ = this.apollo
      .watchQuery<CategoriesResponse>({query: CATEGORIES_QUERY})
      .valueChanges
      .pipe(map(result => categoriesTypeFromResponse(result.data)));
  }
}
