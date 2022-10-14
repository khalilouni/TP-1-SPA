import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";



const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(
/:\w+/g, "(.+)") + "$");


// recuperer id sur url 

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};
   // 4 instead of reload the page - keep in the same and load this function
   const navigateTo = url => {
        history.pushState(null, null, url);
        router();
   }

   const router = async () => {
        // definition des routes possible 

        const routes = [
            { path: "/", view: Dashboard },
            { path: "/posts", view: Posts },
            { path: "/post-view/:id", view: PostView },   
        ];

    // match de toute les routes

    const potentialMatches = routes.map(route => {

        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    });
    
   // recuperer la route !null

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
    
    if(!match) {

        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }
   
    
    const view = new match.route.view(getParams(match))

 document.querySelector("#app").innerHTML = await view.getHtml();

};



// 5 to retour the page using the browser button
window.addEventListener("popstate", router);
// 2 test on the browser to see the obj
document.addEventListener("DOMContentLoaded", () => {
 //4.1
 document.body.addEventListener("click", e => {
 if (e.target.matches("[data-link]")) {
 e.preventDefault();
 navigateTo(e.target.href)
 }
 })
 router();
});
