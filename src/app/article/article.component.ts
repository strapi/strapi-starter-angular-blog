import {Component, OnDestroy, OnInit} from '@angular/core';
import { Apollo } from "apollo-angular";
import {ARTICLE_QUERY, ArticleResponse, ArticleType} from '../apollo/queries/article/article';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { environment } from '../../environments/environment';
import {GraphQLError} from 'graphql';

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"]
})
export class ArticleComponent implements OnInit, OnDestroy {
  article: ArticleType;
  loading = true;
  errors: GraphQLError[] = [];
  apiURL = environment.apiURL;

  private queryArticle: Subscription;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit() {
    this.queryArticle = this.apollo
      .watchQuery<ArticleResponse>({
        query: ARTICLE_QUERY,
        variables: {
          id: this.route.snapshot.paramMap.get('id')
        }
      })
      .valueChanges.subscribe(result => {
        this.article = this.transformApiResponse(result.data);
        this.loading = result.loading;
        this.errors = [...(result.errors || [])];
      });
  }
  ngOnDestroy() {
    this.queryArticle.unsubscribe();
  }

  private transformApiResponse(data: ArticleResponse): ArticleType {
    return {
        id: data.article.data.id,
        title: data.article.data.attributes.title,
        category: {...data.article.data.attributes.category.data.attributes},
        cover: {...data.article.data.attributes.cover.data.attributes},
    };
  }
}
