import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {
  id: number;
  editMode = false;
  articleForm: FormGroup;

  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.articleService.updateArticle(this.id, this.articleForm.value);
    } else {
      this.articleService.addArticle(this.articleForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let articleTitle = '';
    let articleImagePath = '';
    let articleContent = '';

    if (this.editMode) {
      const article = this.articleService.getArticle(this.id);
      articleTitle = article.title;
      articleImagePath = article.imagePath;
      articleContent = article.content;
    }

    this.articleForm = new FormGroup({
      title: new FormControl(articleTitle, Validators.required),
      imagePath: new FormControl(articleImagePath, Validators.required),
      content: new FormControl(articleContent, Validators.required)
    });

  }

}
