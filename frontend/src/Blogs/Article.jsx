class Article {
    constructor() {
        this.title = "";
        this.content = "";
    }

    getTitle() {
        return this.title;
    }

    setTitle(new_title) {
        this.title = new_title;
    }

    getContent() {
        return this.content;
    }

    setContent(new_content) {
        this.content = new_content;
    }

}

export default new Article();