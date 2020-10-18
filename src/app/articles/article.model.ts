export class Article {
    public title: string;
    public content: string;
    public imagePath: string;

    constructor(title: string, content: string, imagePath: string) {
        this.title = title;
        this.content = content;
        this.imagePath = imagePath;
    }

}