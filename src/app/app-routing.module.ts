import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { ArticleStartComponent } from './articles/article-start/article-start.component';

import { ArticlesComponent } from './articles/articles.component';
import { AuthComponent } from './auth/auth.component';
import { RecipesComponent } from './recipes/recipes.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/articles', pathMatch: 'full'},
    {path: 'articles', component: ArticlesComponent, children: [
        { path: '', component: ArticleStartComponent },
        { path: 'new', component: ArticleEditComponent },
        { path: ':id', component: ArticleDetailComponent },
        { path: ':id/edit', component: ArticleEditComponent }
    ]},
    {path: 'recipes', component: RecipesComponent},
    {path: 'login', component: AuthComponent },
    {path: 'signup', component: SignupComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})

export class AppRoutingModule { 

}