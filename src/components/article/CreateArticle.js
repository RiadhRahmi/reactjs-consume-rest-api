import React, {Component} from 'react';
import Alert from "../shared/Alert";
import ArticleService from "../../services/articleService";
import {withRouter} from 'react-router-dom';
import RTDatepicker from "../shared/RTDatepicker";
class CreateArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagetitle: 'Add Article',
            showAlert: false,
            colorAlert: 'success',
            messageAlert: '',
            article: {
                title: '',
                author: '',
                published_at: '',
                image: null,
                body: '',
            },
        };

        this.handleChangeRTDatepicker = this.handleChangeRTDatepicker.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.onFileChanged = this.onFileChanged.bind(this)
        this.createArticle = this.createArticle.bind(this)

    }


    createArticle(e) {
        e.preventDefault()
        let article = new FormData()
        article.append('title', this.state.article.title)
        article.append('author', this.state.article.author)
        article.append('published_at', this.state.article.published_at)
        article.append('image', this.state.article.image)
        article.append('body', this.state.article.body)

        ArticleService.post(article).then(response => {
            if (response.status === 201) {
                this.props.history.push('/articles')
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

    changeHandler(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            article: {
                ...this.state.article,
                [name]: value,
            }
        });

    }

    handleChangeRTDatepicker(value) {
        this.setState({
            article: {
                ...this.state.article,
                published_at: value,
            }
        });
    }

    onFileChanged(event) {
        this.setState({
            article: {
                ...this.state.article,
                image: event.target.files[0]
            }
        });
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
                            </h1>
                        </div>
                    </div>
                </div>
                {this.alert()}
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={this.createArticle}>
                            <div
                                className="form-group">
                                <label htmlFor="title"> Title </label>
                                <input name="title" value={this.state.article.title} type="text"
                                       onChange={this.changeHandler}
                                       className={"form-control"}
                                       id="title" placeholder="Enter title"/>

                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="author"> author </label>
                                <input name="author" value={this.state.article.author} type="text"
                                       onChange={this.changeHandler}
                                       className={"form-control"}
                                       id="author" placeholder="Enter author"/>
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="published_at"> published_at </label>
                                <RTDatepicker rtdName="published_at" rtdValue={this.state.article.published_at}
                                            onChange={this.handleChangeRTDatepicker}
                                            rtdClassName="form-control"
                                            rtdPlaceholder="Enter date published" rtdAutoComplete="off"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="image">image</label>
                                <input name="image" type="file" id="image" className={"form-control"}
                                       onChange={this.onFileChanged}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="body">description</label>
                                <textarea name="body" value={this.state.article.body} id="body" rows="5"
                                          onChange={this.changeHandler}
                                          className={"form-control"}
                                          placeholder="Enter description"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary"> Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(CreateArticle);
