import React, {Component} from 'react';
import ArticleService from "../../services/articleService";
import Alert from "../shared/Alert";


class ShowArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageTitle: 'Show Article',
            showAlert: false,
            colorAlert: 'success',
            messageAlert: '',
            article: {},
        };

    }

    componentDidMount() {
        this.getArticle();
    }

    getArticle() {

        let id = this.props.match.params.id;
        ArticleService.getByID(id).then(response => {
            if (response.status === 200) {
                this.setState({
                    article: response.data,
                    showAlert: false,
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


    displayAlert() {
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
                                {this.state.pageTitle} - #{this.state.article.id}
                            </h1>
                        </div>
                    </div>
                </div>

                {this.displayAlert()}

                <div className="row d-flex justify-content-end">
                    <div className="form-group  col-sm-12 col-md-2">
                        <button className="btn btn-secondary btn-block">
                            <i className="far fa-file-pdf"></i>&nbsp;&nbsp;Print
                        </button>
                    </div>
                    <div className="form-group  col-sm-12 col-md-2">
                        <button className="btn btn-secondary btn-block">
                            <i className="far fa-file-pdf"></i>&nbsp;&nbsp;Download
                        </button>

                    </div>
                </div>

                <div className="row mt-5">

                    <div className="col-12">

                        {/*<div className="row">*/}
                        {/*<div className="col-sm">*/}
                        {/*<img src="../../assets/logo.png" width="50px" className="pl-3"/>*/}
                        {/*</div>*/}
                        {/*<div className="col-sm">*/}
                        {/*<h1 style="font-size: 10px">TiTle Of PAGE</h1>*/}
                        {/*</div>*/}
                        {/*<div className="col-sm">*/}
                        {/*<img src="../../assets/logo.png" width="10px" className="pl-3"/>*/}
                        {/*</div>*/}
                        {/*</div>*/}

                        <div className="card mb-3 p-5" ref="generatePdf">

                            <div className="row">
                                <div className="col text-left">
                                    <img src={this.state.article.image} width="300px"
                                         alt={"logo"}
                                         height="200x" className="pl-3"/>
                                </div>
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">{this.state.article.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {this.state.article.author}
                                </h6>
                                <p className="card-text">
                                    <small className="text-muted">
                                        {this.state.article.published_at}
                                    </small>
                                </p>
                                <p className="card-text"> {this.state.article.body}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default ShowArticle;
