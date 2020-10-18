import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Article } from '../article.model';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article;
  id: number;

  constructor(private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.article = this.articleService.getArticle(this.id);
      }

    );
  }
  
  onEditArticle() {
    this.router.navigate(['edit'], { relativeTo: this.route });

  }

  onDeleteArticle() { 
    this.articleService.deleteArticle(this.id);
    this.router.navigate(["/articles"]);
  }

}
