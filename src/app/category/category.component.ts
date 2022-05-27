import {Component, OnDestroy, OnInit} from '@angular/core';
import { Apollo } from "apollo-angular";
import {CATEGORY_ARTICLES_QUERY, CategoryArticlesResponse, CategoryArticlesType} from '../apollo/queries/category/articles';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import {GraphQLError} from 'graphql';
import {environment} from '../../environments/environment';

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit, OnDestroy {
  data: { articles: CategoryArticlesType[], category: {name: string} };
  category: { name: string };
  loading = true;
  errors: GraphQLError[] = [];
  leftArticlesCount: number;
  leftArticles: CategoryArticlesType[];
  rightArticles: CategoryArticlesType[];
  id: number;

  private queryCategoriesArticles: Subscription;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id'), 0);
      this.queryCategoriesArticles = this.apollo
        .watchQuery<CategoryArticlesResponse>({
          query: CATEGORY_ARTICLES_QUERY,
          variables: {
            id: this.id
          }
        })
        .valueChanges.subscribe(result => {
          this.data = this.transformApiResponse(result.data);
          this.category = this.data.category;
          this.leftArticlesCount = Math.ceil(this.data.articles.length / 5);
          this.leftArticles = this.data.articles.slice(0, this.leftArticlesCount);
          this.rightArticles = this.data.articles.slice(
            this.leftArticlesCount,
            this.data.articles.length
          );
          this.loading = result.loading;
          this.errors = [...(result.errors || [])];
        });
    });
  }
  ngOnDestroy() {
    this.queryCategoriesArticles.unsubscribe();
  }

  private transformApiResponse(data: CategoryArticlesResponse): { articles: CategoryArticlesType[], category: {name: string} } {
    return {
      category: { name: data.category.data.attributes.name },
      articles: data.category.data.attributes.articles.data.map(article => {
        return {
          id: article.id,
          title: article.attributes.title,
          category: { name: article.attributes.category.data.attributes.name },
          cover: {
            url: environment.apiURL + article.attributes.cover.data.attributes.url,
            alternativeText: article.attributes.cover.data.attributes.alternativeText
          },
        };
      })
    };
  }
}
