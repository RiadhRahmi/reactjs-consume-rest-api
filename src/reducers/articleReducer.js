import {
    GET_ARTICLES,
    GET_ARTICLE,
    SEARCH_ARTICLES,
} from '../actions/types'

const INITIAL_STATE = {
    articles: {},
    article: {}

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_ARTICLE:
            return {
                ...state,
                article: action.article
            }

        case GET_ARTICLES:
            return {
                ...state,
                articles: action.articles

            }
        case SEARCH_ARTICLES:
            return {
                ...state,
                articles: action.articles
            }
        default:
            return state;
    }
}
