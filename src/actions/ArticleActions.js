import {
    GET_ARTICLES,
    GET_ARTICLE,
    SEARCH_ARTICLES,
    SHOW_SPINNER,
    HIDE_SPINNER,
} from './types'
import ArticleService from "../services/articleService";
import {exportAsExcelFile} from "../services/excel";
import {showSuccessAlert, showErrorAlert} from "./AlertActions";


/**
 * Add Article method
 */
export const addArticle = (article, ownProps) => {
    return (dispatch) => {

        dispatch({type: SHOW_SPINNER})

        ArticleService.post(article).then(response => {
            if (response.status === 201) {
                dispatch({type: HIDE_SPINNER})
                showSuccessAlert(dispatch,'operation with success')
                ownProps.history.push('/articles')
            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })

    }
}


/**
 * get article
 */
export const getArticle = (id) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        ArticleService.getByID(id).then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                dispatch({
                    type: GET_ARTICLE,
                    article: response.data
                })

            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}


/**
 * update articles
 */
export const updateArticle = (id, article, ownProps) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})
        ArticleService.update(id, article).then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                ownProps.history.push('/articles')
            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}


/**
 * delete article
 */

export const deleteArticle = (id, activePage, ownProps) => {
    return (dispatch) => {
        dispatch({type: SHOW_SPINNER})

        ArticleService.delete(id).then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                ownProps.getArticles(activePage)
                showSuccessAlert(dispatch,'operation with success')
            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}


/**
 * fetch articles
 */

export const getArticles = (nbrePage) => {
    return (dispatch) => {

        dispatch({type: SHOW_SPINNER})

        ArticleService.get(nbrePage).then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                dispatch({
                    type: GET_ARTICLES,
                    articles: response.data,
                })
            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}


/**
 * recherche Articles
 */


export const rechercheArticles = (data) => {
    return (dispatch) => {

        dispatch({type: SHOW_SPINNER})

        ArticleService.recherche(data).then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                dispatch({
                    type: SEARCH_ARTICLES,
                    articles: response.data,
                })
            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}

/**
 * export Articles
 */

export const exportArticles = (data) => {
    return (dispatch) => {

        dispatch({type: SHOW_SPINNER})

        ArticleService.export(data).then(response => {
            if (response.status === 200) {
                dispatch({type: HIDE_SPINNER})
                exportAsExcelFile(response.data, 'articles')
            } else {
                dispatch({type: HIDE_SPINNER})
                showErrorAlert(dispatch, 'failed operation')
            }
        }, error => {
            dispatch({type: HIDE_SPINNER})
            showErrorAlert(dispatch, 'failed operation' + error.toString())
        })
    }
}
