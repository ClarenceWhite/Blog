class Published {
    constructor() {
        this.title = ""
        this.content = ""
        this.date = ""
        this.category = ""
    }

    getTitle() {
        return this.title;
    }

    getContent() {
        return this.content;
    }

    getDate() {
        return this.date;
    }

    getCategory() {
        return this.category;
    }

    setTitle(new_title) {
        this.title = new_title;
    }

    setContent(new_content) {
        this.content = new_content;
    }

    setDate(new_date) {
        this.date = new_date;
    }

    setCategory(new_catgory) {
        this.category = new_catgory;
    }

}

export default new Published();