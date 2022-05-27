import {Component, OnDestroy, OnInit} from '@angular/core';
import { Apollo } from "apollo-angular";
import { Subscription } from "rxjs";
import {ARTICLES_QUERY, ArticlesResponse, ArticlesType} from '../apollo/queries/article/articles';

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.css"]
})
export class ArticlesComponent implements OnInit, OnDestroy {
  data: { articles: ArticlesType[] } = {articles: []};
  loading = true;
  leftArticlesCount: number;
  leftArticles: ArticlesType[];
  rightArticles: ArticlesType[];

  private queryArticles: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.queryArticles = this.apollo
      .watchQuery<ArticlesResponse>({query: ARTICLES_QUERY})
      .valueChanges
      .subscribe(result => {
        this.data = this.transformApiResponse(result.data);
        this.leftArticlesCount = Math.ceil(this.data.articles.length / 5);
        this.leftArticles = this.data.articles.slice(0, this.leftArticlesCount);
        this.rightArticles = this.data.articles.slice(
          this.leftArticlesCount,
          this.data.articles.length
        );
        this.loading = result.loading;
      });
  }

  ngOnDestroy() {
    this.queryArticles.unsubscribe();
  }

  private transformApiResponse(data: ArticlesResponse): { articles: ArticlesType[] } {
    return {
      articles: data.articles.data.map(article => {
        return {
          id: article.id,
          title: article.attributes.title,
          category: { name: article.attributes.category.data.attributes.name },
          image: { url: article.attributes.cover.data.attributes.url }
        };
      })
    };
  }
}
