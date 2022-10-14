import AbstractView from "./AbstractView.js";


export default class extends AbstractView {
    
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }
    
    async getHtml() {
        return `
            <div class="container p-5 my-5 border text-center text-dark bg-light">
                <h1>Ma premiere SPA</h1>
                <p>ici vous aller voir tous les tweets en rapport avec canada !</p>
                
                <a href="/posts" class="btn btn-outline-primary" data-link>Voir les publications</a>
            </div>`;
    }
}
   


