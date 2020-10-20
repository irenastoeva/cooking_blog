import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserAuthSerivce } from 'src/app/user-auth.service';
import { User } from 'src/app/user.model';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: Article;
  id: number;
  user: User;

  constructor(private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserAuthSerivce) { }

  ngOnInit(): void {
    this.onInitRouteSubscribe();
    this.onUserLoggedIn();
  }

  onInitRouteSubscribe() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.article = this.articleService.getArticle(this.id);
      }
    );
  }

  onUserLoggedIn() {
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

  onEditArticle() {
    this.router.navigate(['edit'], { relativeTo: this.route });

  }

  onDeleteArticle() {
    this.articleService.deleteArticle(this.id);
    this.router.navigate(['/articles']);
  }

}
