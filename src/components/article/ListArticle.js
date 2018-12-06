import React, {Component} from 'react';
import Pagination from "react-js-pagination";
import {Link, withRouter} from 'react-router-dom';
import ArticleService from "../../services/articleService";
import {exportAsExcelFile} from "../../services/excel";
import Alert from "../shared/Alert";
import $ from 'jquery';
import RTDaterangepicker from "../shared/RTDaterangepicker";

class ListArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagetitle: 'List Articles',
            showAlert: false,
            colorAlert: 'success',
            messageAlert: '',
            articles: {},
            currentPage: 1,
            idArticle: '',
            searchArticle: {
                published_at: '',
                title: '',
                author: ''
            },
            activePage: 1,
            pageRangeDisplayed: 8,
            idSelectedArticle: 0,
        };

        this.pageChange = this.pageChange.bind(this);
        this.showArticle = this.showArticle.bind(this);
        this.openModal = this.openModal.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.searchArticles = this.searchArticles.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.exportArticles = this.exportArticles.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.changeHandlerRTDaterangepicker = this.changeHandlerRTDaterangepicker.bind(this);
    }

    componentDidMount() {
        this.getArticles(1);
    }

    getArticles(nbrePage) {
        ArticleService.get(nbrePage).then(response => {
            if (response.status === 200) {
                this.setState({
                    articles: response.data,
                    showAlert: true,
                    colorAlert: 'success',
                    messageAlert: 'operation with success',
                });

            } else {
                this.setState({
                    showAlert: true,
                    colorAlert: 'danger',
                    messageAlert: 'failed operation',
                });
            }
        }, error => {
            this.setState({
                showAlert: true,
                colorAlert: 'danger',
                messageAlert: 'failed operation' + error.toString(),
            });
        });
    }


    pageChange(pageNumber) {
        this.getArticles(pageNumber);
        this.setState({activePage: pageNumber});

    }


    showArticle(id) {
        this.props.history.push('/articles/' + id + '/show')
    }

    openModal(id) {
        this.setState({
            idSelectedArticle: id
        })
    }

    deleteArticle() {
        $('#exampleModal').modal('hide')

        ArticleService.delete(this.state.idSelectedArticle).then(response => {
            if (response.status === 200) {
                this.getArticles(this.state.activePage);
                this.setState({
                    showAlert: true,
                    colorAlert: 'success',
                    messageAlert: 'operation with success',
                });

            } else {
                this.setState({
                    showAlert: true,
                    colorAlert: 'danger',
                    messageAlert: 'failed operation',
                });
            }
        }, error => {
            this.setState({
                showAlert: true,
                colorAlert: 'danger',
                messageAlert: 'failed operation' + error.toString()
            });
        });

    }

    searchArticles() {
        let data = this.state.searchArticle
        ArticleService.recherche(data).then(response => {
            if (response.status === 200) {
                this.setState({
                    articles: response.data
                });
            } else {
                this.setState({
                    showAlert: true,
                    colorAlert: 'danger',
                    messageAlert: 'failed operation',
                });
            }
        }, error => {
            this.setState({
                showAlert: true,
                colorAlert: 'danger',
                messageAlert: 'failed operation' + error.toString(),
            });
        });

    }

    resetForm(e) {
        e.preventDefault();
        this.setState({
            searchArticle: {
                published_at: '',
                title: '',
                author: ''
            }
        }, function () {
            this.searchArticles();
        });
    }

    exportArticles(e) {
        e.preventDefault();
        const searchArticle = {
            title: this.state.searchArticle.title,
            published_at: this.state.searchArticle.published_at,
            author: this.state.searchArticle.author,
            export: true
        }

        ArticleService.export(searchArticle).then(response => {
            if (response.status === 200) {
                exportAsExcelFile(response.data, 'articles');
            } else {
                this.setState({
                    showAlert: true,
                    colorAlert: 'danger',
                    messageAlert: 'failed operation',
                });
            }
        }, error => {
            this.setState({
                showAlert: true,
                colorAlert: 'danger',
                messageAlert: 'failed operation' + error.toString(),
            });
        });
    }

    changeHandler(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            searchArticle: {
                ...this.state.searchArticle,
                [name]: value,
            }
        });
    }

    changeHandlerRTDaterangepicker(value) {
        this.setState({
            searchArticle: {
                ...this.state.searchArticle,
                published_at: value,
            }
        },function () {
            console.log(value)
        });
    }


    getDataArticles() {
        let result;
        if (this.state.articles === undefined || this.state.articles.total === undefined ||
            this.state.articles.total === 0) {
            result = (
                <div className="row">
                    <div className="col-12 text-center">
                        <b> Empty Page </b>
                    </div>
                </div>
            )
        } else {
            result = (
                <div className="row">
                    {this.state.articles.data.map(article =>
                        <div className="col-4" key={article.id}>
                            <div className="card">
                                <img className="card-img-top" src={article.image} alt={article.title}/>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {article.title}
                                    </h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        Author: {article.author}
                                    </h6>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Published at: {article.published_at}
                                        </small>
                                    </p>
                                    <button type="button"
                                            className="btn btn-primary btn-sm mr-1"
                                            onClick={(e) => this.showArticle(article.id, e)}>
                                        <i className="fas fa-search"></i>
                                    </button>
                                    <Link to={'/articles/' + article.id + '/edit'}
                                          className="btn btn-success btn-sm mr-1">
                                        <i className="far fa-edit"></i>
                                    </Link>
                                    <button
                                        type="button" className="btn btn-danger btn-sm mr-1"
                                        data-toggle="modal" data-target="#exampleModal"
                                        onClick={(e) => this.openModal(article.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )
        }

        return result
    }

    getCountArticles() {
        let nbreArticle = 0;

        if (this.state.articles !== undefined && this.state.articles.total !== undefined) {
            nbreArticle = this.state.articles.total
        }

        nbreArticle = (
            <div className="row">
                <div className="col-12 mt-3 mb-3">
                    <b>Total : {nbreArticle} articles </b>
                </div>
            </div>
        )

        return nbreArticle
    }

    pager() {
        let pager;
        if (this.state.articles !== undefined && this.state.articles.total > this.state.articles.per_page) {
            pager = (
                <div className="row mt-5">
                    <div className="col-12">
                        <Pagination
                            prevPageText='prev'
                            nextPageText='next'
                            firstPageText='first'
                            lastPageText='last'
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.articles.per_page}
                            totalItemsCount={this.state.articles.total}
                            pageRangeDisplayed={this.state.pageRangeDisplayed}
                            itemClass="page-item"
                            linkClass="page-link"
                            innerClass="pagination justify-content-center"
                            onChange={this.pageChange}

                        />
                    </div>
                </div>
            )
        }
        return pager
    }


    alert() {
        let alert;


        if (this.state.showAlert === true) {
            alert = (
                <Alert color={this.state.colorAlert} message={this.state.messageAlert}/>
            )
        }

        return alert
    }

    render() {


        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="pb-2 mt-4 mb-2 border-bottom">
                            <h1>
                                {this.state.pagetitle}
                                <Link to="/articles/add" className="btn btn-primary float-right">
                                    <i className="fas fa-plus"></i> Nouveau Article
                                </Link>
                            </h1>
                        </div>
                    </div>
                </div>

                {this.alert()}

                <div className="row filter-search">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                Recherche
                                <i className="fas search-icon fa-angle-down float-right"></i>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">

                                            <RTDaterangepicker
                                                rtdName="published_at"
                                                rtdValue={this.state.searchArticle.published_at}
                                                rtdClassName="form-control" rtdPlaceholder="Published at"
                                                rtdFormatDate="MM/DD/YYYY"
                                                onChange={this.changeHandlerRTDaterangepicker}
                                            />

                                        </div>
                                        <div className="form-group col-md-4">
                                            <input type="text" name="title"
                                                   value={this.state.searchArticle.title}
                                                   onChange={this.changeHandler}
                                                   className="form-control"
                                                   placeholder="Title"/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <input type="text" name="author"
                                                   value={this.state.searchArticle.author}
                                                   onChange={this.changeHandler}
                                                   className="form-control" placeholder="Author"/>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-end">
                                        <div className="form-group  col-sm-12 col-md-2">
                                            <button className="btn btn-secondary btn-block"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        this.searchArticles()
                                                    }}>
                                                <i className="fas fa-search"></i>&nbsp;&nbsp;Recherche
                                            </button>
                                        </div>
                                        <div className="form-group   col-sm-12 col-md-2">
                                            <button className="btn btn-secondary btn-block"
                                                    onClick={this.resetForm}>
                                                <i className="fas fa-redo-alt"></i>&nbsp;&nbsp;Reset
                                            </button>
                                        </div>
                                        <div className="form-group col-sm-12 col-md-2">
                                            <button className="btn btn-secondary btn-block"
                                                    onClick={this.exportArticles}>
                                                <i className="fas fa-file-excel"></i>&nbsp;&nbsp;Export
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    {this.getCountArticles()}
                    {this.getDataArticles()}
                    {this.pager()}
                </div>

                {/*Modal*/}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Confirmation Delete Article
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete article N° {this.state.idSelectedArticle}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button"
                                        className="btn btn-primary" data-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" className="btn btn-danger"
                                        onClick={this.deleteArticle}>OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }


}

export default withRouter(ListArticle);
