import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }
    
    async getHtml() {

        async function getData(url) {
            const response = await fetch(url);
            return response.json();
        }
           
    const data = await getData('/static/js/views/posts.json')

         let listPosts ='<div class="container mt-5"><div class="row row-cols-md-2 g-4">';
             for(let i in data){
                 listPosts += "<div class='col'><div class='card  text-dark bg-light' style='width: 18rem;'><div class='card-body'><h5 class='card-title'>"+
                 data[i]['user'].name+"</h5><p class='card-text'>"+data[i]['text']+"</p><a href='/post-view/"+data[i]['id']+"' class='btn btn-primary' data-link>Voir le post</a></div></div></div>";
             }

        listPosts +="</div>";
        return listPosts;
    }
           
}