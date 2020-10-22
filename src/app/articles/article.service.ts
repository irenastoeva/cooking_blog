import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Article } from './article.model';

@Injectable()
export class ArticleService {
    articlesChanged = new Subject<Article[]>();

    private articles: Article[] = [
        new Article('16 Stellar Ways to Use Radicchio', 'Radicchio is a type of chicory (as is puntarelle) and—along with artichokes, burdock, and Jerusalem artichokes—a member of the sunflower family. Endive, another member of the family, is very closely related to chicories (they’re all in the Cichorium genus), and they can be confusingly named depending on where you live in the world; what we think of as endive is known elsewhere as chicory. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci sit amet magna dapibus fringilla. In sed fringilla velit, at egestas eros. Integer convallis laoreet turpis, vitae placerat enim porttitor quis. Integer quis gravida felis, id venenatis diam. Praesent ut sem nulla. Curabitur feugiat est vitae dui consectetur gravida vel eget diam. Vestibulum a facilisis enim, vel tempus lectus. Duis pretium congue tellus quis ultrices. Quisque consequat malesuada risus, a tincidunt orci mattis quis. Aliquam eu augue molestie, ultrices mauris sit amet, feugiat neque.', 'https://images.food52.com/HFudHbSIY2ZVuLwZXM2wtF2Hlv0=/660x440/e043b355-5519-47e9-ae49-1b05e3d90f99--15923656966_81f44a8730_b.jpg'),
        new Article('How to Pick a Watermelon', 'Picking out just the right watermelon can be tricky since there aren not many external signifiers, and you cant just give it a squeeze to see if its softened, like you would with other fruits. There are, however, a few things you can look out for and do to ensure you have got a melon that is ready to eat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci sit amet magna dapibus fringilla. In sed fringilla velit, at egestas eros. Integer convallis laoreet turpis, vitae placerat enim porttitor quis. Integer quis gravida felis, id venenatis diam. Praesent ut sem nulla. Curabitur feugiat est vitae dui consectetur gravida vel eget diam. Vestibulum a facilisis enim, vel tempus lectus. Duis pretium congue tellus quis ultrices. Quisque consequat malesuada risus, a tincidunt orci mattis quis. Aliquam eu augue molestie, ultrices mauris sit amet, feugiat neque.', 'https://images.food52.com/_pjBLU36kwttnYCifAXLq1HyNjk=/660x440/f57a69ac-26a7-4ef9-a695-564b141bfd8a--2018-0517_how-to-cut-watermelon-9_3x2_bobbi-lin_11989.jpg'),
        new Article('The Absolute Best Way to Cook Broccoli', 'The year is approximately 25 B.C., and the world’s primordial broccoli is about to be presented to a human for possible consumption. “Aspetti!” hisses the emperor’s chef, his eyes wide as the tiny treelike structures make their way to the grand dining table of Domus Augusti. “Wait! Is there any way to make it look any less…limp? Or any more…green?” But it’s too late—the florets are already in motion. And the emperor, never one to mince words, takes a single bite before pronouncing it “fine but kinda boring,” thereby relegating it to side dish status, at best, for thousands of years. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci sit amet magna dapibus fringilla. In sed fringilla velit, at egestas eros. Integer convallis laoreet turpis, vitae placerat enim porttitor quis. Integer quis gravida felis, id venenatis diam. Praesent ut sem nulla. Curabitur feugiat est vitae dui consectetur gravida vel eget diam. Vestibulum a facilisis enim, vel tempus lectus. Duis pretium congue tellus quis ultrices. Quisque consequat malesuada risus, a tincidunt orci mattis quis. Aliquam eu augue molestie, ultrices mauris sit amet, feugiat neque.', 'https://images.food52.com/-xTCYmBlc1GR16H7cMu6ED5V0p0=/764x494/634f3064-a3f8-4966-b623-9beb8fba0716--broccoli_3x2.JPG'),
      ];

    getArticles() {
        return this.articles.slice();
    }

    getArticle(index: number) {
        return this.articles[index];
    }

    addArticle(article: Article) {
        this.articles.push(article);
        this.articlesChanged.next(this.articles.slice());
    }

    updateArticle(index: number, newArticle: Article) {
        this.articles[index] = newArticle;
        this.articlesChanged.next(this.articles.slice());
    }

    deleteArticle(index: number) {
        this.articles.splice(index, 1);
        this.articlesChanged.next(this.articles.slice());
    }
}
