import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { ArticleItemComponent } from './articles/article-item/article-item.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ArticleStartComponent } from './articles/article-start/article-start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ArticleService } from './articles/article.service';
import { ShortenPipe } from './shorten.pipe';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    AuthComponent,
    HeaderComponent,
    RecipesComponent,
    ArticleDetailComponent,
    ArticleEditComponent,
    ArticleItemComponent,
    ArticleListComponent,
    ArticleStartComponent,
    ShortenPipe,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
