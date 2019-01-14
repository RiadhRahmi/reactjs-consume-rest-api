import {ApiClient} from "./client";

let apiClient = new ApiClient();


export default {

    post(article) {
        return apiClient.post('articles/add', article);
    },
    update(id, article) {
        return apiClient.post('articles/' + id + '/update', article);
    },
    getByID(id) {
        return apiClient.get('articles/' + id);
    },
    get(nbrePage) {
        return apiClient.get('articles?page=' + nbrePage);
    },
    delete(id) {
        return apiClient.delete('articles/' + id);
    },
    recherche(article) {
        return apiClient.post('articles', article);
    },
    export(article) {
        return apiClient.post('articles', article);
    }

}
