import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { MarkdownModule } from "ngx-markdown";
import { RouterModule, Routes } from "@angular/router";
import { NavComponent } from "./nav/nav.component";
import { ArticlesComponent } from "./articles/articles.component";
import { ArticleComponent } from "./article/article.component";
import { CategoryComponent } from "./category/category.component";
import { MediaComponent } from './article/components/media/media.component';
import { QuoteComponent } from './article/components/quote/quote.component';
import { RichtextComponent } from './article/components/richtext/richtext.component';
import { SliderComponent } from './article/components/slider/slider.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';

const appRoutes: Routes = [
  { path: "", component: ArticlesComponent },
  { path: "article/:id", component: ArticleComponent },
  { path: "category/:id", component: CategoryComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ArticlesComponent,
    ArticleComponent,
    CategoryComponent,
    MediaComponent,
    QuoteComponent,
    RichtextComponent,
    SliderComponent
  ],
  imports: [
    MarkdownModule.forRoot(),
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
