import {Component, OnDestroy, OnInit} from '@angular/core';
import { Apollo } from "apollo-angular";
import {CATEGORIES_QUERY, CategoriesResponse} from '../apollo/queries/category/categories';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  categories: { id: number, name: string }[] = [];
  loading = true;

  private queryCategories: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.queryCategories = this.apollo
      .watchQuery<CategoriesResponse>({query: CATEGORIES_QUERY})
      .valueChanges
      .subscribe(result => {
        this.categories = result.data.categories.data.map(category => ({id: category.id, name: category.attributes.name}));
        this.loading = result.loading;
      });
  }
  ngOnDestroy() {
    this.queryCategories.unsubscribe();
  }
}
