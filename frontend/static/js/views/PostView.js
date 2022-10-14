import AbstractView from "./AbstractView.js";


export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle("Viewing Post");
    }


    async getHtml() {

        const idView = Number(this.params.id);

        async function getData(url) {

            const response = await fetch(url);
            return response.json();

        }
   
        const data = await getData('/static/js/views/posts.json');
        
        // recuperer l'article avec id 
        
        const article = data.find(item => item.id === idView);
        
        return '<div class="container"><div class="card text-dark bg-light" style="width: 18rem;"><img src='+article.user.profile_image_url+' class="img-thumbnail" alt="Photo de profil indisponible" /><div class="card-body"><h5 class="card-title">'+article.user.name+'</h5><p class="card-text">'+article.text+'</p><a href="/posts" class="btn btn-primary" data-link>Retour</a></div><div class="card-footer"><small class="text-muted">'+article.created_at+'</small></div></div></div>';

    }

}
   