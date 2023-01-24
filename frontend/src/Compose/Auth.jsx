class Auth {
    constructor() {
        this.authenticeted = false;
    }

    login() {
        this.authenticeted = true;
    }

    isAuthenticated() {
        return this.authenticeted;
    }

}

export default new Auth();