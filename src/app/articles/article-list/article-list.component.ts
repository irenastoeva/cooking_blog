import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserAuthSerivce } from 'src/app/user-auth.service';
import { User } from 'src/app/user.model';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  public articles: Article[] = [];
  subscription: Subscription;
  public user: User;
  isLoggedIn: boolean;

  constructor(private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserAuthSerivce) { }

  ngOnInit(): void {
    this.getUserArticles();
    this.checkForUserChanges();
  }

  getUserArticles() {
    this.subscription = this.articleService.articlesChanged.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );
    this.articles = this.articleService.getArticles();
  }

  checkForUserChanges() {
    this.userService.user.subscribe(
      (data: User) => this.onSuccessGetUser(data),
      (err: any) => this.onError(err)
    );
  }

  onSuccessGetUser(user: User) {
    this.user = user;
  }

  onError(err: any) {
    console.log('err', err);
  }

  onNewArticle() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
